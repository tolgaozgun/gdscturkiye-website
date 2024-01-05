import { baseUrl } from '../../constants/api';
import { Response } from '../../types/ResponseTypes';
import { LeadModel } from "../../types";
import { AxiosInstance } from 'axios';

export async function getAllLeads(axiosSecure: AxiosInstance) {
	const res = await axiosSecure.get<Response<Array<LeadModel>>>(`${baseUrl}/leads`)
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
	return res.data;
}