import Image from 'next/image'
import styles from './aside.module.css'
import logo from './logo.png'

export function Aside() {
    return (
        <aside className={styles.aside}>
            <Image
                src={logo}
                alt="Logo da Code Connect"
                priority={true}
            />
        </aside>
    )
}