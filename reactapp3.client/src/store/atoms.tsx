import { atom } from "recoil";
import { WINDOW_OBJ } from "../constants";
import type { Account } from "../data/accountsData";

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

//Current logged in user
export const currentUser = atom<Account | null>({
    key: "currentUser",
    default: null,
});

//Unlocked accounts (for game progress)
export const unlockedAccounts = atom<string[]>({
    key: "unlockedAccounts",
    default: ['admin', 'guest'], // Always start with these unlocked
});