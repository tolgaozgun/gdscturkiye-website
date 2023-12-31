import { baseUrl } from "../../constants/api";
import { Response } from "../../types/ResponseTypes";
import {
  EmailResendRequest,
  EmailVerificationRequest,
} from "../../types/VerificationTypes";
import { axiosSecure as axios } from "../axios";

export async function verifyEmail(
  verifyEmail: EmailVerificationRequest
): Promise<Response<string>> {
  const res = await axios.post<Response<string>>(
    `${baseUrl}/email-verification/verify`,
    verifyEmail
  )
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
  return res.data;
}

export async function resendEmailVerification(
  emailResendRequest: EmailResendRequest
): Promise<Response<string>> {
  const res = await axios.post<Response<string>>(
    `${baseUrl}/email-verification/resend`,
    emailResendRequest
  )
	.catch((err) => {
		if (err.response) {
			return err.response;
		}
		return err;
	});
  return res.data;
}
