import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/RoomAvatar.module.css'

import React from 'react'

const RoomAvatar = ({id, avatar, name}) => {
    return (
    <div className={styles.wrapper} onClick={changeUrl}>RoomAvatar</div>
    )
}

export default RoomAvatar