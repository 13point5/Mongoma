import MonacoEditor, { EditorProps } from "@monaco-editor/react";

const defaultProps: EditorProps = {
	height: "100vh",
	width: "400px",
	language: "json",
	theme: "vs-dark",
	options: {
		tabSize: 2,
	},
};

const Monaco = () => {
	return <MonacoEditor {...defaultProps} />;
};

export default Monaco;
