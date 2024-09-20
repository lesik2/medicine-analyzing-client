import styles from './index.module.css'
import { Bell } from '@/assets/BellIcon'


export const Notifications = ()=>{
    return(
        <div className={styles.notificationsWrapper}>
            <button className={styles.iconWrapper}>
                <Bell />
                <div className={styles.indicator}/>
            </button>
        </div>
    )
}