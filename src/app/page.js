import { CardPost } from "@/components/CardPost"
import logger from "@/logger"
import Link from "next/link"
import styles from './page.module.css'

async function getAllPosts(page) {
  const response = await fetch(
    `http://api:3042/posts?_page=${page}&_per_page=6`
  )
  
  if (response.ok) {
    logger.info('Posts obtidos com sucesso')
    return response.json()
  }

  logger.error('Ops, alguma coisa correu mal')
  return []
}

export default async function Home({ searchParams }) {
  const page = searchParams?.page || 1
  const { data: posts, prev, next } = await getAllPosts(page)

  return (
    <main className='grid'>
      {posts.map(p => <CardPost key={p.id} post={p} />)}

      <div className={styles.links}>
        {prev && <Link className="link" href={`/?page=${prev}`}>Página anterior</Link>}
        {next && <Link className="link" href={`/?page=${next}`}>Próxima página</Link>}
      </div>
    </main>
  )
}
