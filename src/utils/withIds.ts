const addIds = (field, parentId) => {
	const fieldId = `${parentId}%${field.name}`;

	const fieldWithId = {
		id: fieldId,
		name: field.name,
		type: field.type,
	};

	if (!field.children) {
		return fieldWithId;
	}

	return {
		...fieldWithId,
		children: field.children.map((child) => addIds(child, fieldId)),
	};
};

const withIds = (schema, schemaName) =>
	schema.map((field) => addIds(field, schemaName));

export default withIds;
