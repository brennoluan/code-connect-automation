import { Outlet } from 'react-router'
import { Aside } from '../../components/Aside'
import styles from './app.module.css'

export const AppLayout = () => {
    return (
        <div className={styles.app}>
            <Aside />
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}
