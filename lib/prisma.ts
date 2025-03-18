// lib/prisma.ts
import { PrismaClient, Listing } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

export type { Listing };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
