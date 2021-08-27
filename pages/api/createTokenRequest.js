import Ably from "ably/promises";

var uniqueId = function () {
  return "id-" + Math.random().toString(36).substr(2, 16);
};

export default async function handler(req, res) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY);
  client.auth.createTokenRequest(
    {
      clientId: uniqueId(),
    },
    function (err, tokenRequest) {
      if (err) {
        res.status(500).send("Error requesting token: " + JSON.stringify(err));
      } else {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(tokenRequest));
      }
    }
  );
  // res.status(200).json(tokenRequestData);
}
