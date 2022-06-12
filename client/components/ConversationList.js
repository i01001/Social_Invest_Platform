import styles from "../styles/conversationList.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import friends from "../assets/icons/friends.svg";
import nitro from "../assets/icons/nitro.svg";

const dummyDMs = [
  {
    id: 1,
    name: "ethereum",
    avatar: avatar1,
  },
  {
    id: 2,
    name: "link",
    avatar: avatar2,
  },
  {
    id: 3,
    name: "graph",
    avatar: avatar3,
  },
  {
    id: 4,
    name: "dai",
    avatar: avatar4,
  },
];

const ConversationList = () => {
  return (
    <div className={styles.conversations}>
      <div className={styles.conversationListTop}>
        <input type="search" placeholder="Find or start a conversation" />
      </div>
      <div className={styles.conversationsContainer}>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={25}
              width={25}
              src={friends}
              className={styles.svg}
              alt="friends"
            />
          </div>
          <p>Friends</p>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={25}
              width={25}
              src={nitro}
              className={styles.svg}
              alt="nitro"
            />
          </div>
          <p>nitro</p>
        </div>
        <div className={styles.dmTitle}>DIRECT MESSAGES</div>
      </div>
    </div>
  );
};

export default ConversationList;
