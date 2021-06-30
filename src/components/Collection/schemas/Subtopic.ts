import { CollectionSchema, FieldType } from "../types";

const schema: CollectionSchema = [
	{
		key: 1,
		name: "id",
		type: FieldType.oid,
	},
	{
		key: 2,
		name: "topic",
		type: FieldType.str,
	},
	{
		key: 3,
		name: "position",
		type: FieldType.num,
	},

	{
		key: 4,
		name: "archived",
		type: FieldType.bool,
	},
	{
		key: 5,
		name: "buckets",
		type: FieldType.arr,
		children: [
			{
				key: "5.1",
				name: "id",
				type: FieldType.oid,
			},
			{
				key: "5.2",
				name: "position",
				type: FieldType.num,
			},
			{
				key: "5.3",
				name: "nextBucket",
				type: FieldType.oid,
			},
			{
				key: "5.4",
				name: "recommendations",
				type: FieldType.arr,
				children: [
					{
						key: "5.4.1",
						name: "id",
						type: FieldType.oid,
					},
				],
			},
		],
	},
	{
		key: 6,
		name: "resources",
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
		],
	},
];

export default schema;
