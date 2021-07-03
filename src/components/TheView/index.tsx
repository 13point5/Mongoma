import ReactFlow, {
	Controls,
	Background,
	OnLoadParams,
} from "react-flow-renderer";
import { useEffect, useState } from "react";

import * as api from "api";
import localforage from "lib/localforage";
import withIds from "utils/withIds";
import getRefs from "utils/getRefs";

import Collection from "components/Collection";

const graphStyles = {
	width: "100%",
};

const nodeTypes = {
	collection: Collection,
};

const onLoad = ({ fitView }: OnLoadParams) => {
	fitView();
};

const TheView = () => {
	const [elements, setElements] = useState<any>([]);

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
				edges.push({
					id: `${ref.id}-${ref.ref}`,
					source: schemaNames[idx],
					target: ref.ref,
					type: "smoothstep",
				});
			});

			return {
				id: schemaNames[idx],
				data: { schema: code, name: schemaNames[idx] },
				type: "collection",
				position: { x: 0, y: 0 },
			};
		});

		setElements([...nodes, ...edges]);
	};

	useEffect(() => {
		let subscription: any;

		localforage.ready().then(() => {
			const globalObservable = localforage.newObservable();
			subscription = globalObservable.subscribe({
				next: () => {
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

	return (
		<ReactFlow
			elements={elements}
			style={graphStyles}
			onLoad={onLoad}
			nodeTypes={nodeTypes}
			nodesDraggable
			paneMoveable
			panOnScroll>
			<Controls showInteractive={false} />
			<Background color="#aaa" gap={16} />
		</ReactFlow>
	);
};

export default TheView;
