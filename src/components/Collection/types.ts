export enum FieldType {
	oid = "oid",
	str = "str",
	num = "num",
	arr = "arr",
	bool = "bool",
	dateTime = "dateTime",
}

export interface Field {
	key: number | string;
	name: string;
	type: FieldType;
	children?: Field[];
}

export type CollectionSchema = Field[];

export interface CollectionProps {
	schema: Field[];
	name: string;
}
