import ReactFlow, {
	Controls,
	Background,
	OnLoadParams,
	useZoomPanHelper,
} from "react-flow-renderer";
import { useEffect, useState } from "react";

import * as api from "api";
import localforage from "lib/localforage";
import withIds from "utils/withIds";
import getRefs from "utils/getRefs";
import { getLayoutedElements } from "utils/autoLayout";

import Collection from "components/Collection";
import SelfEdge from "./SelfEdge";

const graphStyles = {
	width: "100%",
};

const nodeTypes = {
	collection: Collection,
};

const edgeTypes = {
	self: SelfEdge,
};

const onLoad = ({ fitView }: OnLoadParams) => {
	fitView();
	// fitView({ padding: 0.4, includeHiddenNodes: true });
};

const TheView = () => {
	const [elements, setElements] = useState<any>([]);
	const { fitView } = useZoomPanHelper();

	console.log("the view");

	const getSchemas = async () => {
		const schemaNames = (await api.getSchemaNames()) || [];

		const schemaCodes = await Promise.all(
			schemaNames?.map((name) => api.getSchemaCode(name))
		);

		const schemaCodesWithIds = schemaCodes.map((code, idx) =>
			withIds(JSON.parse(code || ""), schemaNames[idx])
		);

		const edges: any = [];

		const nodes = schemaCodesWithIds.map((code, idx) => {
			const refs = getRefs(code);
			refs.forEach((ref) => {
				const refSchema = ref.ref.split(".")[0];

				const selfRef = refSchema === schemaNames[idx];

				const edgeIds = selfRef
					? { sourceHandle: "ds", targetHandle: "dt" }
					: { sourceHandle: "ns", targetHandle: "nt" };

				edges.push({
					id: `${ref.id}-${refSchema}`,
					source: schemaNames[idx],
					target: refSchema,
					type: selfRef ? "self" : "smoothstep",
					...edgeIds,
				});
			});

			return {
				id: schemaNames[idx],
				data: { schema: code, name: schemaNames[idx] },
				type: "collection",
				position: { x: 0, y: 0 },
			};
		});

		setElements(getLayoutedElements([...nodes, ...edges]));
	};

	useEffect(() => {
		let subscription: any;

		localforage.ready().then(() => {
			const globalObservable = localforage.newObservable();
			subscription = globalObservable.subscribe({
				next: (args) => {
					if (args.key.startsWith("deebySchemaDraft") || !args.success) return;
					getSchemas();
				},
			});
		});

		return () => {
			subscription?.unsubscribe();
		};
	}, []);

	useEffect(() => {
		getSchemas();
	}, []);

	useEffect(() => {
		fitView({ padding: 0.4, includeHiddenNodes: true });
	}, [elements]);

	return (
		<ReactFlow
			elements={elements}
			style={graphStyles}
			onLoad={onLoad}
			nodeTypes={nodeTypes}
			edgeTypes={edgeTypes}
			nodesDraggable
			paneMoveable
			panOnScroll>
			<Controls />
			<Background color="#aaa" gap={16} />
		</ReactFlow>
	);
};

export default TheView;
