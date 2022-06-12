import React from 'react'
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/dmCard.module.css";

const dmCard = (name, status, avatar, id) => {

    const changeUrl = () => {
      };


  return (
    <div className={styles.dmCard} onClick={changeUrl}>
              <div className={styles.dmAvatarContainer}>
                </div>
                </div>
  )
}

export default dmCard