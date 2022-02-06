import { useState, useEffect } from "react";

import { SchemaNames, SchemaName } from "types";
import * as api from "api";

import { Menu, Typography, Space, Divider, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Editor from "components/Editor";
import AddSchema from "./AddSchema";

import classes from "./styles.module.css";

const Workbench = () => {
	const [schemas, setSchemas] = useState<SchemaNames>([]);
	const [currentSchemaName, setCurrentSchemaName] = useState<SchemaName | null>(
		null
	);

	const updateSchemas = (newSchemas: SchemaNames | null) => {
		setSchemas(newSchemas || []);

		if (newSchemas && newSchemas.length > 0) {
			setCurrentSchemaName(newSchemas[0]);
		} else {
			setCurrentSchemaName(null);
		}
	};

	useEffect(() => {
		api.getSchemaNames().then(updateSchemas);
	}, []);

	const handleSelect = ({ key }: { key: string }) => {
		setCurrentSchemaName(key);
	};

	const removeSchema = (key: SchemaName) => {
		api.removeSchema(key, schemas).then(updateSchemas);
	};

	return (
		<div className={classes.root}>
			<div className={classes.schemaListSider}>
				<Space
					direction="vertical"
					align="center"
					size="large"
					style={{ width: "100%", marginTop: "1rem" }}>
					<Typography.Title level={5} style={{ color: "white" }}>
						Schemas
					</Typography.Title>
				</Space>
				<Divider style={{ borderColor: "white", margin: 0 }} />
				<AddSchema schemas={schemas} setSchemas={setSchemas} />
				<Menu
					mode="inline"
					theme="dark"
					selectedKeys={currentSchemaName ? [currentSchemaName] : []}
					onClick={handleSelect}>
					{schemas.map((schema) => (
						<Menu.Item key={schema}>
							<div className={classes.menuItem}>
								<Typography.Text ellipsis>{schema}</Typography.Text>

								{schema === currentSchemaName && (
									<Space size="small">
										<Button icon={<EditOutlined />} size="small" type="text" />
										<Button
											onClick={() => removeSchema(schema)}
											icon={<DeleteOutlined />}
											size="small"
											type="text"
										/>
									</Space>
								)}
							</div>
						</Menu.Item>
					))}
				</Menu>
			</div>

			{currentSchemaName && <Editor name={currentSchemaName} />}
		</div>
	);
};

export default Workbench;
