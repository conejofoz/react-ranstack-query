"use client"

import { usePost, usePosts } from "../utils/queries";

const Page = ()=>{

  const posts = usePosts();
  const post = usePost(10);


  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Opa, tudo bem?</h1>
      {/* O controle de loading é feito pelo próprio tanstack */}
      {posts.isLoading && "Carregando..."}

      <ul>
        {posts.data?.map((item)=>(
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Page;