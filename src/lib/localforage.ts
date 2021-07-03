import localforage from "localforage";
import { extendPrototype } from "localforage-observable";
import { Observable } from "rxjs";

const lf = extendPrototype(localforage);

lf.newObservable.factory = function (subscribeFn) {
	return new Observable(subscribeFn);
};

lf.config({
	name: "Deebyma",
});

export default lf;
