import { CollectionSchema } from "../types";
import Topic from "./Topic";
import Subtopic from "./Subtopic";
import Resource from "./Resource";
import Question from "./Question";

const schemas: {
	[schema: string]: CollectionSchema;
} = {
	Topic,
	Subtopic,
	Resource,
	Question,
};

export default schemas;
