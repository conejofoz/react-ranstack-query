import { useMutation } from "@tanstack/react-query"
import { addPost } from "./api"
import { queryClient } from "./queryClient"
import { Post } from "../types/Post"

export const useAddPost = ()=>{
    const mutation = useMutation({
        mutationFn: addPost,
        onSuccess:(newPost:Post)=>{
            /* 
            Adicionando o novo post retornado à lista de posts sem ter que fazer uma nova requisição
            Não é muito recomendado pq a chance ocasionar algum efeito colateral é grande, ex: se a lista
            estava ordenada e o novo post for adicionado no início ou no fim já temos um problema...
             */
            const posts = queryClient.getQueryData(['posts']) as Post[];

            queryClient.setQueryData(['posts'], [newPost, ...posts]);
        },
        onError:(error)=>{
            console.log(error)
        }
    })
    return mutation;
}