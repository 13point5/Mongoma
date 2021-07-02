import { Layout, Row, Col } from "antd";
import Collection from "components/Collection";
import collectionSchemas from "components/Collection/schemas";

const TheView = () => {
	const collections = Object.keys(collectionSchemas);
	return (
		<Layout.Content style={{ padding: "2rem" }}>
			<Row gutter={16} justify="center">
				{collections.map((collection) => (
					<Col span={10} key={collection}>
						<Collection
							name={collection}
							schema={collectionSchemas[collection]}
						/>
					</Col>
				))}
			</Row>
		</Layout.Content>
	);
};

export default TheView;
