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
        queryKey: ['post', id],
        queryFn: () => getPost(id)
    });
    return query;
}