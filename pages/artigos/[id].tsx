import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Home: NextPage = () => {

  /**
   * Nesta página, renderizar mais informações do artigo, fazendo o fetch de acordo com o ID do artigo.
   * Para o artigo, exibir: title, featured_image, content, authors, categories. (quando existirem)
   * https://data.anteprojectos.com.pt/api/articles/«router.query.id»?populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc
   */

  const router = useRouter();
  const [artigo, setArtigo] = useState<any[]>([]);

  const index = router.query.id;
  const URL_ARTICLE = `https://data.anteprojectos.com.pt/api/articles/${index}?populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc`

  function loadFunction() {
    fetch(URL_ARTICLE)
    .then(res => res.json())
    .then(resposta => {
      if (resposta.data !== null && resposta.data.attributes !== null && resposta.data.length > 0) {
        setArtigo(resposta.data)
      }
    })
  }

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
    </>
  )
}

export default Home
