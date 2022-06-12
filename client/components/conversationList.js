import styles from '../styles/conversationList.module.css'
import { useEffect, useState } from 'react'
import Image from "next/image";
import friends from "../assets/icons/friends.svg"
import nitro from "../assets/icons/nitro.svg"


const conversationList = () => {
  return (
    <div className={styles.conversationList}>
    <div className={styles.conversationListTop}>
        <input type='search' placeholder='Find or start a conversation' />
    </div>
    </div>
  )
}

export default conversationList