import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image';


// export const getStaticProps: GetStaticProps = async () => {
//   const article = await fetch("https://data.anteprojectos.com.pt/api/articles/"+router.query.id+"?populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc")
//   .then(res => res.json())
//   .then(resposta => {
//     if (resposta.data !== null && resposta.data.attributes !== null && resposta.data.length > 0) {
//       return(resposta.data)
//     }
//   })
//   return {
//     props: {
//       article
//     },
//   }
// }

const Home: NextPage = () => {

  /**
   * Nesta página, renderizar mais informações do artigo, fazendo o fetch de acordo com o ID do artigo.
   * Para o artigo, exibir: title, featured_image, content, authors, categories. (quando existirem)
   * https://data.anteprojectos.com.pt/api/articles/«router.query.id»?populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc
   */

  const router = useRouter();
  const [artigo, setArtigo] = useState(null);

  
  
  function loadFunction() {
    const index = router.query.id;
    if(index){
      fetch("https://data.anteprojectos.com.pt/api/articles/"+index+"?populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc")
        .then(res => res.json())
        .then(resposta => {
          if (resposta.data !== null && resposta.data.attributes !== null) {
            setArtigo(resposta.data)
          }
        })
      } 
  }
  console.log(artigo);

  useEffect(() => {
    loadFunction()
  }, [router.query.id]);

  return (
    <>
      <Link style={{float: "left"}} href={'/artigos'} passHref><a>Voltar para Artigos</a></Link>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        artigo com id: {router.query.id}
      </div>
      <div>
        {/* title, featured_image, content, authors, categories */}
        <h1>{artigo?.attributes?.title}</h1>
        {artigo?.attributes?.featured_image?.data.attributes.url && <Image 
          src={"https://data.anteprojectos.com.pt"+artigo?.attributes?.featured_image?.data?.attributes?.url}
          alt= "Image Article test"
          width={200}
          height={200}
        />}
        <div>
          {artigo?.attributes?.content}
          <p>{artigo?.attributes?.authors?.data[0].attributes.username}</p>
        </div>
      </div>
    </>
  )
}

export default Home
