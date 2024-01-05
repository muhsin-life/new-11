import axios, { AxiosRequestConfig } from "axios";

interface TVerifyOtp {
  requestOptions: AxiosRequestConfig;
  requestBody: string;
}

export default async function verifyOTP({
  requestOptions,
  requestBody,
}: TVerifyOtp) {
  const { data } = await axios.post(
    `https://prodapp.lifepharmacy.com/api/auth/verify-otp`,
    requestBody,
    requestOptions
  );

  return data;
}
