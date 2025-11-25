import { atom } from "recoil";

//import memoize from "../utilities/memoize";

import { WINDOW_OBJ } from "../constants";

// General
export const rateLimit = atom({
    key: "rateLimit",
    default: {},
});

export const windowObj = atom({
    key: "windowObj",
    default: WINDOW_OBJ,
});

export const menubarButtons = atom({
    key: "menubarButtons",
    default: [],
});

export const focusedElement = atom({
    key: "focusedElement",
    default: "",
});

// Most followed repos window
export const mostFollowed = atom({
    key: "mostFollowed",
    default: [],
});