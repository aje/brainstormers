import {ObjectId} from "bson";

type UserType = {
	_id: ObjectId;
	name: string;
	email: string;
	image: string;
	emailVerified: boolean;
	postCount: number;
};
type CommentType = {
	_id: ObjectId;
	description?: string;
	author: UserType;
	idea: ObjectId;
	replies?: CommentType[];
	createdAt: Date;
	updatedAt: Date;
};

type ProblemType = string | CommentType;

type IdeaType = {
	_id: ObjectId;
	title: string;
	description?: string;
	raters?: ObjectId[];
	author?: ObjectId;
	upsides?: [];
	downsides?: [];
	problems?: ProblemType[];
	solutions?: ProblemType[];
	alternatives?: string[];
	targetAudience?: string[];
	tags?: string[];
	createdAt?: Date;
	updatedAt?: Date;
	rates?: {
		[key: string]: number;
	};
	ratingsAverage?: number;
};
