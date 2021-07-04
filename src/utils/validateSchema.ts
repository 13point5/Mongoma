import Ajv from "ajv/dist/jtd";

const ajv = new Ajv();

const schema = {
	elements: {
		ref: "field",
	},
	definitions: {
		field: {
			properties: {
				name: { type: "string" },
				type: { type: "string" },
			},
			optionalProperties: {
				children: {
					elements: {
						ref: "field",
					},
				},
				ref: {
					type: "string",
				},
			},
		},
	},
};

const validate = ajv.compile(schema);

export default validate;
