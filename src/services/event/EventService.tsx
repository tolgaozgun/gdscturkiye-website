import { baseUrl } from '../../constants/api';
import { Activity } from '../../types/EventTypes';
import { Response } from '../../types/ResponseTypes';
import { AxiosInstance } from 'axios';

export async function getAllEvents(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<Activity>>>(`${baseUrl}/events`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getEventsByUniversityId(universityId: number, axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<Activity>>>(`${baseUrl}/events/university/${universityId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getEventsByCurrentUserUniversity(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<Activity>>>(`${baseUrl}/events/university/current-user`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getEventsByCurrentUserBuddy(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<Activity>>>(`${baseUrl}/events/buddy-team/current-user`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function parseCurrentUserUniversityEvents(axiosSecure: AxiosInstance) {
    const res = await axiosSecure.post<Response<Array<Activity>>>(`${baseUrl}/events/parse/current-university`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
    return res.data;
}

export async function parseUniversityEventsByUniversityId(universityId: number, axiosSecure: AxiosInstance) {
    const res = await axiosSecure.post<Response<Array<Activity>>>(`${baseUrl}/events/parse/${universityId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
    return res.data;
}
