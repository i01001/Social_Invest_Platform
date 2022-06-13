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

    return (
        <SocialContext.Provider value={{}}>{children}</SocialContext.Provider>
    )
}