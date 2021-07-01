import { Table, Typography, Col } from "antd";
import { CollectionProps, CollectionTitleProps } from "./types";

const columns = [
	{
		title: "Field",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Type",
		dataIndex: "type",
		key: "type",
		width: "12%",
	},
];

const Title = ({ name, ...restProps }: CollectionTitleProps) => (
	<Typography.Title level={5} className="tableTitle" {...restProps}>
		{name}
	</Typography.Title>
);

const Collection = ({ schema, name, ...restProps }: CollectionProps) => {
	return (
		<Col span={10}>
			<Table
				title={() => <Title name={name} />}
				columns={columns}
				dataSource={schema}
				bordered
				size="small"
				pagination={false}
				{...restProps}
			/>
		</Col>
	);
};

export default Collection;
