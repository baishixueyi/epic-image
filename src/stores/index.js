import { createContext, useContext} from 'react';
import AuthStore from './auth';
import userStore from './user';
import imageStore from './image'

const context = createContext({
    AuthStore,
    userStore,
    imageStore
})

export const useStore = () =>useContext(context)