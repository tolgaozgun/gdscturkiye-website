import { baseUrl } from '../../constants/api';
import { Response } from '../../types/ResponseTypes';
import { AxiosInstance } from 'axios';
import { CoreTeam } from '../../types/TeamTypes';

export async function getAllCoreTeams(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<CoreTeam>>>(`${baseUrl}/core-teams`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getCoreTeamByCurrentLead(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<CoreTeam>>(`${baseUrl}/core-teams/current-lead`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getCoreTeamByCoreTeamMember(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<CoreTeam>>(`${baseUrl}/core-teams/current-member`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getCoreTeamById(axiosSecure: AxiosInstance, coreTeamId: number) {
	const res = await axiosSecure.post<Response<CoreTeam>>(`${baseUrl}/buddy-teams/${coreTeamId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}
