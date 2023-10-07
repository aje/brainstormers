import {ObjectId} from "bson";

export type UserType = {
	_id: ObjectId;
	name: string;
	email: string;
	image: string;
	emailVerified: boolean;
	postCount: number;
};
export type CommentType = {
	_id: ObjectId;
	description?: string;
	author: UserType;
	idea: ObjectId;
	replies?: CommentType[];
	createdAt: Date;
	updatedAt: Date;
};

export type ProblemType = string | CommentType;

export type IdeaType = {
	_id: ObjectId;
	title: string;
	description?: string;
	raters?: ObjectId[];
	author?: UserType;
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
	ratingsQuantity?: number;
};
