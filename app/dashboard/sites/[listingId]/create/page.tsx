"use client";

import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useActionState, use } from "react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TailwindEditor from "@/components/dashboard/EditorWrapper";
import { JSONContent } from "novel";
import { CreatePostAction } from "@/app/utils/actions/actions";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema } from "@/app/utils/zodSchemas";
import { useForm } from "@conform-to/react";
import slugify from "react-slugify";
import { SubmitButton } from "@/components/dashboard/SubmitButtons";

export default function ArticleCreationRoute({
  params: initialParams,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const params = use(initialParams);
  const { toast } = useToast();
  const [value, setValue] = useState<JSONContent | string>("");
  const [slug, setSlugValue] = useState<undefined | string>(undefined);
  const [title, setTitle] = useState<undefined | string>(undefined);
  const [lastResult, action] = useActionState(CreatePostAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }: { formData: FormData }) {
      return parseWithZod(formData, {
        schema: PostSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handleSlugGeneration() {
    const titleInput = title;
    if (titleInput === undefined || titleInput === "")
      return toast({
        title: "Error",
        description: "Please create a title",
        variant: "destructive",
      });
    setSlugValue(slugify(titleInput));

    return toast({
      title: "Success",
      description: "Slug generated",
      variant: "default",
    });
  }

  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3" asChild>
          <Link href={`/dashboard/sites/${params.listingId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Create your Article here. Click button below when finished.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
          >
            <input
              type="hidden"
              name="listingId"
              value={params.listingId}
              key="listingId"
            />
            <div className="grid gap-2">
              <Label>Article Name</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                placeholder="NextJS blogging application"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <p className="text-red-500 text-sm">{fields.title.errors}</p>
            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                key={fields.slug.key}
                name={fields.slug.name}
                // defaultValue={fields.slug.initialValue}
                placeholder="article-slug"
                onChange={(e) => setSlugValue(e.target.value)}
                value={slug}
              />
              <Button
                onClick={handleSlugGeneration}
                className="w-fit "
                variant="secondary"
                type="button"
              >
                <Atom className="mr-2 size-4" />
                Generate Slug
              </Button>
              <p className="text-red-500 text-sm">{fields.slug.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label>Small description</Label>
              <Textarea
                key={fields.smallDescription.key}
                name={fields.smallDescription.name}
                defaultValue={fields.smallDescription.initialValue}
                placeholder="Small description for your article..."
              />
              <p className="text-red-500 text-sm">
                {fields.smallDescription.errors}
              </p>
            </div>

            <div className="grid gap-2">
              <Label>Cover Image</Label>
              <input
                type="hidden"
                name={fields.coverImage.name}
                key={fields.coverImage.key}
                defaultValue={fields.coverImage.initialValue}
                value={imageUrl}
              />
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="upload image"
                  className="object-cover w-[200px] h-[200px] rounded-md"
                  width={200}
                  height={200}
                />
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                    toast({
                      title: "Upload Complete",
                      description: "You should see your picture to the left.",
                    });
                  }}
                  endpoint="imageUploader"
                  onUploadError={() => {
                    toast({
                      title: "Upload Error",
                      description: "It's probably too big.",
                    });
                  }}
                />
              )}
              <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Article Content</Label>
              <input
                type="hidden"
                name={fields.articleContent.name}
                key={fields.articleContent.key}
                defaultValue={fields.articleContent.initialValue}
                value={JSON.stringify(value)}
              />
              <TailwindEditor onChange={setValue} />
              <p className="text-red-500 text-sm">
                {fields.articleContent.errors}
              </p>
            </div>
            <SubmitButton text="Create Article" />
          </form>
        </CardContent>
      </Card>
    </>
  );
}
