import localforage from "localforage";
import Workbench from "components/Workbench";

localforage.config({
	name: "Deebyma",
});

const App = () => {
	return <Workbench />;
};

export default App;
