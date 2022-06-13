import { createContext, useState, useEffect, useReducer } from "react";
import { useRouter} from "next/router";
import Gun from 'gun';

export const SocialContext = createContext()

const gun = Gun(['https://social-invest-platform.herokuapp.com/'])

const reducer = (state, action) => {
    try{
        if(action.type == 'clear') return {messages: []}
        if(action.type == 'add') return {messages: [...state.messages, action.data]}
    } catch(error){console.log(error)}
}

export const SocialProvider = ({children }) => {
    const router = userRouter()
    const [state, dispatch] = useReducer(reducer, initialState)
    const [currentAccount, setCurrentAccount] = useState('')
    const [roomName, setRoomName] = useState('')
    const [placeholder, setPlaceholder] = useState('Message...')
    const [messageText, setMessageText] = useState('')
    const [currentUser, setCurrentUser] = useState()
    const [currentUserId, setCurrentUserId] = useState('')

    useEffect (() => {
        checkIfWalletIsConnected()
    }, [])


    const createUserAccount = async () => {}


    const checkIfWalletIsConnected = async () => {
        if(!window.ethereum) return 
        try{
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })
            if(addressArray.length > 0){
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
            }
            else{

            }
        }catch (error){ console.log(error) }
    }

    const connectWallet = async () => {
        if(!window.ethereum) return 
        try{
            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            if(addressArray.length > 0){
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
            }
            else{

            }
        }catch (error){ console.log(error) }
    }

    return (
        <SocialContext.Provider value={{}}>{children}</SocialContext.Provider>
    )
}