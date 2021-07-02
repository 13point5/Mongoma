import * as R from "ramda";
import {
	useState,
	KeyboardEvent,
	Dispatch,
	SetStateAction,
	ChangeEvent,
} from "react";
import localforage from "localforage";
import { Button, Space, Input, Alert } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

import { SchemaNames, SchemaName } from "../types";

interface Props {
	schemas: SchemaNames;
	setSchemas: Dispatch<SetStateAction<SchemaNames>>;
}

const AddSchema = ({ schemas, setSchemas }: Props) => {
	const [newSchema, setNewSchema] = useState<SchemaName | null>(null);
	const [alert, setAlert] = useState<null | {
		type: "warning" | "error";
		message: string;
	}>(null);

	const startAddingNewSchema = () => {
		if (!R.isNil(newSchema)) return;

		setNewSchema("");
	};

	const stopAddingNewSchema = () => {
		setAlert(null);
		setNewSchema(null);
	};

	const alertDuplicate = () => {
		setAlert({ type: "warning", message: "Schema already exists!" });
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (R.includes(value, schemas)) {
			alertDuplicate();
		}

		setNewSchema(e.target.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			if (R.isNil(newSchema) || newSchema === "") {
				setAlert({ type: "warning", message: "Type something!!" });
			} else if (R.includes(newSchema, schemas)) {
				alertDuplicate();
			} else {
				localforage
					.setItem("schemas", R.append(newSchema, schemas))
					.then((value) => {
						setSchemas(value || []);
					});
			}
		} else if (e.key === "Escape" || e.key === "Esc") {
			stopAddingNewSchema();
		} else {
			setAlert(null);
		}
	};

	return (
		<Space
			style={{ padding: "0.75rem 0.5rem", width: "100%" }}
			direction="vertical"
			align="center"
			size="middle">
			{!R.isNil(newSchema) ? (
				<Space direction="vertical">
					<Input
						type="text"
						autoFocus
						value={newSchema}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						size="small"
					/>

					{alert && (
						<Alert {...alert} closable style={{ padding: "0.125rem 0.5rem" }} />
					)}
				</Space>
			) : (
				<Button
					onClick={startAddingNewSchema}
					icon={<FileAddOutlined />}
					size="small">
					Schema
				</Button>
			)}
		</Space>
	);
};

export default AddSchema;
