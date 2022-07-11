import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react';
import Footer from '../src/patterns/Footer';

  /**
   * Nesta página, renderizar uma lista com 10 artigos.
   * Para cada artigo, apenas exibir: title, featured_image e excerpt.
   * Ao clicar em um artigo, redirecionar para a página de artigo com o id do artigo.
   * Lista de artigos: https://data.anteprojectos.com.pt/api/articles/?pagination[pageSize]=10&populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc
   */

  //GetStaticProps roda SOMENTE em build time

  function Title({ children, as }) {
    const Tag = as;
    return (
      <>
        <Tag>{children}</Tag>
        <style jsx>
          {`
            ${Tag} {
              color: red;
            }
          `}
        </style>
      </>

    )
  }

export const getStaticProps: GetStaticProps = async () => {

  const articles = await fetch ('https://data.anteprojectos.com.pt/api/articles/?pagination[pageSize]=10&populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc')
    .then(res => res.json())
    .then(resposta => {
      if (resposta.data !== null && resposta.data.attributes !== null && resposta.data.length > 0) {
        return(resposta.data)
      }
    })
  return {
    props: {
      articles
    },
  }
}

const Home: NextPage = ({ articles }) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        <Title as="h1">Artigos</Title>
        <Link href={'/artigos/42'} passHref><a> Texto do link</a></Link> <br/>
      </div>
      <Link style={{float: "left"}} href={'/'} passHref><a>Voltar para Home</a></Link>
      <ol>
        { articles.map(artigo => {
            return (
              <article key={artigo.id}>
                <li>
                  <Link href={`/artigos/${artigo.id}`} passHref><a>{ artigo.attributes.title }</a></Link> 
                  <br/><br/>
                  <Link href={`/artigos/${artigo.id}`} passHref><a>{ artigo.attributes.excerpt }</a></Link>
                  <br/><br/>
                  <Image 
                    src="/surprise.jpg"
                    alt={"test"} 
                    width={200}
                    height={200}
                  />

                </li>
              </article>
            )
          })}
      </ol>
      <Footer />
    </>
  )
}

export default Home


  // const [artigos, setArtigos] = useState<any[]>([])

  // function loadArticle () {
  // }
  // console.log(artigos)

  // useEffect(() => {
  //   loadArticle ()
  // }, []);

