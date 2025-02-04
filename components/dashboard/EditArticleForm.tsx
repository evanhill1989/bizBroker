/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Atom } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { useToast } from "@/hooks/use-toast";
import TailwindEditor from "./EditorWrapper";
import { SubmitButton } from "./SubmitButtons";
import { useActionState, useState } from "react";
import React from "react";
import { JSONContent } from "novel";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema } from "@/app/utils/zodSchemas";
import { EditPostActions } from "@/app/utils/actions/actions";
import slugify from "react-slugify";

interface iAppProps {
  data: {
    slug: string;
    title: string;
    smallDescription: string;
    articleContent: any;
    id: string;
    image: string;
  };
  listingId: string;
}

export function EditArticleForm({ data, listingId }: iAppProps) {
  const { toast } = useToast();

  const [imageUrl, setImageUrl] = useState<undefined | string>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    data.articleContent
  );
  const [slug, setSlugValue] = useState<undefined | string>(data.slug);
  const [title, setTitle] = useState<undefined | string>(data.title);

  const [lastResult, action] = useActionState(EditPostActions, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
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
    <Card className="mt-5">
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
          <input type="hidden" name="articleId" value={data.id} />
          <input type="hidden" name="listingId" value={listingId} />
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
              defaultValue={fields.slug.initialValue}
              placeholder="Article Slug"
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
              defaultValue={data.smallDescription}
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
            <TailwindEditor onChange={setValue} initialValue={value} />
            <p className="text-red-500 text-sm">
              {fields.articleContent.errors}
            </p>
          </div>
          <SubmitButton text="Edit Article" />
        </form>
      </CardContent>
    </Card>
  );
}
