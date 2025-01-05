"use client"

import { useState } from "react";
import { usePost, usePosts, useUsersPrefetch } from "../utils/queries";

const Page = ()=>{
  useUsersPrefetch();
  const limit = 3;
  const [page, setPage] = useState(0);
  const [canLoadPosts, setCanLoadPosts] = useState(false);

  const posts = usePosts(canLoadPosts, limit, page * limit);
  const post = usePost(10);


  const handleLoadPostsButton = ()=>{
    setCanLoadPosts(true);
  }

  const handlePrevButton = ()=>{
    setPage(page === 0 ? 0 : page -1);
  }

  const handleNextButton = ()=>{
    setPage(page + 1);
  }


  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Opa, tudo bem?</h1>
      <button 
        className="border p-3 rounded-md mt-3 bg-black text-white"
        onClick={handleLoadPostsButton}
      >Carregar posts
      </button>

      <div className="border p-3 m-3">
        <div>Itens por página: {limit}</div>
        <div>Número da página: {page}</div>
        <button onClick={handlePrevButton} className="border mx-2 px-2 bg-blue-400">Página Anterior</button>
        <button onClick={handleNextButton} className="border mx-2 px-2 bg-blue-400">Proxima Página</button>
      </div>

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