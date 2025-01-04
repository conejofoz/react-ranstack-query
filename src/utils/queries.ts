import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getPost, getPosts } from "./api";

export const usePosts = (enabled:boolean, limit: number, start: number)=>{
    const query = useQuery({
        networkMode: 'online', //default //always não monitora
        queryKey: ['posts', {limit, start}],
        queryFn: ()=> getPosts(limit, start),
        enabled: enabled,
        placeholderData: keepPreviousData, //mantem os dados anteriores até a chegada da nova requisição
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