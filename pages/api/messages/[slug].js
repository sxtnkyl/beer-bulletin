import dbConnect from "../../../db/mongoDB/dbConnect";
import Message from "../../../db/mongoDB/models/Message";

// ??? REFACOTOR USING nextConnect() ???

export default async function handler(req, res) {
  const { method } = req;
  const { slug } = req.query;

  if (method === "GET") {
    await dbConnect();

    try {
      const messages = await Message.find({
        channel: slug,
      }); /* find all the data with channel equal to the slug route */
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
