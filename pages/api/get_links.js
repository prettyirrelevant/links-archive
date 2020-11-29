import prisma from "../../prisma/client";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  } else {
    const user = await getSession({ req });
    if (!user) return res.status(403).json({ message: "Unauthourised" });
    const links = await prisma.link.findMany({ where: { userId: user.id } });
    res.status(200).json(links);
  }
}
