import { baseUrl } from '../../constants/api';
import { AnswerQuestion, AskQuestion, Question, QuestionCategory } from '../../types/QuestionTypes';
import { Response } from '../../types/ResponseTypes';
import { AxiosInstance } from 'axios';

export async function getAllQuestions(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<Question>>>(`${baseUrl}/questions`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getQuestionsByCategory(axiosSecure: AxiosInstance, categoryId: number) {
	const res = await axiosSecure.get<Response<Array<Question>>>(`${baseUrl}/questions/by-category/${categoryId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getAllQuestionCategories(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<QuestionCategory>>>(`${baseUrl}/questions/categories`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getQuestionCategoryById(axiosSecure: AxiosInstance, categoryId: number) {
	const res = await axiosSecure.get<Response<Array<QuestionCategory>>>(`${baseUrl}/questions/categories/${categoryId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getQuestionById(axiosSecure: AxiosInstance, questionId: number) {
	const res = await axiosSecure.get<Response<Array<Question>>>(`${baseUrl}/questions/${questionId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getQuestionsAskedByUser(axiosSecure: AxiosInstance, userId: number) {
	const res = await axiosSecure.get<Response<Array<Question>>>(`${baseUrl}/questions/asked-by-user/${userId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getQuestionsAnsweredByUser(axiosSecure: AxiosInstance, userId: number) {
	const res = await axiosSecure.get<Response<Array<Question>>>(`${baseUrl}/questions/answered-by-user/${userId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getQuestionsAskedAnsweredByUser(axiosSecure: AxiosInstance, userId: number) {
	const res = await axiosSecure.get<Response<Array<Question>>>(`${baseUrl}/questions/asked-answered-by-user/${userId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function askQuestion(axiosSecure: AxiosInstance, askQuestion: AskQuestion) {
	const res = await axiosSecure.post<Response<Question>>(`${baseUrl}/questions/ask`, askQuestion)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function answerQuestion(axiosSecure: AxiosInstance, answerQuestion: AnswerQuestion) {
	const res = await axiosSecure.post<Response<Question>>(`${baseUrl}/questions/answer`, answerQuestion)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

