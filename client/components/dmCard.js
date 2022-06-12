import React from 'react'
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/dmCard.module.css";

const dmCard = () => {

    const changeUrl = () => {
        router.push(`?channel=${id}&name=${name}`);
      };


  return (
    <div className={styles.dmCard} onClick={changeUrl}>
              <div className={styles.dmAvatarContainer}>
                </div>
                </div>
  )
}

export default dmCard