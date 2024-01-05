import { baseUrl } from '../../constants/api';
import { BuddyTeam, EditBuddyTeam } from '../../types/BuddyTeamTypes';
import { Response } from '../../types/ResponseTypes';
import { AxiosInstance } from 'axios';

export async function getAllBuddyTeams(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<BuddyTeam>>>(`${baseUrl}/buddy-teams`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getBuddyTeamByCurrentLead(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<BuddyTeam>>(`${baseUrl}/buddy-teams/by-lead`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getBuddyTeamByCurrentFacilitator(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<BuddyTeam>>(`${baseUrl}/buddy-teams/by-facilitator`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function updateBuddyTeamById(axiosSecure: AxiosInstance, buddyTeamId: number, editBuddyTeam: EditBuddyTeam) {
	const res = await axiosSecure.post<Response<BuddyTeam>>(`${baseUrl}/buddy-teams/update/${buddyTeamId}`, editBuddyTeam)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function updateBuddyTeamByLead(axiosSecure: AxiosInstance, editBuddyTeam: EditBuddyTeam) {
	const res = await axiosSecure.post<Response<BuddyTeam>>(`${baseUrl}/buddy-teams/update/by-lead`, editBuddyTeam)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function updateBuddyTeamByFacilitator(axiosSecure: AxiosInstance, editBuddyTeam: EditBuddyTeam) {
	const res = await axiosSecure.post<Response<BuddyTeam>>(`${baseUrl}/buddy-teams/update/by-facilitator`, editBuddyTeam)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}