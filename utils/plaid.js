import superagent from "superagent";

export const exchangePublicToken = async (publicToken) => {
  const { encodedAccessToken } = (
    await superagent.post("/api/plaid/token").send({
      publicToken,
    })
  ).body;
  console.log({ encodedAccessToken });
  return encodedAccessToken;
};
