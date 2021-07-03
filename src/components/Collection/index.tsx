import { Handle, Position } from "react-flow-renderer";
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
	},
	{
		title: "Ref",
		dataIndex: "ref",
		key: "ref",
	},
];

const Title = ({ name, ...restProps }: CollectionTitleProps) => (
	<Typography.Title level={5} className={classes.tableTitle} {...restProps}>
		{name}
	</Typography.Title>
);

const Collection = ({ data, ...restProps }: CollectionProps) => {
	const { schema, name } = data;

	return (
		<>
			<Table
				title={() => <Title name={name} />}
				columns={columns}
				dataSource={schema}
				bordered
				size="small"
				pagination={false}
				{...restProps}
			/>
			<Handle id="ns" type="source" position={Position.Bottom} />
			<Handle id="nt" type="target" position={Position.Right} />
			<Handle id="ds" type="source" position={Position.Top} />
			<Handle id="dt" type="target" position={Position.Left} />
		</>
	);
};

export default Collection;
