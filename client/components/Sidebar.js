import React from "react";
import styles from "../styles/sidebar.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RoomAvatar from "./RoomAvatar";
import avatar1 from "../assets/avatar-1.png"


// const dummy = [
//   {
//     rooName: "some",
//     roomId: 33,
//     avatar: avatar1, 
//   }
// ]

const Sidebar = () => {
  const router = useRouter();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    sidebarEffect();
  },[]);

  const sidebarEffect = async () => {

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getchannels`,
      );
      console.log("RESPONSE", await response);
      const data = await response.json();
      console.log("DATAAAAAAAAAAAA", await data);
    setChannels(data);
    router.push(`?channel=${data[0].roomId}&name=${data[0].roomName}`);
  } catch (error) {
    console.log(error);
  }
  }

  return (
    <div className={styles.wrapper}>
      {channels.map((channel, index) => (
        <RoomAvatar
          key={index}
          id={channel.roomId}
          avatar={channel.avatar}
          name={channel.roomName}
        />
      ))}
    </div>
  );
};

export default Sidebar;
