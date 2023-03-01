// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ronaldinho: string;
};

const BASE_URL: string = "https://apicncbrasil.cn.org.br/api";

export default async function token(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const params: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "*",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: process.env.CNC_USER_EMAIL,
        password: process.env.CNC_USER_PASSWORD,
      }),
    };
    const response = await fetch(`${BASE_URL}/auth/login`, params);
    const data = await response.json();
    console.log(data);
    res.status(200).json({ ronaldinho: `Bearer ${data.access_token}` });
  } catch (e) {
    res.status(500).json({ ronaldinho: String(e) });
  }
}
