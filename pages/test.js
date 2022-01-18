import { usePlaidLink } from "react-plaid-link";
import { useCookies } from "react-cookie";
import { createLinkToken } from "./api/plaid/token";
import { exchangePublicToken } from "../utils/plaid";
import { parseCookies } from "../utils/cookie";

export default function Test({ plaidLinkToken }) {
  const [cookie, setCookie, removeCookie] = useCookies(["sum-tokens"]);
  const config = {
    token: plaidLinkToken,
    onSuccess: async (publicToken, metaData) => {
      const encodedAccessToken = await exchangePublicToken(publicToken);
      setCookie("sum-tokens", encodedAccessToken, {
        path: "/",
        sameSite: true,
      });
    },
  };
  const { open, ready, error } = usePlaidLink(config);
  const onDeregister = () => {
    removeCookie("sum-tokens");
  };
  return (
    <>
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>
      <button onClick={onDeregister}>De-Register</button>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req);
  console.log({ cookies });
  const { linkToken } = await createLinkToken();
  return { props: { plaidLinkToken: linkToken } };
}
