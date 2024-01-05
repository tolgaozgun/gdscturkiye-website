import { baseUrl } from '../../constants/api';
import { Attendance, CreateAttendance, EditAttendance, LeadAttendance } from '../../types/AttendaceTypes';
import { Response } from '../../types/ResponseTypes';
import { AxiosInstance } from 'axios';

export async function getAllAttendances(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<Attendance>>>(`${baseUrl}/attendances`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getBuddyTeamAttendancesByFacilitator(axiosSecure: AxiosInstance, facilitatorId: number) {
	const res = await axiosSecure.get<Response<Array<Attendance>>>(`${baseUrl}/attendances/facilitator/${facilitatorId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getAttendanceListByCurrentLead(axiosSecure: AxiosInstance) {
    const res = await axiosSecure.get<Response<Array<LeadAttendance>>>(`${baseUrl}/attendances/lead/current`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
    return res.data;
}

export async function getAttendanceListByLeadId(axiosSecure: AxiosInstance, id: number) {
    const res = await axiosSecure.get<Response<Array<LeadAttendance>>>(`${baseUrl}/attendances/lead/${id}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
    return res.data;
}

export async function getAttendanceById(axiosSecure: AxiosInstance, id: number) {
    const res = await axiosSecure.get<Response<Attendance>>(`${baseUrl}/attendances/${id}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
    return res.data;
}

export async function createAttendance(axiosSecure: AxiosInstance, attendance: CreateAttendance) {
    const res = await axiosSecure.post<Response<Attendance>>(`${baseUrl}/attendances`, attendance)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
    return res.data;
}

export async function editAttendance(axiosSecure: AxiosInstance, id: number, attendance: EditAttendance) {
    const res = await axiosSecure.put<Response<Attendance>>(`${baseUrl}/attendances/${id}`, attendance)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
    return res.data;
}