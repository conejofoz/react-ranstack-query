import { keepPreviousData, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPost, getPosts, getUsers } from './api';
import { postsInitialData } from "../data/postsInitialData";
import { queryClient } from "./queryClient";

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
    //const queryClient = new QueryClient() //se eu tivesse criado um arquivo separado para o queryCliente não precisaria recriar aqui pq já tem um no provider
    
    /* 
        Refatorando para pegar o queryClient que está sendo usado através do hook useQueryClient,
        evitando criar vários como fiz anteriormente que estava causando várias requisições de user.
        Obs: se criado em arquivo separado também funcionaria.
     */
    const queryClient = useQueryClient()
    
    return queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });
}

export const invalidatePosts = ()=>{
    //const queryClient = new QueryClient(); // oh preguiça... se tivesse exportado
    //segundo o professor aqui não se pode usar o hook useQueryClient

    queryClient.invalidateQueries({ //ufa exportei e importei
        queryKey: ['posts'],
        //exact: true //opcional
    });

    //obs: só funcionou usando o queryClient importado do arquivo separado...creio que é pq usa a mesma instância
}