import { parseCookies } from "../../../utils/cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = parseCookies(req);
    console.log({ cookies });
    const accessToken = decodePayload(cookies["sum-tokens"]);
    console.log({ accessToken });
  }
};

export const balances = async ({ accessToken, itemId }) => {};
