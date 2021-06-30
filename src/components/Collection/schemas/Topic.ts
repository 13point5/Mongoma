import { CollectionSchema, FieldType } from "../types";

const schema: CollectionSchema = [
	{
		key: 1,
		name: "id",
		type: FieldType.oid,
	},
	{
		key: 2,
		name: "name",
		type: FieldType.str,
	},
	{
		key: 3,
		name: "parents",
		type: FieldType.arr,
		children: [
			{
				key: "3.1",
				name: "id",
				type: FieldType.oid,
			},
		],
	},
	{
		key: 4,
		name: "children",
		type: FieldType.arr,
		children: [
			{
				key: "4.1",
				name: "id",
				type: FieldType.oid,
			},
		],
	},
];

export default schema;
