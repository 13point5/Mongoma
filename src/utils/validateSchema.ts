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
				type: {
					type: "string",
					// TODO: need to validate primitives and Schema names. eg: [str] and [SomeSchemaName]

					// enum: [
					// 	"oid",
					// 	"str",
					// 	"num",
					// 	"date",
					// 	"bool",
					// 	"arr",
					// 	"obj",
					// 	"mixed",
					// 	"map",
					// 	"decimal128",
					// ],
				},
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
