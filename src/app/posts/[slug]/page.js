import { CardPost } from "@/components/CardPost"
import logger from "@/logger"
import { remark } from "remark"
import remarkHtml from 'remark-html'
import styles from './page.module.css'

async function getPost(slug) {
    const response = await fetch(
        `http://api:3042/posts?slug=${slug}`
    )

    if (response.ok) {
        logger.info('Post obtido com sucesso')
        const data = await response.json()

        if (data.length === 0) {
            return {}
        }

        const post = data[0]

        const processedContent = await remark()
            .use(remarkHtml)
            .process(post.markdown)

        const contentHtml = processedContent.toString()
        post.markdown = contentHtml

        return post
    }

    logger.error('Ops, alguma coisa correu mal')
    return []
}

export default async function PagePost({ params }) {
    const post = await getPost(params.slug)
    
    return (
        <div>
            <CardPost post={post} highlight />
            <h3 className={styles.subtitle}>Código:</h3>
            <div className={styles.code}>
                <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
            </div>
        </div>
    )
}