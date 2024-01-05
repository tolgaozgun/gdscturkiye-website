import { baseUrl } from '../../constants/api';
import { Response } from '../../types/ResponseTypes';
import { CoreTeamMemberDashboardResponse, FacilitatorDashboardResponse, LeadDashboardResponse } from "../../types";
import { AxiosInstance } from 'axios';

export async function getLeadDashboard(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<LeadDashboardResponse>>(`${baseUrl}/leads/dashboard`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getCoreTeamMemberDashboard(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<CoreTeamMemberDashboardResponse>>(`${baseUrl}/core-team-members/dashboard`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getFacilitatorDashboard(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<FacilitatorDashboardResponse>>(`${baseUrl}/facilitators/dashboard`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}