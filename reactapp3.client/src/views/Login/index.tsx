//import React from "react";
import {
    Window,
    WindowHeader,
    WindowContent,
    Button,
    TextInput,
} from "react95";
//import { useRecoilValue } from "recoil";

//import ErrorPopup from "../../components/ErrorPopup";

//import { apiLimit } from "../../store/atoms";

import "./styles.scss";

export default function Login({ onLogin }: any) {
    //const limit = useRecoilValue(apiLimit);
    //const [showError, setShowError] = React.useState(false);

    const handleClick = () => {
        //if (limit.exceeded) {
        //   return setShowError(true);
        //} else onLogin();
        onLogin();
    };

    return (
        <div className='flex justify-center items-center login'>
            <Window
                shadow={true}
                className='flex-column windowFrame__inner login__window'
            >
                <WindowHeader className='flex items-center justify-between handle'>
                    <span>Welcome to Bills-PC</span>
                    <Button size={'sm'} square={true} disabled={false} onClick={() => ""}>
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
                        <div>
                            <p className="pb2">Click OK to log on to Bills-PC</p>
                            <div className="relative">
                                <div className="absolute login__inputOverlay"></div>
                                <div className="flex pb1 login__input">
                                    <p>User name:</p>
                                    <TextInput value="Admin" onChange={() => ""} />
                                </div>
                                <div className="flex login__input">
                                    <p>Password</p>
                                    <TextInput value="*******" onChange={() => ""} />
                                </div>
                            </div>
                        </div>
                        <div className="pl3 login__button">
                            <Button onClick={handleClick}>OK</Button>
                        </div>
                    </div>
                </WindowContent>
            </Window>  
        </div>
    );
    /*
    return (
        <div className='flex justify-center items-center login'>
            <Window
                shadow={true}
                className='flex-column windowFrame__inner login__window'
            >
                <WindowHeader className='flex items-center justify-between handle'>
                    <span>Welcome to Bills-PC</span>
                    <Button size={'sm'} square disabled={false} onClick={() => ""}>
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
                        <div>
                            <p className="pb2">Click OK to log on to Bills-PC</p>
                            <div className="relative">
                                <div className="absolute login__inputOverlay"></div>
                                <div className="flex pb1 login__input">
                                    <p>User name:</p>
                                    <TextInput value="Admin" onChange={() => ""} />
                                </div>
                                <div className="flex login__input">
                                    <p>Password</p>
                                    <TextInput value="*******" onChange={() => ""} />
                                </div>
                            </div>
                        </div>
                        <div className="pl3 login__button">
                            <Button onClick={handleClick}>OK</Button>
                        </div>
                    </div>
                </WindowContent>
            </Window>

            {showError && (
                <ErrorPopup
                    header="Access Denied"
                    dismissable={false}
                >
                    <p className="pb1">
                        Invalid username or password. Please try again.
                    </p>
                </ErrorPopup>
            )}
        </div>
    ); */
}