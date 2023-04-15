import { NextApiRequest, NextApiResponse } from "next";
import { URL_CNC_BRASIL } from "../../../utils/constants";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const params: RequestInit = {
    method: _req.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + _req.cookies["cnc-auth-token"],
    },
  };

  const response = await fetch(`${URL_CNC_BRASIL}/pessoas`, params);
  try {
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err, status: response.status });
  }
};

export default handler;
