import * as R from "ramda";
import yaml from "js-yaml";

const walk = (schema: any) => {
	const fields: any[] = [];

	Object.entries(schema || {}).forEach(
		([field, value]: [field: string, value: any]) => {
			if (R.is(String, value)) {
				fields.push({ name: field, type: value });
			} else if (R.is(Object, value)) {
				if (value.type) {
					fields.push({ name: field, type: value.type, ref: value.ref });
				} else if (value?.length > 0) {
					// Array type

					const [fieldValue] = value;

					// eg: field: [string]
					if (R.is(String, fieldValue)) {
						fields.push({
							name: field,
							type: "arr",
							children: [
								{
									name: fieldValue,
									type: fieldValue,
								},
							],
						});
					} else {
						const children = walk(fieldValue);
						fields.push({
							name: field,
							type: "arr",
							children,
						});
					}
				} else {
					// Object type
					const children = walk(value);
					fields.push({
						name: field,
						type: "obj",
						children,
					});
				}
			}
		}
	);

	return fields;
};

const parse = (schemaString: string): any => {
	const parsedYaml = yaml.load(schemaString);

	return walk(parsedYaml || {});
};

export default parse;
