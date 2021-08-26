import dbConnect from "../../../db/mongoDB/dbConnect";
import Message from "../../../db/mongoDB/models/Message";

// ??? REFACTOR USING nextConnect() ???

export default async function handler(req, res) {
  console.log("recieved.....");

  const { method } = req;

  if (method === "POST") {
    await dbConnect();

    try {
      const message = await Message.create(req.body);
      res.status(201).json({ success: true, data: message });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
