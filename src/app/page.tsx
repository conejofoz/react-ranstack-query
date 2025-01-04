"use client"

import { useState } from "react";
import { usePost, usePosts } from "../utils/queries";

const Page = ()=>{
  const [canLoadPosts, setCanLoadPosts] = useState(false);

  const posts = usePosts(canLoadPosts);
  const post = usePost(10);

  const handleLoadPostsButton = ()=>{
    setCanLoadPosts(true);
  }


  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Opa, tudo bem?</h1>
      <button 
        className="border p-3 rounded-md mt-3 bg-black text-white"
        onClick={handleLoadPostsButton}
      >Carregar posts</button>
      {/* O controle de loading é feito pelo próprio tanstack */}
      {posts.isLoading && "Carregando..."}
      {!posts.isLoading && posts.isFetching && "Está recarregando..."}

      <ul>
        {posts.data?.map((item)=>(
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Page;