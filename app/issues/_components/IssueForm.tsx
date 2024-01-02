"use client";
import { Button, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";
import { useState } from "react";
import BackButton from "@/app/components/BackButton";
import { Issue } from "@prisma/client";

type IssueForm = z.infer<typeof issueSchema>;

const IssueFormPage = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occured");
    }
  });

  return (
    <div className="flex items-start justify-center h-screen">
      <div className="w-full max-w-4xl">
      <BackButton href="/issues" />
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.name}
            placeholder="Title"
            {...register("name")}
          />
        </TextField.Root>
        {errors.name && (
          <Text color="red" as="p">
            {errors.name.message}
          </Text>
        )}
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button className="hover:cursor-pointer">
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
      </div>
    </div>
  );
};

export default IssueFormPage;
