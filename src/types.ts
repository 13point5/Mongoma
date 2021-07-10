export type SchemaName = string;

export type SchemaNames = SchemaName[];

export interface AlertState {
	type: "warning" | "error";
	message: string;
}

export interface Field {
	key: number | string;
	name: string;
	type: string;
	children?: Field[];
}

export type CollectionSchema = Field[];

export interface CollectionProps {
	data: {
		schema: Field[];
		name: string;
	};
}

export interface CollectionTitleProps {
	name: string;
}

export interface FieldRef {
	id: string;
	ref: string;
}

export type NullFunc = () => void;

export interface LocalforageSubscription {
	unsubscribe(): void;
}
