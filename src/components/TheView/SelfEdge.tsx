import { getBezierPath, getMarkerEnd, Position } from "react-flow-renderer";
import { createPath } from "utils/edgePath";

interface Props {
	id: string;
	source: string;
	target: string;
	sourceX: number;
	sourceY: number;
	targetX: number;
	targetY: number;
	sourcePosition: Position;
	targetPosition: Position;
	style: { [key: string]: any };
	data: any;
	arrowHeadType: any;
	markerEndId: any;
}

export default function SelfEdge({
	id,
	source,
	target,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	data,
	arrowHeadType,
	markerEndId,
}: Props) {
	const s = { pos: sourcePosition, x: sourceX, y: sourceY, id: source };
	const t = {
		pos: targetPosition,
		x: targetX,
		y: targetY,
		id: target,
	};

	const edgePath = createPath(s, t);

	const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

	return (
		<path
			id={id}
			style={{ stroke: "red", strokeWidth: "2", ...style }}
			className="react-flow__edge-path selfEdge"
			d={edgePath}
			markerEnd={markerEnd}
		/>
	);
}
