import { NextApiRequest, NextApiResponse } from "next";
import { URL_CNC_BRASIL } from "../../../utils/constants";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(`${URL_CNC_BRASIL}/localidades`);
  try {
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err, status: response.status });
  }
};

export default handler;
