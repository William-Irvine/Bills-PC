const welcome: any = {
    label: "Welcome",
    header: "Welcome to Bills-PC",
    desktopIcon: "",
    desktopPosition: null,
    visibility: [true, true] // eg [button visible (show button), window visible (show window)]
};

const about: any = {
    label: "About.txt",
    header: "About.txt - Notepad",
    //desktopIcon: require(`../assets/images/notepad.png`).default,
    desktopIcon: "src/assets/images/notepad.png",
    desktopPosition: 1,
    visibility: [false, false]
};

const weather: any = {
    label: "Weather Forecast.exe",
    header: "Weather Forecast - NWS",
    //desktopIcon: require(`../assets/images/program.png`).default,
    desktopIcon: "src/assets/images/program.png",
    desktopPosition: 2,
    visibility: [false, false]
};

const credits: any = {
    label: "credits.txt",
    header: "credits.txt - Notepad",
    //desktopIcon: require(`../assets/images/notepad.png`).default,
    desktopIcon: "src/assets/images/notepad.png",
    desktopPosition: 3,
    visibility: [false, false]
};

const run: any = {
    label: "Run",
    header: "Run",
    //desktopIcon: require(`../assets/images/program.png`).default,
    desktopIcon: "",
    desktopPosition: null,
    visibility: [false, false]
};

const documents: any = {
    label: "Documents",
    header: "Documents",
    desktopIcon: "",
    desktopPosition: null,
    visibility: [false, false]
};

export const WINDOW_OBJ: { [index: string]: any } = {
    welcome,
    about,
    weather,
    credits,
    run,
    documents
};

export const DEFAULT_WINDOW: any = {
    label: ">default<",
    header: "", // if empty, use label
    desktopIcon: false,
    visibility: [false, false]
};
