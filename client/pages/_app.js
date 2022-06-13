import '../styles/globals.css'
import {SocialProvider} from '../context/context'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
