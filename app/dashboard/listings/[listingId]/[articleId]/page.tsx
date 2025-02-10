// import { EditArticleForm } from "@/app/components/dashboard/forms/EditArticleForm";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditArticleForm } from "@/components/dashboard/EditArticleForm";

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContent: true,

      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute(props: {
  params: Promise<{ listingId: string; articleId: string }>;
}) {
  const params = await props.params;
  const data = await getData(params.articleId);
  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3" asChild>
          <Link href={`/dashboard/listings/${params.listingId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Edit Article</h1>
      </div>

      <EditArticleForm data={data} listingId={params.listingId} />
    </div>
  );
}
