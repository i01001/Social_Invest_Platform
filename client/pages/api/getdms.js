import { client } from "../../lib/client";

const query = `*[_type == "conversations" && isDm==true]{
    "conversation": userReference->{
        name,
        walletAddress,
        "image": profileImage.asset->url
    }
}`;

export default async (req, res) => {
  try {
    const sanityResponse = await client.fetch(query);

    res.status(200).send("Successful");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
