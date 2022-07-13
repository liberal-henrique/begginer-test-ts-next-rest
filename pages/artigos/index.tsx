import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react';
import style from './artigos.module.scss';

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
              color: #9799A6;
              font-weight: bold;
              font-size: 32px;
              margin-bottom: 10px;
              text-align: center;
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
    <main>
      <header className={style.header_main}>
        <div className={style.container}>
          <div className={style.header_logo}>
            <Image src="/logo.svg" alt="sav logo" width={150} height={50} />
          </div>
        
          <nav className={style.header_nav}>
            <a className={style.mainHearder_nav_Link} href="*">Assinar</a>
            <a className={style.mainHearder_nav_Link} href="*">Contactos</a>
            <a className={style.mainHearder_nav_Link} href="*">Gabinetes</a>
            <a className={style.mainHearder_nav_Link} href="*">Newsletter</a>
            <a className={style.mainHearder_nav_Link} href="*">Registo</a>
          </nav>
        </div>
      </header>

      <div className={style.main_content}>
        <div className={style.container}>
          <div className={style.subtitle}>
            <Title as="h1">Artigos</Title>
          </div>
          <Link href={'/'} passHref><a>Voltar para Home</a></Link>
          <nav>
            <ul className={style.main_content_articles}>
              { articles.map(artigo => {
                console.log(artigo.attributes?.featured_image?.data?.attributes?.url)
                  return (
                    <li key={artigo.id} className={style.main_content_articles_link}>
                      <a href={`/artigos/${artigo.id}`}>
                        {artigo.attributes?.featured_image?.data?.attributes?.url && <Image 
                          src={"https://data.anteprojectos.com.pt"+artigo.attributes?.featured_image?.data?.attributes?.url}
                          alt={"test"} 
                          width={100}
                          height={100}
                          
                        />}
                      </a>
                      <Link href={`/artigos/${artigo.id}`} passHref><a>{ artigo.attributes.title }</a></Link> 
                      <br/><br/>
                      {/* <Link href={`/artigos/${artigo.id}`} passHref><a>{ artigo.attributes.excerpt }</a></Link>
                      <br/><br/> */}
                    </li>
                  )
                })}
            </ul>
          </nav>
        </div>
      </div>

      <footer className={style.footer_main}>
        <div className={style.container}>

            <nav className={style.footer_main_navmap_list}>

              <h4 className={style.navmap_list_title}><a>Projectos:</a></h4>
              <a className={style.footer_main_navMap_link}>Pesquisa Avançada</a>
              <a className={style.footer_main_navMap_link}>Arquitectura</a>
              <a className={style.footer_main_navMap_link}>Arquitectura de Interior</a>
              <a className={style.footer_main_navMap_link}>Arquitectura Paisagista</a>
              <a className={style.footer_main_navMap_link}>Urbanismo</a>
              <a className={style.footer_main_navMap_link}>Engenharia</a>
              <a className={style.footer_main_navMap_link}>Habitações Familiares</a>

              <h4 className={`${style.navmap_list_title} navmap_list_title_Reportagens`}><a>Reportagens:</a></h4>
              <a className={style.footer_main_navMap_link}>Arquitectura</a>
              <a className={style.footer_main_navMap_link}>Engenharia</a>
              <a className={style.footer_main_navMap_link}>Habitações Familiares</a>
              <a className={style.footer_main_navMap_link}>Gabinetes</a>
              <a className={style.footer_main_navMap_link}>Urbanismo</a>
              <a className={style.footer_main_navMap_link}>Engenharia</a>
              <a className={style.footer_main_navMap_link}>Habitações Familiares</a>

              <h4 className={style.navmap_list_title}><a>Artigos Técnicos:</a></h4>
              <a className={style.footer_main_navMap_link}>Soluções Técnicas</a>
              <a className={style.footer_main_navMap_link}>Temas e investigação</a>
              <a className={style.footer_main_navMap_link}>Arquitectura de Interior</a>
              <a className={style.footer_main_navMap_link}>Arquitectura Paisagista</a>
              <a className={style.footer_main_navMap_link}>Urbanismo</a>
              <a className={style.footer_main_navMap_link}>Engenharia</a>
              <a className={style.footer_main_navMap_link}>Habitações Familiares</a>


              <h4 className={style.navmap_list_title}><a>Directórios de Empresas:</a></h4>
              <a className={style.footer_main_navMap_link}>Gabinetes Projectistas</a>
              <a className={style.footer_main_navMap_link}>Donos de Obras</a>
              <a className={style.footer_main_navMap_link}>Arquitectura de Interior</a>
              <a className={style.footer_main_navMap_link}>Arquitectura Paisagista</a>
              <a className={style.footer_main_navMap_link}>Urbanismo</a>
              <a className={style.footer_main_navMap_link}>Engenharia</a>
              <a className={style.footer_main_navMap_link}>Habitações Familiares</a>


              <h4 className={style.navmap_list_title}><a>Outras Páginas:</a></h4>
              <a className={style.footer_main_navMap_link}>Estatísticas</a>
              <a className={style.footer_main_navMap_link}>Estatísticas</a>
              <a className={style.footer_main_navMap_link}>Estatísticas</a>
              <a className={style.footer_main_navMap_link}>Estatísticas</a>
              <a className={style.footer_main_navMap_link}>Estatísticas</a>
              <a className={style.footer_main_navMap_link}>Estatísticas</a>
              <a className={style.footer_main_navMap_link}>Estatísticas</a>
            </nav>
        </div>
        <div className={style.footer_brand}>
          <div className={style.container}>
            <p>© Copyright 2022 Workmedia. Todos os direitos reservados.</p>
          </div>
        </div>

        
      </footer>
    </main>
  )
}

export default Home
