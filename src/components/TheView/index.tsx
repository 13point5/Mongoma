import ReactFlow, {
	Controls,
	Background,
	OnLoadParams,
	useZoomPanHelper,
	Elements as RfrElements,
} from "react-flow-renderer";
import { useEffect, useState } from "react";

import * as api from "api";
import localforage from "lib/localforage";
import getViewElements from "utils/getViewElements";
import { getLayoutedElements } from "utils/autoLayout";
import { LocalforageSubscription } from "types";

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
};

const TheView = () => {
	const [elements, setElements] = useState<RfrElements>([]);
	const { fitView } = useZoomPanHelper();

	const getSchemas = async () => {
		const schemaNames = (await api.getSchemaNames()) || [];

		const schemaCodes = await Promise.all(
			schemaNames?.map((name) => api.getSchemaCode(name))
		);

		setElements(getLayoutedElements(getViewElements(schemaCodes, schemaNames)));
	};

	useEffect(() => {
		let subscription: LocalforageSubscription;

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
	}, [elements, fitView]);

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
