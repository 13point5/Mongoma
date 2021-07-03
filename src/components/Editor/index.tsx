import { useEffect, useState, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

import * as api from "api";

import { Button, message } from "antd";
import { UnControlled as CodeMirror } from "react-codemirror2";
import jsonlint from "jsonlint-mod";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/addon/lint/lint.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";

import classes from "./styles.module.css";

interface Props {
	name: string;
}

declare const window: any;
window.jsonlint = jsonlint;

const Editor = ({ name }: Props) => {
	const editorRef: any = useRef(null);
	const [defaultValue, setDefaultValue] = useState("");

	useEffect(() => {
		api.getSchemaDraft(name).then((draft) => setDefaultValue(draft || ""));
	}, [name]);

	const saveDraft = useDebouncedCallback((code) => {
		api.updateSchemaDraft(name, code);
	}, 1000);

	const handleDidMount = (editor: any) => {
		editorRef.current = editor;
	};

	const handleChange = (editor: any, _: any, newValue: string) => {
		editorRef.current = editor;
		saveDraft(newValue);
	};

	const handleSave = () => {
		const markers = Object.keys(editorRef.current.state.lint.marked).length;
		if (markers > 0) {
			message.error("Fix the errors!");
		} else {
			const code = editorRef.current.getValue();

			api.updateSchemaCode(name, code);
			api.updateSchemaDraft(name, code);
		}
	};

	return (
		<div className={classes.root}>
			<CodeMirror
				value={defaultValue}
				editorDidMount={handleDidMount}
				onChange={handleChange}
				className={classes.editor}
				options={{
					theme: "dracula",
					mode: {
						name: "javascript",
						json: true,
					},
					lineNumbers: true,
					tabSize: 2,
					gutters: ["CodeMirror-lint-markers"],
					lint: true,
				}}
			/>
			<Button onClick={handleSave} className={classes.saveButton}>
				Save
			</Button>
		</div>
	);
};

export default Editor;
