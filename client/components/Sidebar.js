import React from "react";
import styles from "../styles/sidebar.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RoomAvatar from "./RoomAvatar";

import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";
import avatar4 from "../assets/avatar-4.png";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";

const dummyChannels = [
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

const Sidebar = () => {
  console.log("111111111111111111111111111111111111")
  const router = useRouter();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    console.log("222222222222222222222")

    sidebarEffect();
  },[channels, setChannels]);

  const sidebarEffect = async () => {
    console.log("33333333333333333333333")

    try {
      console.log("44444444444444444444")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getchannels`,
      );
      console.log("Ikhlas RESPONSE SIDEBAR", response);
      const data = await response.json();
    setChannels(data);

    router.push(`?channel=${data[0].roomId}&name=${data[0].roomName}`);
  } catch (error) {
    console.log(error);
  }
  }

  return (
    console.log("5555555"),
    <div className={styles.wrapper}>
      {channels.map((channel, index) => (
        <RoomAvatar
          key={index}
          id={channel.id}
          avatar={channel.avatar}
          name={channel.name}
        />
      ))}
    </div>
  );
};

export default Sidebar;
