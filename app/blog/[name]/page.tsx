import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import Logo from "@/public/logo.svg";
import { ModeToggle } from "@/components/dashboard/ModeToggle";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DefaultImage from "@/public/default.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(subDir: string) {
  const data = await prisma.listing.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      businessName: true,
      posts: {
        select: {
          smallDescription: true,
          id: true,
          title: true,
          image: true,
          slug: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BlogIndexPage(props: {
  params: Promise<{ name: string }>;
}) {
  const params = await props.params;

  const data = await getData(params.name);
  return (
    <>
      <nav className="grid grid-cols-3 my-10">
        <div className="col-span-1" />
        <div className="flex items-center gap-x-2 justify-center">
          <Image
            src={Logo}
            alt="logo"
            className="h-8 w-8"
            width={40}
            height={40}
          />
          <h1 className="text-3xl font-semibold tracking-tight">
            {data.businessName}
          </h1>
        </div>

        <div className="col-span-1 flex justify-end w-full">
          <ModeToggle />
        </div>
      </nav>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {data.posts.map((listing) => (
          <Card key={listing.id}>
            <Image
              src={listing.image ?? DefaultImage}
              alt={listing.title}
              className="rounded-t-lg object-cover w-full h-[200px]"
              width={400}
              height={200}
            />
            <CardHeader>
              <CardTitle className="truncate">{listing.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {listing.smallDescription}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/blog/${params.name}/${listing.slug}`}>
                  Read More
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
