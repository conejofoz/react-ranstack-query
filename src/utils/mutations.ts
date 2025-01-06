import { useMutation } from "@tanstack/react-query"
import { addPost } from "./api"
import { queryClient } from "./queryClient"

export const useAddPost = ()=>{
    const mutation = useMutation({
        mutationFn: addPost,
        onSuccess:()=>{
            /* invalidar a mutation para que a lista de posts seja atualizada após ser inserido um novo */
            queryClient.invalidateQueries({
                queryKey:['posts'],
            })
        }
    })
    return mutation;
}