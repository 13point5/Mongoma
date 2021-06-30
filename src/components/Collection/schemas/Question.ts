import { CollectionSchema, FieldType } from "../types";

const schema: CollectionSchema = [
	{
		key: 1,
		name: "id",
		type: FieldType.oid,
	},
	{
		key: 2,
		name: "bucket",
		type: FieldType.oid,
	},
	{
		key: 3,
		name: "subtopic",
		type: FieldType.oid,
	},
	{
		key: 4,
		name: "topic",
		type: FieldType.oid,
	},

	{
		key: 5,
		name: "archived",
		type: FieldType.bool,
	},
	{
		key: 6,
		name: "hints",
		type: FieldType.arr,
		children: [
			{
				key: "6.1",
				name: "id",
				type: FieldType.oid,
			},
			{
				key: "6.2",
				name: "position",
				type: FieldType.num,
			},
			{
				key: "6.3",
				name: "archived",
				type: FieldType.bool,
			},
		],
	},
];

export default schema;
