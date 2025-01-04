"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../types/Post";

const Page = ()=>{

  const query = useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> =>{
      const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return result.data;
    }
  });


  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Opa, tudo bem?</h1>
      {/* O controle de loading é feito pelo próprio tanstack */}
      {query.isLoading && "Carregando..."}

      <ul>
        {query.data?.map((item)=>(
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Page;