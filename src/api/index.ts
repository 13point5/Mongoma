import * as R from "ramda";
import localforage from "lib/localforage";

import { SchemaNames, SchemaName } from "types";
import { getSchemaCodeName, getSchemaDraftName } from "utils";
import validateSchema from "utils/validateSchema";

import { message } from "antd";

export const getSchemaNames = () =>
	localforage.getItem<SchemaNames | null>("schemas");

/* SCHEMA CODE */

export const getSchemaCode = (schemaName: SchemaName): Promise<string | null> =>
	localforage.getItem(getSchemaCodeName(schemaName));

export const updateSchemaCode = (schemaName: SchemaName, code = "[]") => {
	try {
		validateSchema(code);
	} catch (error) {
		message.error(error.message || "Invalid syntax");
	}
	return localforage.setItem(getSchemaCodeName(schemaName), code);
};

export const removeSchemaCode = (schemaName: SchemaName) =>
	localforage.removeItem(getSchemaCodeName(schemaName));

/* SCHEMA DRAFT */

export const getSchemaDraft = (
	schemaName: SchemaName
): Promise<string | null> =>
	localforage.getItem(getSchemaDraftName(schemaName));

export const updateSchemaDraft = (schemaName: SchemaName, code = "[]") =>
	localforage.setItem(getSchemaDraftName(schemaName), code);

export const removeSchemaDraft = (schemaName: SchemaName) =>
	localforage.removeItem(getSchemaDraftName(schemaName));

/* SCHEMA */

export const addSchema = async (
	schemaName: SchemaName,
	schemaNames: SchemaNames
) => {
	const updatedSchemaNames = await localforage.setItem(
		"schemas",
		R.append(schemaName, schemaNames)
	);

	await updateSchemaCode(schemaName);
	await updateSchemaDraft(schemaName);

	return updatedSchemaNames;
};

export const removeSchema = async (
	schemaName: SchemaName,
	schemaNames: SchemaNames
) => {
	const updatedSchemaNames = await localforage.setItem(
		"schemas",
		R.reject(R.equals(schemaName), schemaNames)
	);

	await removeSchemaCode(schemaName);
	await removeSchemaDraft(schemaName);

	return updatedSchemaNames;
};
