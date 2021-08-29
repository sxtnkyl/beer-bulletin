import { cloudinaryUpload } from "../../../middleware/cloudinary";
import nextConnect from "next-connect";

const handler = nextConnect().post(async (req, res) => {
  try {
    const fileStr = req.body.data;
    const upload = await cloudinaryUpload(fileStr);
    return res.json(upload);
  } catch {
    console.log("Uh-Oh. something borked");
    return res.status(500).json("Ya done goofed up");
  }
});

export default handler;
