import * as R from "ramda";
import { useState, useEffect } from "react";
import localforage from "localforage";

import { Menu, Typography, Space, Divider, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Monaco from "components/Monaco";
import AddSchema from "./AddSchema";

import { SchemaNames, SchemaName } from "./types";
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
		}
	};

	useEffect(() => {
		localforage.getItem<SchemaNames | null>("schemas").then(updateSchemas);
	}, []);

	const handleSelect = ({ key }: { key: string }) => {
		setCurrentSchemaName(key);
	};

	const removeSchema = (key: SchemaName) => {
		localforage
			.setItem("schemas", R.reject(R.equals(key), schemas))
			.then(updateSchemas);
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

			<Monaco />
		</div>
	);
};

export default Workbench;
