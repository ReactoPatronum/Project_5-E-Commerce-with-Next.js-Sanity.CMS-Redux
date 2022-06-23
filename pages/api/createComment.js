import { client } from "../../lib/client";

export default async function handler(req, res) {
  const { _id, comment,rating,name,email} = JSON.parse(req.body);
  try {
    await client.create({
      _type: "comment",
      product: {
        _type: "reference",
        _ref: _id,
      },
      comment,
      rating,
      name,
      email
    });
  } catch (err) {
   return res.status(500).json({server:"Yorum Gönderilemedi"},err);
  }
  res.status(200).json({ server:"Yorum Gönderildi!" });
}
