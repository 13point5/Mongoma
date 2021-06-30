import { CollectionSchema, FieldType } from "../types";

const schema: CollectionSchema = [
	{
		key: 1,
		name: "id",
		type: FieldType.oid,
	},
	{
		key: 2,
		name: "archived",
		type: FieldType.bool,
	},
];

export default schema;
