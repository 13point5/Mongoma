import { FieldRef } from "types";

const getRefs = (schema: any): FieldRef[] => {
	let refs: FieldRef[] = [];

	schema.forEach((field: any) => {
		const { ref, children, key } = field;

		if (ref) {
			refs.push({ id: key, ref });
		}

		if (children) {
			refs = refs.concat([...getRefs(children)]);
		}
	});

	return refs;
};

export default getRefs;
