import { baseUrl } from '../../constants/api';
import { Response } from '../../types/ResponseTypes';
import { FacilitatorModel } from "../../types";
import { AxiosInstance } from 'axios';

export async function getAllFacilitators(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<FacilitatorModel>>>(`${baseUrl}/facilitators`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}