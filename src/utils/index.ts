import { SchemaName } from "types";

export const getSchemaCodeName = (schemaName: SchemaName) =>
	`deebymaSchema%${schemaName}`;

export const getSchemaDraftName = (schemaName: SchemaName) =>
	`deebymaSchemaDraft%${schemaName}`;
