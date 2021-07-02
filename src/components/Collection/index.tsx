import { Table, Typography } from "antd";
import { CollectionProps, CollectionTitleProps } from "types";

import classes from "./styles.module.css";

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
	<Typography.Title level={5} className={classes.tableTitle} {...restProps}>
		{name}
	</Typography.Title>
);

const Collection = ({ schema, name, ...restProps }: CollectionProps) => (
	<Table
		title={() => <Title name={name} />}
		columns={columns}
		dataSource={schema}
		bordered
		size="small"
		pagination={false}
		{...restProps}
	/>
);

export default Collection;
