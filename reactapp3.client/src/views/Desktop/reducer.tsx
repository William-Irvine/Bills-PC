import { useReducer } from "react";


export const initialState = {
    showLoader: false,
    showTaskbar: false,
    showIcons: false,
    showWindows: false,
};

export const SET_LOADING = "SET_LOADING";
export const SET_TASKBAR = "SET_TASKBAR";
export const SET_ICONS = "SET_ICONS";
export const SET_WINDOWS = "SET_WINDOWS";

export const RESET_TASKBAR = "RESET_TASKBAR";
export const RESET_ICONS = "RESET_ICONS";
export const RESET_WINDOWS = "RESET_WINDOWS";
export const RESET_ALL = "RESET_ALL";


function createInitialState() {        
    return {
        showLoader: false,
        showTaskbar: false,
        showIcons: false,
        showWindows: false,
    };
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                showLoader: true,
            };
        case SET_TASKBAR:
            return {
                ...state,
                showLoader: false,
                showTaskbar: true,
            };
        case SET_ICONS:
            return {
                ...state,
                showLoader: true,
                showIcons: true,
            };
        case SET_WINDOWS:
            return {
                ...state,
                showLoader: false,
                showWindows: true,
            };
        case RESET_TASKBAR:
            return {
                ...state,
                showLoader: false,
                showTaskbar: false,
            };
        case RESET_ICONS:
            return {
                ...state,
                showLoader: false,
                showIcons: false,
            };
        case RESET_WINDOWS:
            return {
                ...state,
                showLoader: false,
                showWindows: false,
            };
        case RESET_ALL:
            return {
                ...state,
                showLoader: false,
                showWindows: false,
                showIcons: false,
                showTaskbar: false,
            };
        default:
            return { ...state };
    }
}

export default () => useReducer(reducer, initialState, createInitialState);