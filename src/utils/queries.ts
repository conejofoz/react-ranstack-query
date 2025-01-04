import { useQuery } from "@tanstack/react-query"
import { getPost, getPosts } from "./api";

export const usePosts = (enabled?:boolean)=>{
    const query = useQuery({
        networkMode: 'online', //default //always não monitora
        queryKey: ['posts'],
        queryFn: getPosts,
        enabled: enabled,
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