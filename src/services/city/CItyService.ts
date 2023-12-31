import { baseUrl } from '../../constants/api';
import { City, AddCity, UpdateCity } from '../../types/CityTypes';
import { Response } from '../../types/ResponseTypes';
import { AxiosInstance } from 'axios';

export async function getAllCities(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<City>>>(`${baseUrl}/cities`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function getCityById(axiosSecure: AxiosInstance, cityId: number) {
	const res = await axiosSecure.get<Response<Array<City>>>(`${baseUrl}/cities/${cityId}`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function createCity(axiosSecure: AxiosInstance, createCity: AddCity) {
	const res = await axiosSecure.post<Response<City>>(`${baseUrl}/cities/create`, createCity)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}

export async function editCity(axiosSecure: AxiosInstance, cityId: number, editCity: UpdateCity) {
	const res = await axiosSecure.post<Response<City>>(`${baseUrl}/cities/edit/${cityId}`, editCity)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}