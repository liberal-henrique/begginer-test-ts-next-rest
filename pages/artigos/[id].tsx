import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter();

  /**
   * Nesta página, renderizar mais informações do artigo, fazendo o fetch de acordo com o ID do artigo.
   * Para o artigo, exibir: title, featured_image, content, authors, categories. (quando existirem)
   * https://data.anteprojectos.com.pt/api/articles/«router.query.id»?populate[0]=featured_image&populate[1]=authors&populate[2]=categories&populate[3]=tags&populate[4]=projects&populate[5]=companies&sort[0]=publishedAt%3Adesc
   */

  return (
    <div>
      artigo com id: {router.query.id}
    </div>
  )
}

export default Home
