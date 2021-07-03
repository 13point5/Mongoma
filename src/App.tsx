import "lib/localforage";

import { ReactFlowProvider } from "react-flow-renderer";

import Workbench from "components/Workbench";
import TheView from "components/TheView";

const App = () => {
	return (
		<div style={{ display: "flex", width: "100vw", height: "100vh" }}>
			<Workbench />
			<ReactFlowProvider>
				<TheView />
			</ReactFlowProvider>
		</div>
	);
};

export default App;
