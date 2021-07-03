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
				type: { enum: ["str", "num", "bool", "arr", "obj"] },
			},
			optionalProperties: {
				children: {
					elements: {
						ref: "field",
					},
				},
			},
		},
	},
};

const parse = ajv.compileParser(schema);

function parseAndLog(json: string) {
	const data = parse(json);
	if (data === undefined) {
		// console.log(parse.position); // error position in string
		throw new Error(parse.message);
	} else {
		return data;
	}
}

export default parseAndLog;
