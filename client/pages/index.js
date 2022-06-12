import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar"

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.main}>Conversation List View</div>
    </div>
  );
}
