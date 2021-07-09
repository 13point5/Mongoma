import { FieldRef } from "types";

const getRefs = (schema: any): FieldRef[] => {
	let refs: FieldRef[] = [];

	schema.forEach((field: any) => {
		const { ref, children, key, subDocRef } = field;

		if (ref || subDocRef) {
			refs.push({ id: key, ref: ref || subDocRef });
		}

		if (children) {
			refs = refs.concat([...getRefs(children)]);
		}
	});

	return refs;
};

export default getRefs;
