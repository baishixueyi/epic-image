import { createContext, useContext} from 'react';
import AuthStore from './auth';
import userStore from './user';

const context = createContext({
    AuthStore,
    userStore
})

export const useStore = () =>useContext(context)