import { createContext, useState, useEffect, useReducer } from "react";
import { useRouter} from "next/router";
import Gun from 'gun';

export const SocialContext = createContext()

const gun = Gun(['https://social-invest-platform.herokuapp.com/'])

