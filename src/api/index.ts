import * as R from "ramda";
import localforage from "localforage";

import { SchemaNames, SchemaName } from "types";

export const getSchemaNames = () =>
	localforage.getItem<SchemaNames | null>("schemas");

export const addSchema = (schemaName: SchemaName, schemaNames: SchemaNames) =>
	localforage.setItem("schemas", R.append(schemaName, schemaNames));

export const removeSchema = (
	schemaName: SchemaName,
	schemaNames: SchemaNames
) =>
	localforage.setItem("schemas", R.reject(R.equals(schemaName), schemaNames));
