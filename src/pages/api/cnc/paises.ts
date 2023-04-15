import { NextApiRequest, NextApiResponse } from "next";
import { URL_CNC_BRASIL } from "../../../utils/constants";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(`${URL_CNC_BRASIL}/paises`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export default handler;
