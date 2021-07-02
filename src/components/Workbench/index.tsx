import { useState, useEffect } from "react";
import localforage from "localforage";
import { Layout, Menu, Typography, Space, Divider } from "antd";

import Monaco from "components/Monaco";
import AddSchema from "./AddSchema";

import classes from "./styles.module.css";

const { Sider, Content } = Layout;

const Workbench = () => {
	const [schemas, setSchemas] = useState<string[]>([]);

	useEffect(() => {
		localforage.getItem<string[]>("schemas").then((value) => {
			setSchemas(value || []);
		});
	}, []);

	return (
		<Layout className={classes.root}>
			<Sider className={classes.fileListSider}>
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
				<Menu mode="inline" theme="dark" className={classes.fileList}>
					{schemas.map((schema) => (
						<Menu.Item key={schema}>{schema}</Menu.Item>
					))}
				</Menu>
			</Sider>

			<Content>
				<Monaco />
			</Content>
		</Layout>
	);
};

export default Workbench;
