import "lib/localforage";

import Workbench from "components/Workbench";
import TheView from "components/TheView";

const App = () => {
	return (
		<div style={{ display: "flex", width: "100vw", height: "100vh" }}>
			<Workbench />
			<TheView />
		</div>
	);
};

export default App;
