import bsonTypes from "constants/bsonTypes";

const addIds = (field: any, parentId: any) => {
	const fieldId = `${parentId}%${field.name}`;

	let fieldWithId: any = {
		key: fieldId,
		name: field.name,
		type: field.type,
	};

	if (field.ref) {
		fieldWithId = {
			...fieldWithId,
			ref: field.ref,
		};
	} else if (!bsonTypes.includes(field.type)) {
		fieldWithId = {
			...fieldWithId,
			type: "Sub-Doc",
			subDocRef: field.type,
		};
	}

	if (!field.children) {
		return fieldWithId;
	}

	return {
		...fieldWithId,
		children: field.children.map((child: any) => addIds(child, fieldId)),
	};
};

const withIds = (schema: any, schemaName: string) =>
	schema.map((field: any) => addIds(field, schemaName));

export default withIds;
