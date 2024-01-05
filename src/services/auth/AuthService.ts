import { AxiosInstance } from 'axios';
import { RegisterAdmin, RegisterCoreTeam, RegisterFacilitator, RegisterGoogler, RegisterLead } from './../../types/AuthTypes';

import { baseUrl } from '../../constants/api';
import { Tokens, User, UserWithRole } from '../../types';
import { Response } from '../../types/ResponseTypes';
import axios from 'axios';

export async function login(email: string, password: string): Promise<Response<User>> {
	const res = await axios.post<Response<User>>(`${baseUrl}/auth/login`, {
		email,
		password,
	})
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function logout() {
	const res = await axios.post<Response<null>>(`${baseUrl}/auth/logout`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	})
	return res.data;
}

export async function registerLead(
	userDetails: RegisterLead,
): Promise<Response<User>> {
	const res = await axios.post<Response<User>>(
		`${baseUrl}/auth/register/lead`,
		userDetails,
	)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function registerGoogler(
	userDetails: RegisterGoogler,
): Promise<Response<User>> {
	const res = await axios.post<Response<User>>(
		`${baseUrl}/auth/register/googler`,
		userDetails,
	)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function registerAdmin(
	userDetails: RegisterAdmin,
): Promise<Response<User>> {
	const res = await axios.post<Response<User>>(
		`${baseUrl}/auth/register/admin`,
		userDetails,
	)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function registerFacilitator(
	userDetails: RegisterFacilitator,
): Promise<Response<User>> {
	const res = await axios.post<Response<User>>(
		`${baseUrl}/auth/register/facilitator`,
		userDetails,
	)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function registerCoreTeam(
	userDetails: RegisterCoreTeam,
): Promise<Response<User>> {
	const res = await axios.post<Response<User>>(
		`${baseUrl}/auth/register/core-team`,
		userDetails,
	)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function refresh(
	refreshToken: string,
	axiosSecure: AxiosInstance,
): Promise<Response<Tokens>> {
	const res = await axiosSecure.get<Response<Tokens>>(`${baseUrl}/auth/refresh`, {
		withCredentials: true,
		headers: {
			Authorization: `Bearer ${refreshToken}`,
		},
	})
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getCurrentUser(axiosSecure: AxiosInstance): Promise<Response<User>> {
	const res = await axiosSecure.get<Response<User>>(`${baseUrl}/auth/current-user`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getCurrentUserWithRole(axiosSecure: AxiosInstance): Promise<Response<UserWithRole>> {
	const res = await axiosSecure.get<Response<UserWithRole>>(`${baseUrl}/auth/current-user-with-role`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}
