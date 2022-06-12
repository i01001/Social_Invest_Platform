import styles from "../styles/conversationList.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import friends from "../assets/icons/friends.svg";
import nitro from "../assets/icons/nitro.svg";

import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";
import avatar4 from "../assets/avatar-4.png";

const dummyDMs = [
  {
    id: 1,
    name: "Mohammad",
    avatar: avatar1,
  },
  {
    id: 2,
    name: "Ahmed",
    avatar: avatar2,
  },
  {
    id: 3,
    name: "Abdullah",
    avatar: avatar3,
  },
  {
    id: 4,
    name: "AbdulRahman",
    avatar: avatar4,
  },
];

const ConversationList = () => {
  const [dms, setDMs] = useState(dummyDMs);
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
        {dms.map((dm, index) => (
          <dm>DM CARD</dm>
        ))}
            
      </div>
    </div>
  );
};

export default ConversationList;
