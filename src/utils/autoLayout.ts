/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import dagre from "dagre";
import { isNode, Position } from "react-flow-renderer";

const NWIDTH = 400;
const NHEIGHT = 500;

export const getLayoutedElements = (elements: any, direction = "LR") => {
	const isHorizontal = direction === "LR";
	const dagreGraph = new dagre.graphlib.Graph({ directed: true });
	dagreGraph.setGraph({ rankdir: direction });
	dagreGraph.setDefaultEdgeLabel(() => ({}));

	elements.forEach((el: any) => {
		if (isNode(el)) {
			const nodeWidth = el.__rf?.width || NWIDTH;
			const nodeHeight = el.__rf?.height || NHEIGHT;

			dagreGraph.setNode(el.id, {
				// width: el.__rf?.width,
				// height: el.__rf?.height,
				width: nodeWidth,
				height: nodeHeight,
			});
		} else {
			dagreGraph.setEdge(el.source, el.target);
		}
	});

	dagre.layout(dagreGraph);

	return elements.map((el: any) => {
		if (isNode(el)) {
			const nodeWithPosition = dagreGraph.node(el.id);
			el.targetPosition = isHorizontal ? Position.Left : Position.Top;
			el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

			// unfortunately we need this little hack to pass a slightly different position
			// to notify react flow about the change. Moreover we are shifting the dagre node position
			// (anchor=center center) to the top left so it matches the react flow node anchor point (top left).

			// el.position = {
			// 	x: nodeWithPosition.x - el.__rf?.width / 2 + Math.random() / 1000,
			// 	y: nodeWithPosition.y - el.__rf?.height / 2,
			// };

			const nodeWidth = el.__rf?.width || NWIDTH;
			const nodeHeight = el.__rf?.height || NHEIGHT;

			el.position = {
				x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
				y: nodeWithPosition.y - nodeHeight / 2,
			};
		}

		return el;
	});
};
