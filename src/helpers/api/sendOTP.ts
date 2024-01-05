import axios from "axios";

export default async function sendOTP(requestBody: string) {
  const { data } = await axios.post(
    `https://prodapp.lifepharmacy.com/api/auth/request-otp`,
    requestBody,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
}
