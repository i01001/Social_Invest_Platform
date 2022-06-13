import React from 'react'
import ChatHeader from './ChatHeader'
import styles from "../styles/chatView.module.css"
import Image from "next/image";
import at from '../assets/icons/at.svg'


const ChatView = () => {
  return (
    <div className={styles.chatView}>
        <ChatHeader />
    <div className={styles.messagesContainer}>
        <Image 
        height={20} 
        width={20} 
        src={at} 
        className={styles.svg} 
        alt='' 
        />
        <h3 className={styles.title}>Room Name</h3>
    </div>
    </div>
  )
}

export default ChatView