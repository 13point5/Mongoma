import { Table, Typography, Col } from "antd";
import { CollectionProps } from "./types";

const columns = [
	{
		title: "Field name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Field type",
		dataIndex: "type",
		key: "type",
		width: "12%",
	},
];

const tableStyle = {};

const Collection = ({ schema, name, ...restProps }: CollectionProps) => {
	return (
		<Col span={10}>
			<Table
				title={() => <Typography.Title level={4}>{name}</Typography.Title>}
				columns={columns}
				dataSource={schema}
				bordered
				style={{ ...tableStyle }}
				size="small"
				{...restProps}
			/>
		</Col>
	);
};

export default Collection;
