import React from 'react'
import styles from '../styles/sidebar.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import RoomAvatar from './RoomAvatar'

import avatar1 from '../assets/avatar-1.png'
import avatar2 from '../assets/avatar-2.png'
import avatar3 from '../assets/avatar-3.png'
import avatar4 from '../assets/avatar-4.png'

const dummyChannels = [
  {
    id: 1,
    name: 'ethereum',
    avatar: avatar1,
  },
  {
    id: 2,
    name: 'link',
    avatar: avatar2,
  },
  {
    id: 3,
    name: 'graph',
    avatar: avatar3,
  },
  {
    id: 4,
    name: 'dai',
    avatar: avatar4,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [channels, setChannels] = useState([dummyChannels]);
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

export default Sidebar
