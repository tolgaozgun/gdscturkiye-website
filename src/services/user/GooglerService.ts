import { baseUrl } from '../../constants/api';
import { Response } from '../../types/ResponseTypes';
import { GooglerModel } from "../../types";
import { AxiosInstance } from 'axios';

export async function getAllGooglers(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<GooglerModel>>>(`${baseUrl}/googlers`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}