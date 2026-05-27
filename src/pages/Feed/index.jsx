import { CardPost } from '../../components/CardPost'
import { posts } from './data'
import styles from './feed.module.css'

export const Feed = () => {
    return (
        <main className={styles.grid}>
            {posts.map((post) => (
                <CardPost key={post.slug} post={post} />
            ))}
        </main>
    )
}
