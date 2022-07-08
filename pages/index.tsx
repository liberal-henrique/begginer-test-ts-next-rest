import type { NextPage } from 'next'
import Link from 'next/link'
import '../styles/Home.module.css';

export default function HomePage() {
  return (
    <div className='container' style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
      <h1 className='name' style={{ alignItems: "center"}}>begginer-test-ts-next-rest </h1>
      <Link href="/artigos/"><a>Artigos</a></Link>
    </div>
  )
}
