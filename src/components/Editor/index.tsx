import { useEffect, useState, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import yaml from "js-yaml";

import * as api from "api";

import { Button, message } from "antd";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/addon/lint/lint.css";
import "codemirror/mode/yaml/yaml";
import "codemirror/mode/yaml-frontmatter/yaml-frontmatter";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/yaml-lint";

import classes from "./styles.module.css";

interface Props {
	name: string;
}

declare const window: any;
window.jsyaml = yaml;

const Editor = ({ name }: Props) => {
	const editorRef: any = useRef(null);
	const [defaultValue, setDefaultValue] = useState("");

	useEffect(() => {
		api.getSchemaDraft(name).then((draft) => {
			setDefaultValue(draft || "");
		});
	}, [name]);

	const saveDraft = useDebouncedCallback((code) => {
		api.updateSchemaDraft(name, code);
	}, 1000);

	const handleDidMount = (editor: any) => {
		editorRef.current = editor;
	};

	const handleChange = (editor: any, _: any, newValue: string) => {
		setDefaultValue(newValue);
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

	const loadLastSavedCode = () => {
		api.getSchemaCode(name).then((lastSavedCode) => {
			setDefaultValue(lastSavedCode || "");
		});
	};

	return (
		<div className={classes.root}>
			<CodeMirror
				value={defaultValue}
				editorDidMount={handleDidMount}
				onBeforeChange={handleChange}
				className={classes.editor}
				options={{
					autoCloseBrackets: true,
					theme: "dracula",
					mode: "yaml",
					lineNumbers: true,
					tabSize: 2,
					gutters: ["CodeMirror-lint-markers"],
					lint: true,
				}}
			/>
			<div className={classes.actions}>
				<Button onClick={handleSave}>Save</Button>
				<Button onClick={loadLastSavedCode}>Last saved code</Button>
			</div>
		</div>
	);
};

export default Editor;
