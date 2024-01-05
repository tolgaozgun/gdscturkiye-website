import { baseUrl } from "../../constants/api";
import {
  Country,
  CreateCountry,
  UpdateCountry,
} from "../../types/CountryTypes";
import { Response } from "../../types/ResponseTypes";
import { AxiosInstance } from "axios";

export async function getAllCountries(axiosSecure: AxiosInstance) {
  const res = await axiosSecure.get<Response<Array<Country>>>(
    `${baseUrl}/countries`
  )
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
  return res.data;
}

export async function getCountryById(axiosSecure: AxiosInstance, id: number) {
  const res = await axiosSecure.get<Response<Array<Country>>>(
    `${baseUrl}/countries/by-id/${id}`
  )
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
  return res.data;
}

export async function createCountry(
  axiosSecure: AxiosInstance,
  createCountry: CreateCountry
) {
  const res = await axiosSecure.post<Response<Country>>(
    `${baseUrl}/countries/create`,
    createCountry
  )
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
  return res.data;
}

export async function editCountry(
  axiosSecure: AxiosInstance,
  editCountry: UpdateCountry
) {
  const res = await axiosSecure.post<Response<Country>>(
    `${baseUrl}/countries/edit`,
    editCountry
  )
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
  return res.data;
}
