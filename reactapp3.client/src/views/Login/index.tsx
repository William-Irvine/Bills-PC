// src/views/Login/index.tsx
import React from "react";
import {
    Window,
    WindowHeader,
    WindowContent,
    Button,
    TextInput,
} from "react95";
import { useSetRecoilState } from "recoil";

import { currentUser, unlockedAccounts as unlockedAccountsAtom } from "../../store/atoms";
import { checkLogin, unlockAccount, loadProgress, accounts } from "../../data/accountsData";

import "./styles.scss";

export default function Login({ onLogin }: any) {
    const [username, setUsername] = React.useState("admin");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const setCurrentUser = useSetRecoilState(currentUser);
    const setUnlockedAccounts = useSetRecoilState(unlockedAccountsAtom);

    React.useEffect(() => {
        // Load saved progress on mount
        const savedProgress = loadProgress();
        setUnlockedAccounts(savedProgress);
    }, [setUnlockedAccounts]);

    const handleLogin = () => {
        setError("");
        setIsLoading(true);

        setTimeout(() => {
            const result = checkLogin(username, password);

            if (result.success && result.account) {
                const accountKey = Object.keys(accounts).find(
                    key => accounts[key].username.toLowerCase() === username.toLowerCase()
                );

                if (accountKey) {
                    setUnlockedAccounts(current => unlockAccount(accountKey, current));
                }

                setCurrentUser(result.account);

                // Clear the logout flag when user manuall logs in
                sessionStorage.removeItem('hasLoggedOut');

                onLogin();
            } else {
                setError(result.error || "Login failed");
                setIsLoading(false);
            }
        }, 500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            handleLogin();
        }
    };

    return (
        <div className='flex justify-center items-center login'>
            <Window
                shadow={true}
                className='flex-column windowFrame__inner login__window'
            >
                <WindowHeader className='flex items-center justify-between handle'>
                    <span>Welcome to Bills-PC</span>
                    <Button
                        size={'sm'}
                        square={true}
                        disabled={true}
                        onClick={() => ""}
                    >
                        <span
                            style={{
                                fontWeight: "bold",
                                transform: "translateY(-1px)",
                            }}
                        >
                            x
                        </span>
                    </Button>
                </WindowHeader>
                <WindowContent>
                    <div className='flex'>
                        <img
                            src="src/assets/images/password.png"
                            alt=""
                            className="pl1 pr3 pixelated login__image"
                        />
                        <div style={{ flex: 1 }}>
                            <p className="pb2">
                                {isLoading ? "Logging in..." : "Click OK to log on to Bills-PC"}
                            </p>
                            <div className="relative">
                                <div className="flex pb1 login__input" style={{ alignItems: 'center', gap: '8px' }}>
                                    <p style={{ minWidth: '80px' }}>User name:</p>
                                    <TextInput
                                        value={username}
                                        onChange={(e: any) => {
                                            setUsername(e.target.value);
                                            setError("");
                                        }}
                                        onKeyDown={handleKeyPress}
                                        disabled={isLoading}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                                <div className="flex login__input" style={{ alignItems: 'center', gap: '8px' }}>
                                    <p style={{ minWidth: '80px' }}>Password:</p>
                                    <TextInput
                                        type="password"
                                        value={password}
                                        onChange={(e: any) => {
                                            setPassword(e.target.value);
                                            setError("");
                                        }}
                                        onKeyDown={handleKeyPress}
                                        disabled={isLoading}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                                {error && (
                                    <div style={{
                                        color: 'red',
                                        marginTop: '8px',
                                        fontSize: '12px'
                                    }}>
                                        ⚠️ {error}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="pl3 login__button">
                            <Button
                                onClick={handleLogin}
                                disabled={isLoading || !username}
                            >
                                OK
                            </Button>
                        </div>
                    </div>
                </WindowContent>
            </Window>
        </div>
    );
}