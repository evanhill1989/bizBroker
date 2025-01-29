async function getSellers() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  const sellers = await prisma.seller.findMany({
    select: {
      id: true,
      userId: true,
    },
  });

  console.log(sellers);
}

getSellers().catch((e) => {
  console.error(e);
  process.exit(1);
});
