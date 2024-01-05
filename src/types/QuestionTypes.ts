import { UserModel } from "./UserTypes";

export type Question = {
    questionId: number;
    title: string;
    question: string;
    answer?: string;
    askedBy: UserModel;
    replies: QuestionReply[];
    answeredBy?: UserModel;
    askedDate: Date;
    answeredDate?: Date;
    category: QuestionCategory;
    votes: number;
}

export type QuestionCategory = {
    questionCategoryId: number;
    name: string;
    image: string;
    shortUrl: string;
}
    
export type AnswerQuestion = {
    questionId: number;
    answer: string;
}

export type AskQuestion = {
    question: string;
}

export type QuestionReply = {
    questionId: number;
    reply: string;
    votes: number;
    answeredBy: UserModel;
    answeredDate: Date;
}
