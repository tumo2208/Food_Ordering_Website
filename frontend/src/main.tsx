import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./Context/Store/store.ts";
import {UserProvider} from "./Context/User/UserContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UserProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </UserProvider>
    </StrictMode>,
)
