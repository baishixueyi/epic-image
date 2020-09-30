import { createContext, useContext} from 'react';
import AuthStore from './auth';
import userStore from './user';
import imageStore from './image'
import historyStore from './history'

const context = createContext({
    AuthStore,
    userStore,
    imageStore,
    historyStore
})

export const useStore = () =>useContext(context)