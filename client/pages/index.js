import styles from '../styles/Home.module.css'
import SideBar from '../components/Sidebar'
import ConversationList from '../components/ConversationList'
// import ChatView from '../components/ChatView'

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <SideBar />
      <ConversationList />
      <div className={styles.main}>
        Conversations List Main Area Chat View
        {/* <ChatView /> */}
      </div>
    </div>
  )
}