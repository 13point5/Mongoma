import { Layout, Row } from "antd";
import Collection from "components/Collection";
import * as collectionSchemas from "components/Collection/schemas";

const App = () => {
	return (
		<Layout.Content style={{ padding: "2rem" }}>
			<Row gutter={16} justify="center">
				<Collection name="Topic" schema={collectionSchemas.Topic} />
				<Collection name="Subtopic" schema={collectionSchemas.Subtopic} />
				<Collection name="Resource" schema={collectionSchemas.Resource} />
				<Collection name="Question" schema={collectionSchemas.Question} />
			</Row>
		</Layout.Content>
	);
};

export default App;
