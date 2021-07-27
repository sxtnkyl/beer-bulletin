import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(403).end();
  } else {
    //continue with api request
    res.status(200).end();
  }
}
