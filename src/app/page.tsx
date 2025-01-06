"use client"

import { useState } from "react";
import { invalidatePosts, usePost, usePosts, useUsersPrefetch } from "../utils/queries";
import { useMutation } from "@tanstack/react-query";
import { addPost } from "../utils/api";

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

  const handleInsertNewPostButtom = ()=>{
    //fazer o procedimento de inserção aqui

    invalidatePosts();
  }

  const addMutation = useMutation({mutationFn: addPost});

  const handleAddButton = ()=>{
    addMutation.mutate({
      title: 'Teste',
      body: 'Corpo de teste',
      userId: 7
    });
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
      
      <div className="border p-3 my-3">
        <p className="block">Área de inserção de novo post</p>
        <button onClick={handleInsertNewPostButtom}>Inserir novo post</button>
      </div>

      {/* O controle de loading é feito pelo próprio tanstack */}
      {posts.isLoading && "Carregando..."}
      {!posts.isLoading && posts.isFetching && "Está recarregando..."}

      <ul>
        {posts.data?.map((item)=>(
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      {/* mutations */}
      <div className="border p-3 my-3">
        <p className="block">Add post com mutation</p> 

        <p>{addMutation.isSuccess && "Inserido com sucesso!"}</p>
        <p onClick={()=>addMutation.reset()}>Status: {addMutation.status}</p>

        <button onClick={handleAddButton}>Inserir novo post</button>
      </div>

    </div>
  )
}

export default Page;