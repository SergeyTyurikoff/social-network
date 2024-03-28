import {FC} from 'react';
import {useMutation} from "@tanstack/react-query";
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from '../Button';
import { FormField } from '../FormField';
import './PostForm.css';
import {createPost} from "../../api/Post.ts";
import {queryClient} from "../../api/queryClient.ts";

export interface IPostFormProps {}

const CreatePostSchema = z.object({
    text: z.string().min(10, "Длина поста должна быть не менее 10 символов"),
})

type CreatePostForm = z.infer<typeof CreatePostSchema>

export const PostForm: FC<IPostFormProps> = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<CreatePostForm>({
        resolver: zodResolver(CreatePostSchema),
    })

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["posts"]})
        }
    }, queryClient)



  return (
    <form className="post-form" onSubmit={handleSubmit(({ text }) => {
        createPostMutation.mutate(text)
    })}>
      <FormField label="Текст заметки" errorMessage={errors.text?.message}>
        <textarea
            className="post-form__input"
            {...register("text")}
        />
      </FormField>

      <Button type="submit" title="Создать" isLoading={createPostMutation.isPending}/>
    </form>
  );
};


/*  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault()

      if(text.length > 10) {
          createPostMutation.mutate()
      } else {
          setErrorMessage("Введите более 10 символов")
      }

  };*/
