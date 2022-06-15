import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/roomAvatar.module.css'

const RoomAvatar = ({ id, avatar, name }) => {
  const router = useRouter()

  const changeUrl = async () => {
    router.push(`?channel=${await id}&name=${await name}`)
  }

    const getrates = async () => {
    console.log("test11111111111111");
  }

  return (
    <div className={styles.wrapper} onClick={changeUrl}>
      <div className={styles.roomAvatar}>
        <Image
          src={avatar}
          className={styles.roomAvatarImage}
          height={48}
          width={48}
          alt={name}
        />
      </div>
    </div>
  )
}

export default RoomAvatar