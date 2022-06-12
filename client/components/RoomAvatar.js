import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/RoomAvatar.module.css'

import React from 'react'

const RoomAvatar = ({id, avatar, name}) => {
    const changeUrl = () => {}

    return (
    <div className={styles.wrapper} onClick={changeUrl}>
        <div> className={styles.roomAvatar}</div>


    </div>
    )
}

export default RoomAvatar