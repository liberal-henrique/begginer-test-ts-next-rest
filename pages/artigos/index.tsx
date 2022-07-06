import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  /**
   * Nesta página, renderizar uma lista com 10 artigos.
   * Para cada artigo, apenas exibir: title, featured_image e excerpt.
   * Ao clicar em um artigo, redirecionar para a página de artigo com o id do artigo.
   * Lista de artigos: https://data.anteprojectos.com.pt/api/articles/?pagination[pageSize]=10&populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc
   */
  return (
    <div>
      artigos
      <Link href={'/artigos/42'}><a>Texto do link</a></Link>
    </div>
  )
}

export default Home
