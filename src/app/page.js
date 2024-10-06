import { CardPost } from "@/components/CardPost"
import logger from "@/logger"

async function getAllPosts() {
  const response = await fetch('http://api:3042/posts')

  if (response.ok) {
    logger.info('Posts obtidos com sucesso')
    return response.json()
  }

  logger.error('Ops, alguma coisa correu mal')
  return []
}

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className='grid'>
      {posts.map(p => <CardPost key={p.id} post={p} />)}
    </main>
  )
}
