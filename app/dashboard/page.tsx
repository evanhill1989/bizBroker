export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { requireUser } from "../utils/requireUser";
import { EmptyState } from "@/components/dashboard/EmptyState";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import DefaultImage from "@/public/default.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(userId: string) {
  const [listings, articles] = await Promise.all([
    prisma.listing.findMany({
      where: {
        userId: userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 3,
    }),

    prisma.post.findMany({
      where: {
        userId: userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 3,
    }),
  ]);

  return {
    listings,
    articles,
  };
}

// !!!!!!!!!!!!!!!!!!!DEAD DEAD DEAD
// !!!!!!!!!!!!!!!!!!!DEAD DEAD DEAD
// !!!!!!!!!!!!!!!!!!!DEAD DEAD DEAD

export default async function DashboardIndexPage({}) {
  // const user = await requireUser() || null;
  const { listings, articles } = await getData("123");
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Your Listings</h1>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <Image
                src={listing.imageUrl ?? DefaultImage}
                alt={listing.name}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{listing.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {listing.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/listings/${listing.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You don't have any listings yet."
          href="/dashboard/listings/new"
          description="You currently dont have any listings. Please create one when you are ready."
          buttonText="Create Listing"
        />
      )}
      <h1 className="text-2xl font-semibold mb-5 mt-10">Recent Articles</h1>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {articles.map((article) => (
            <Card key={article.id}>
              <Image
                src={article.image ?? DefaultImage}
                alt={article.title}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {article.smallDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link
                    href={`/dashboard/listings/${article.listingId}/${article.id}`}
                  >
                    Edit Article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You don't have any articles yet."
          href="/dashboard/listings"
          description="You currently dont have any articles. Please create one when you are ready."
          buttonText="Create Article"
        />
      )}
    </div>
  );
}
