import { useQuery } from "@tanstack/react-query"
import { getPost, getPosts } from "./api";

export const usePosts = ()=>{
    const query = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts
    });
    return query;
}

export const usePost = (id: number)=>{
    const query = useQuery({
        queryKey: ['posts', id], //é posts mesmo, ele vai filtrar na lista de posts
        queryFn: () => getPost(id)
    });
    return query;
}