import { Outlet } from 'react-router'
import styles from './auth.module.css'

export const AuthLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Outlet />
            </div>
        </div>
    )
}
