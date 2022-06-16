import styles from "../styles/Home.module.css";
import SideBar from "../components/Sidebar";
import ConversationList from "../components/ConversationList";
import ChatView from "../components/ChatView";
import React from "react";
import ReactDOM from "react-dom";
import NewPage from "../components/NewPage";

// const rootElement = document.getElementById("root");
// ReactDOM.render(<newPage />, rootElement);

{/* <newPage /> */}

export default function Home() {
  return (
    // <p>helloooo</p>
    <div className={styles.wrapper}>
    {/* <div> */}
      {/* <SideBar /> */}
      <NewPage />
      </div>
      /* <div className={styles.main}> */
        /* <ConversationList /> */
        /* <ChatView /> */
        // <newPage />
    //   </div>
    // </div>
  );
}
