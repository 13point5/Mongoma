import withIds from "utils/withIds";
import getRefs from "utils/getRefs";
import { SchemaNames } from "types";
import parseYamlSchema from "utils/parseYamlSchema";

const getViewElements = (
	schemaCodes: (string | null)[],
	schemaNames: SchemaNames
) => {
	const schemaCodesWithIds = schemaCodes.map((code, idx) =>
		withIds(parseYamlSchema(code || ""), schemaNames[idx])
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

	return [...nodes, ...edges];
};

export default getViewElements;
