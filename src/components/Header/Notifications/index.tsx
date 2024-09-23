import styles from './index.module.css'
import { Bell } from '@/assets/icons/BellIcon'


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