import { keepPreviousData, QueryClient, useQuery } from "@tanstack/react-query"
import { getPost, getPosts, getUsers } from './api';
import { postsInitialData } from "../data/postsInitialData";

export const usePosts = (enabled:boolean, limit: number, start: number)=>{
    const query = useQuery({
        networkMode: 'online', //default //always não monitora
        queryKey: ['posts', {limit, start}],
        queryFn: ()=> getPosts(limit, start),
        enabled: enabled,
        placeholderData: keepPreviousData, //mantem os dados anteriores até a chegada da nova requisição
        initialData: postsInitialData
    });
    /* Obs: initialData mantém os dados iniciais na query, placeholderData no lugar de initialData com
    os dados iniciais funciona só como um placeholder mesmo.
     */
    return query;
}

export const usePost = (id: number)=>{
    const query = useQuery({
        queryKey: ['posts', id], //é posts mesmo, ele vai filtrar na lista de posts
        queryFn: () => getPost(id)
    });
    return query;
}

export const useUsers = ()=>{
    const query = useQuery({
        queryKey: ['users'], 
        queryFn: getUsers
    });
    return query;
}

export const useUsersPrefetch = ()=>{
    const queryCliente = new QueryClient() //se eu tivesse criado um arquivo separado para o queryCliente não precisaria recriar aqui pq já tem um no provider

    return queryCliente.prefetchQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });
}