import { Layout, Row } from "antd";
import Collection from "components/Collection";
import collectionSchemas from "components/Collection/schemas";

const App = () => {
	const collections = Object.keys(collectionSchemas);
	return (
		<Layout.Content style={{ padding: "2rem" }}>
			<Row gutter={16} justify="center">
				{collections.map((collection) => (
					<Collection name={collection} schema={collectionSchemas[collection]} key={collection} />
				))}
			</Row>
		</Layout.Content>
	);
};

export default App;
