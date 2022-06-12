import styles from "../styles/conversationList.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import friends from "../assets/icons/friends.svg";
import nitro from "../assets/icons/nitro.svg";

const ConversationList = () => {
  return (
    <div className={styles.conversations}>
      <div className={styles.conversationListTop}>
        <input type="search" placeholder="Find or start a conversation" />
        <div className={styles.conversationsContainer}>
          <div clasName={styles.elementsContainer}>
            <div className={styles.svgContainer}>
              <Image
                height={25}
                width={25}
                src={friends}
                className={styles.svg}
                alt="friends"
              />
            </div>
          </div>
          <div clasName={styles.elementsContainer}>
            <div className={styles.svgContainer}>
              <Image
                height={25}
                width={25}
                src={nitro}
                className={styles.svg}
                alt="nitro"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
