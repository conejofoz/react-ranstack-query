"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react"

type Props = {
    children: ReactNode;
}
export const Providers = ({children}: Props)=>{
    /* 
        Essa constante queryClient também pode ser colocado em um arquivo separado
        exportada e depois importada nesse arquivo
     */
    const queryClient = new QueryClient({ 
        defaultOptions:{
            queries:{
                staleTime: 5000
            }
        }
    });
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
    )
}