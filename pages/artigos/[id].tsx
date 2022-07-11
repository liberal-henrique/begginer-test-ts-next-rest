import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image';

const Home: NextPage = () => {

  /**
   * Nesta página, renderizar mais informações do artigo, fazendo o fetch de acordo com o ID do artigo.
   * Para o artigo, exibir: title, featured_image, content, authors, categories. (quando existirem)
   * https://data.anteprojectos.com.pt/api/articles/«router.query.id»?populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc
   */

  const router = useRouter();
  const [artigo, setArtigo] = useState<any[]>([]);

  const index = Number(router.query.id);
  const URL_ARTICLE = "https://data.anteprojectos.com.pt/api/articles/"+index+"?populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc"
  console.log(URL_ARTICLE)
  function loadFunction() {
    fetch(URL_ARTICLE)
    .then(res => res.json())
    .then(resposta => {
      if (resposta.data !== null && resposta.data.attributes !== null && resposta.data.length > 0) {
        setArtigo(resposta.data)
      }
    })
  }
  console.log(index)
  console.log(artigo);

  useEffect(() => {
    loadFunction()
  }, []);

  return (
    <>
      <Link style={{float: "left"}} href={'/artigos'} passHref><a>Voltar para Artigos</a></Link>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        artigo com id: {router.query.id}
      </div>
      <ol>
        {artigo.map(item => {
          return (
            <div key={item.id}>
              <h1>{item.attributes.title}</h1>
              <br/><br/>
              <Image 
                src="/surprise.jpg"
                alt="test"
              />
              {/* content, authors, categories. */}
              <div>
                <p>{item.attributes.content}</p>
                <h3>{item.attributes.authors}</h3>
                <p>{item.attributes.categories}</p>
              </div>
            </div>

          )
        })}
      </ol>
    </>
  )
}

export default Home
