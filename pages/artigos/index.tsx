import type { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';

const Home: NextPage = () => {

  /**
   * Nesta página, renderizar uma lista com 10 artigos.
   * Para cada artigo, apenas exibir: title, featured_image e excerpt.
   * Ao clicar em um artigo, redirecionar para a página de artigo com o id do artigo.
   * Lista de artigos: https://data.anteprojectos.com.pt/api/articles/?pagination[pageSize]=10&populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc
   */


  const [artigos, setArtigos] = useState<any[]>([])

  function loadArticle () {
    fetch ('https://data.anteprojectos.com.pt/api/articles/?pagination[pageSize]=10&populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc')
    .then(res => res.json())
    .then(resposta => {
      if (resposta.data !== null && resposta.data.attributes !== null && resposta.data.length > 0) {
        setArtigos(resposta.data)
      }
    })
  }
  console.log(artigos)

  useEffect(() => {
    loadArticle ()
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        <h1>Artigos</h1>
        <Link href={'/artigos/42'} passHref><a> Texto do link</a></Link> <br/>
      </div>
      <Link style={{float: "left"}} href={'/'} passHref><a>Voltar para Home</a></Link>
      <ol>
        { artigos.map(artigo => {
            return (
              <article key={artigo.id}>
                <li>
                  <Link href={`/artigos/${artigo.id}`} passHref><a>{ artigo.attributes.title }</a></Link> 
                  <br/><br/>
                  <Link href={`/artigos/${artigo.id}`} passHref><a>{ artigo.attributes.excerpt }</a></Link>               

                  <Image 
                    src={"/artigo.attributes.featured_image.data.attributes.name" }
                    alt={"test"} 
                    width={500}
                    height={500}
                  />

                </li>
              </article>
            )
          })}
      </ol>

    </>
  )
}

export default Home
