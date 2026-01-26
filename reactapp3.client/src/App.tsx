import * as React from 'react';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";

import Desktop from "./views/Desktop";
import Login from "./views/Login";

import { currentUser, unlockedAccounts as unlockedAccountsAtom } from "./store/atoms";
import { checkLogin, unlockAccount, accounts } from "./data/accountsData";

import { menubarButtons, focusedElement } from "./store/atoms";
//import useLocalStorage from "./hooks/useLocalStorage";

import "./App.css";
//import StartupSound from './components/StartupSound';
//import StartupSound from './components/StartupSound';

const ResetStyles = createGlobalStyle`
  ${styleReset}
`;

function AppWrapper() {
    const [focused, setfocused] = useRecoilState(focusedElement);
    const currentButtons = useRecoilValue(menubarButtons);
    const [showDesktop, setShowDesktop] = React.useState(false);

    const setCurrentUser = useSetRecoilState(currentUser);
    const setUnlockedAccounts = useSetRecoilState(unlockedAccountsAtom);

    const handleClick = React.useCallback(
        (e: any) => {
            if (e.target.dataset && e.target.dataset.name === "start-menu") return;
            const closest = e.target.closest("[data-name]");
            if (!closest) return setfocused("");
            const { name } = closest.dataset;
            setfocused(name);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [focused, setfocused, currentButtons]
    );
    
    const handleLogin = () => {
        document.addEventListener("click", handleClick);
        document.addEventListener("touchstart", handleClick);
        setShowDesktop(true);        
        //setLoggedInStorage(true);
    };

    // Auto-Login
    React.useEffect(() => {
        // Check if user has logged out in this session
        const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
        // Unlock audio context immediately
        const unlockAudio = () => {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                const audioContext = new AudioContext();
                audioContext.resume().catch(() => {
                    // Audio unlock failed, will need user interaction
                    console.log('Audio autoplay blocked by browser');
                });
            }
        };

        unlockAudio();

        if (!hasLoggedOut) {
            // Auto-login on first mount
            const result = checkLogin("admin", "admin123");

            if (result.success && result.account) {
                const accountKey = Object.keys(accounts).find(
                    key => accounts[key].username.toLowerCase() === "admin"
                );

                if (accountKey) {
                    setUnlockedAccounts(current => unlockAccount(accountKey, current));
                }

                setCurrentUser(result.account);
                handleLogin();
            }
        }
    }, []); //Empty dependency array = run once on mount

    return <>{showDesktop ? <Desktop /> : <Login onLogin={handleLogin} />}</>;
    //return <>{showDesktop === true || loggedInStorage === true ? <Desktop /> : <>{soundStorage !== "Off" && <StartupSound />}<Login onLogin={handleLogin} /></>}</>;
}

const App = () => {
    return (
        <RecoilRoot>
            <ResetStyles />
            <ThemeProvider theme={original}>
                <AppWrapper />
            </ThemeProvider>
        </RecoilRoot>
    );
};

export default App;