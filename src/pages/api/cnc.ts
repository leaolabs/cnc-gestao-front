// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  token: string;
};

const BASE_URL: string = "https://apicncbrasil.cn.org.br/api";

export default async function token(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // ATENÇÂO: CNC pode estar bloqueando request fora do Brasil
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

    if (response.status === 403) {
      res.status(403).json({ token: `Não consegui acessar ${BASE_URL}` });
    }

    const data = await response.json();
    res.status(200).json({ token: `Bearer ${data.access_token}` });
  } catch (e) {
    res.status(500).json({ token: String(e) });
  }
}
