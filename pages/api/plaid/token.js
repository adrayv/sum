import { encodePayload } from "../../../utils/jwt";
import { plaidClient } from "./";

export default async (req, res) => {
  if (req.method === "POST") {
    const { publicToken } = req.body;
    const accessToken = await createAccessToken(publicToken);
    console.log({ accessToken });
    const encodedAccessToken = encodePayload(accessToken);
    return res.status(200).json({ encodedAccessToken });
  }
};

export async function createLinkToken() {
  const configs = {
    user: {
      client_user_id: (Math.random() + 1).toString(36).substring(2),
    },
    client_name: "Sum App",
    products: ["transactions"],
    country_codes: ["US"],
    language: "en",
  };

  const res = await plaidClient.linkTokenCreate(configs);
  return { linkToken: res.data.link_token };
}

export const createAccessToken = async (publicToken) => {
  const tokenResponse = await plaidClient.itemPublicTokenExchange({
    public_token: publicToken,
  });
  const accessToken = tokenResponse.data.access_token;
  const itemId = tokenResponse.data.item_id;
  return {
    accessToken,
    itemId,
    error: null,
  };
};
