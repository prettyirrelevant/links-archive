import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  } else {
    const user = await getSession({ req });
    if (!user) return res.status(403).json({ message: "Unauthourised" });

    const link = await prisma.link.delete({ where: { id: req.body.id } });
    res.status(200).json({ message: "Link deleted successfully" });
  }
}
