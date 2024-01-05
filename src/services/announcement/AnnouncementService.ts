import { baseUrl } from '../../constants/api';
import { Announcement, CreateAnnouncement, EditAnnouncement } from '../../types/AnnouncementTypes';
import { Response } from '../../types/ResponseTypes';
import { AxiosInstance } from 'axios';

export async function getUserAnnouncements(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<Announcement>>>(`${baseUrl}/announcements`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getAllAnnouncements(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<Announcement>>>(`${baseUrl}/announcements/all`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getAnnouncementById(axiosSecure: AxiosInstance, announcementId: number) {
    const res = await axiosSecure.get<Response<Array<Announcement>>>(`${baseUrl}/announcements/${announcementId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
    return res.data;
}

export async function createAnnouncement(axiosSecure: AxiosInstance, createAnnouncement: CreateAnnouncement) {
    const res = await axiosSecure.post<Response<Array<Announcement>>>(`${baseUrl}/announcements/create`, {params: createAnnouncement})
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
    return res.data;
}

export async function editAnnouncement(axiosSecure: AxiosInstance, announcementId: number, editAnnouncement: EditAnnouncement) {
    const res = await axiosSecure.post<Response<Array<Announcement>>>(`${baseUrl}/announcements/edit/${announcementId}`, editAnnouncement)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
    return res.data;
}