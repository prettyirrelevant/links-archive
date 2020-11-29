import axios from "axios";
import prisma from "../../prisma/client";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  // if request isn't a `POST` request
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  } else {
    // get metadata of the url
    const response = await axios.get("https://api.urlmeta.org/", {
      params: { url: req.body.url },
      headers: {
        Authorization: `Basic ${process.env.API_KEY}`,
      },
    });

    // check for the status of request
    if (response.data.result.status === "OK") {
      // get currently logged in user
      const user = await getSession({ req });
      if (!user) return res.status(403).json({ message: "Unauthourised" });

      // create new `Link` instance
      const link = await prisma.link.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          url: req.body.url,
          imageUrl: response.data.meta.image,
          description: response.data.meta.description,
          title: response.data.meta.title,
        },
      });

      // check if link was created
      if (link) {
        res.status(200).json({ message: "Link added successfully!" });
      } else {
        res.status(500).json({ message: "Something went wrong!" });
      }
    } else {
      res.status(400).json({ message: response.data.result.reason });
    }
  }
}
