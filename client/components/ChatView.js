import React from 'react'
import ChatHeader from './ChatHeader'

const ChatView = () => {
  return (
    <div className={styles.chatView}>
    <div className={styles.roomNameContainer}>
        <Image height={20} width={20} src={at} className={styles.svg} alt='' />
        <h3 className={styles.title}>Room Name</h3>
    </div>
    </div>
  )
}

export default ChatView