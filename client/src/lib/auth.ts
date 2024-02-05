import { headers } from "next/headers";

const isAuthenticated = () => {
  console.log({ headers: headers() });
};

export { isAuthenticated };
