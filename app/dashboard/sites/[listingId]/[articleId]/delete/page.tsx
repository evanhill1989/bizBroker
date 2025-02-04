import { DeletePost } from "@/app/utils/actions/actions";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function DeleteForm(props: {
  params: Promise<{ listingId: string; articleId: string }>;
}) {
  const params = await props.params;
  console.log("Params from inside DeleteForm:", params);

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader className="text-center">
          <CardTitle>Are you sure you want to delete this article?</CardTitle>
          <CardDescription>
            THis action cannot be undone.Article will be deleted and all data
            from server
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/sites/${params.listingId}`}>Cancel</Link>
          </Button>
          <form action={DeletePost}>
            <input type="hidden" name="articleId" value={params.articleId} />
            <input type="hidden" name="listingId" value={params.listingId} />
            <SubmitButton variant="destructive" text="Delete Article" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
