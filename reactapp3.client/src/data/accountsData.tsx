// src/data/accountsData.ts
// Multi-account game system for Bills-PC

export interface DesktopIcon {
    id: string;
    name: string;
    type: 'file' | 'application';
    icon: string;
    content?: string;
    component?: string;
    metadata?: any;
    browserHistory?: any[];
    bookmarks?: string[];
    playlists?: any[];
}

export interface Account {
    username: string;
    password: string | null;
    displayName: string;
    unlockedBy: string | null;
    isDefault?: boolean;
    difficulty?: string;
    wallpaper: string;
    desktop: {
        icons: DesktopIcon[];
        recycleBin: DesktopIcon[];
    };
}

export const accounts: { [key: string]: Account } = {
    admin: {
        username: "admin",
        password: "admin123",
        displayName: "Bill's PC - Administrator",
        unlockedBy: null,
        isDefault: true,
        wallpaper: "teal",
        desktop: {
            icons: [
                {
                    id: "recycle_bin",
                    name: "Recycle Bin",
                    type: "application",
                    icon: "src/assets/images/recycle_bin_full.png",
                    component: "RecycleBin"
                },
                {
                    id: "about",
                    name: "About.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "ABOUT ME\n\nHi! I'm Bill, and this is my personal website.\n\nI'm a developer who loves retro computing aesthetics.\n\nFeel free to explore - there might be more users on this PC than you think...\n\n- Bill"
                },
                {
                    id: "weather",
                    name: "Weather Forecast.exe",
                    type: "application",
                    icon: "src/assets/images/program.png",
                    component: "WeatherApp"
                },
                {
                    id: "credits",
                    name: "credits.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "CREDITS\n\nWindows 95 UI: React95 library\nInspiration: github95 template\nWeather Data: National Weather Service API\n\nBuilt with React + TypeScript\n\nThanks for visiting!"
                },
                {
                    id: "it_notice",
                    name: "IT_Notice.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "IT DEPARTMENT NOTICE\n\nREMINDER: This workstation is shared between multiple users.\n\nPlease log out when finished.\n\nGuest accounts are available for visitors:\nUsername: guest\nPassword: (leave blank)\n\nCurious about who else uses this PC? Try exploring as guest!\n\n-IT Department\nExt. 1337"
                },
                {
                    id: "thanks",
                    name: "Thanks_For_Visiting.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "THANKS FOR VISITING!\n\nThis is Bill's personal website and portfolio.\n\nCheck out my projects, read about me, and explore the site.\n\n🎮 EASTER EGG: Did you notice the IT Notice? This PC has other users...\nTry logging out and exploring as 'guest' to start a scavenger hunt!\n\nThere are 5 hidden accounts with clues leading to each other.\nCan you find them all?\n\n-Bill"
                }
            ],
            recycleBin: [
                {
                    id: "new_text_document",
                    name: "New Text Document.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: ""
                }
            ]
        }
    },

    guest: {
        username: "guest",
        password: null,
        displayName: "Guest User",
        unlockedBy: null,
        wallpaper: "clouds",
        desktop: {
            icons: [
                {
                    id: "recycle_bin",
                    name: "Recycle Bin",
                    type: "application",
                    icon: "src/assets/images/recycle_bin_full.png",
                    component: "RecycleBin"
                },
                {
                    id: "welcome",
                    name: "Welcome.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "WELCOME TO BILL'S PC\n\nFeel free to explore!\n\nThere might be more to discover than meets the eye...\n\nTry checking out what other users have left behind.\n\nHint: Check the phone list!\n\n-Management"
                },
                {
                    id: "phone_list",
                    name: "Phone_List.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "OFFICE DIRECTORY\n\nDave Johnson (Office Worker) - Ext. 1985\nMarcus Wong (IT/Gaming) - Ext. 1337\nSarah Chen (Media Specialist) - Ext. 2001\nTommy Reed (Events) - Ext. 1969\nAlex ??? (Research) - Ext. ????\n\nNote: Some people use their extension as their password. How predictable!"
                },
                {
                    id: "sticky_note",
                    name: "Sticky_Note.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "DAVE'S LOGIN INFO\n(shhh don't tell anyone!)\n\nUsername: dave.johnson\nPassword: His extension from the phone list\n\nHe's such a normie lol\n\n-Tommy"
                }
            ],
            recycleBin: []
        }
    },

    dave: {
        username: "dave.johnson",
        password: "1985",
        displayName: "Dave Johnson - Office Worker",
        unlockedBy: "guest",
        difficulty: "easy",
        wallpaper: "office",
        desktop: {
            icons: [
                {
                    id: "recycle_bin",
                    name: "Recycle Bin",
                    type: "application",
                    icon: "src/assets/images/recycle_bin_full.png",
                    component: "RecycleBin"
                },
                {
                    id: "resume",
                    name: "Resume_FINAL_v3.doc",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "DAVE JOHNSON\nEmail: dave.j@billspc.com\n\nOBJECTIVE:\nTo find a job that doesn't make me want to quit every Monday...\n\nEXPERIENCE:\nOffice Worker - Bills PC Corp (2010-Present)\n- Attend meetings\n- Send emails\n- Exist\n\n(This resume needs work...)"
                },
                {
                    id: "meeting_notes",
                    name: "Meeting_Notes.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "Q3 MEETING NOTES\n\n- Budget cuts incoming (again)\n- Marcus mentioned his password is 'leet speak' for his extension\n- Tommy won't stop talking about his band\n- Sarah keeps recommending Kubrick films\n- I hate these meetings\n\nTommy's band login:\nUsername: tommy.reed\nPassword: ironman1969 (he told everyone)"
                },
                {
                    id: "browser",
                    name: "Internet Explorer",
                    type: "application",
                    icon: "src/assets/images/ie.png",
                    browserHistory: [
                        { title: "LinkedIn - Dave Johnson", url: "linkedin.com/dave.j" },
                        { title: "Indeed - Job Search", url: "indeed.com" },
                        { title: "How to fake confidence", url: "wikihow.com" },
                        { title: "Metal concerts near me", url: "bandsintown.com" }
                    ],
                    bookmarks: [
                        "Gmail",
                        "Company Intranet",
                        "Tommy's Band Page"
                    ]
                }
            ],
            recycleBin: [
                {
                    id: "embarrassing",
                    name: "Reply_All_OOPS.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "Subject: RE: Company Picnic\n\nTO: ALL STAFF (OOPS)\n\n'Can't wait for this stupid picnic to be over so we can go to Tommy's concert tonight'\n\nI MEANT TO SEND THIS TO MY WIFE NOT EVERYONE\n\n*dies of embarrassment*"
                }
            ]
        }
    },

    tommy: {
        username: "tommy.reed",
        password: "ironman1969",
        displayName: "Tommy Reed - Metalhead",
        unlockedBy: "dave",
        difficulty: "easy-medium",
        wallpaper: "metal",
        desktop: {
            icons: [
                {
                    id: "recycle_bin",
                    name: "Recycle Bin",
                    type: "application",
                    icon: "src/assets/images/recycle_bin_full.png",
                    component: "RecycleBin"
                },
                {
                    id: "gig_schedule",
                    name: "Gig_Schedule.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "IRON MAIDEN TRIBUTE - GIG SCHEDULE 2024\n\nFriday Nov 29: The Rusty Nail\nSaturday Nov 30: Dave's coming! (cool for an office guy)\n\nSETLIST:\n- Run to the Hills\n- Number of the Beast\n- Hallowed Be Thy Name\n\nSarah's recording us!\nHer username: s.chen\nPassword: Famous space movie year (she loves Kubrick)"
                },
                {
                    id: "media_player",
                    name: "Windows Media Player",
                    type: "application",
                    icon: "src/assets/images/wmp.png",
                    playlists: [
                        {
                            name: "🤘 METAL ONLY 🤘",
                            tracks: [
                                "Iron Maiden - Hallowed Be Thy Name",
                                "Metallica - Master of Puppets",
                                "Black Sabbath - War Pigs",
                                "Judas Priest - Breaking the Law"
                            ]
                        }
                    ]
                },
                {
                    id: "band_photos",
                    name: "Band_Photos",
                    type: "file",
                    icon: "src/assets/images/folder.png",
                    content: "Photos from last gig...\nMarcus took some great shots with his gaming PC RGB setup in background lol"
                }
            ],
            recycleBin: [
                {
                    id: "guilty_pleasure",
                    name: "taylor_swift_1989.mp3",
                    type: "file",
                    icon: "src/assets/images/audio.png",
                    content: "🎵 Shake It Off - Taylor Swift 🎵\n\n...don't tell the guys\n\n(It's actually pretty good)"
                }
            ]
        }
    },

    sarah: {
        username: "s.chen",
        password: "2001",
        displayName: "Sarah Chen - Film Buff",
        unlockedBy: "tommy",
        difficulty: "medium",
        wallpaper: "film",
        desktop: {
            icons: [
                {
                    id: "recycle_bin",
                    name: "Recycle Bin",
                    type: "application",
                    icon: "src/assets/images/recycle_bin_full.png",
                    component: "RecycleBin"
                },
                {
                    id: "film_reviews",
                    name: "My_Reviews.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "FILM REVIEWS BY SARAH\n\n2001: A Space Odyssey - 10/10 ⭐\nBlade Runner - 9/10\nThe Matrix - 8/10\nPulp Fiction - 9/10\n\nMarcus keeps asking me to watch his gaming streams.\nHe told me his Twitch password is his username backwards + 42.\nI told him that's terrible security but here we are.\n\nAlex is so mysterious... won't tell anyone their real info."
                },
                {
                    id: "camera_settings",
                    name: "Camera_Settings.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "CAMERA SETTINGS - Tommy's Show\n\nISO: 800\nAperture: F/2.8\nShutter: 1/60\n\nNote to self: Check metadata on test shot!\nMight have accidentally left something in there..."
                },
                {
                    id: "browser",
                    name: "Internet Explorer",
                    type: "application",
                    icon: "src/assets/images/ie.png",
                    browserHistory: [
                        { title: "Criterion Collection", url: "criterion.com" },
                        { title: "IMDB Top 250", url: "imdb.com/chart/top" },
                        { title: "Marcus Gaming - sucrAm42", url: "twitch.tv/marcus" },
                        { title: "Film Theory", url: "reddit.com/r/truefilm" }
                    ]
                }
            ],
            recycleBin: [
                {
                    id: "bad_movie",
                    name: "the_room_2003.avi",
                    type: "file",
                    icon: "src/assets/images/video.png",
                    content: "THE ROOM (2003)\nDirector: Tommy Wiseau\n\n'Oh hai Mark!'\n\nRating: 1/10\n(So bad it's... no. Just bad.)"
                },
                {
                    id: "test_photo",
                    name: "test_shot.jpg",
                    type: "file",
                    icon: "src/assets/images/image.png",
                    content: "[Concert Test Photo]\n\nMETADATA:\nCamera: Canon EOS\nDate: Nov 20, 2024\nComment: 'Alex's password is literally PASSWORD - can you believe it?? Classic paranoid Alex with the obvious password lmao'",
                    metadata: {
                        comment: "Alex's password is PASSWORD"
                    }
                }
            ]
        }
    },

    marcus: {
        username: "marcus.wong",
        password: "sucrAm42",
        displayName: "Marcus Wong - Gamer/IT",
        unlockedBy: "sarah",
        difficulty: "medium-hard",
        wallpaper: "gaming",
        desktop: {
            icons: [
                {
                    id: "recycle_bin",
                    name: "Recycle Bin",
                    type: "application",
                    icon: "src/assets/images/recycle_bin_full.png",
                    component: "RecycleBin"
                },
                {
                    id: "game_library",
                    name: "Steam_Library.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "MY STEAM LIBRARY\n\n✓ Half-Life (1998)\n✓ Portal 2\n✓ Cyberpunk 2077\n✓ Elden Ring (100% completed)\n\nCLASSIC CHEAT CODES:\nIDDQD - Doom God Mode\nIDKFA - Doom All Weapons\npassword - Alex's actual password 😂"
                },
                {
                    id: "discord_log",
                    name: "Discord_Chats.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "DISCORD GROUP CHAT\n\nMarcus: @Alex you ever gonna tell us your real name?\nAlex: It's Alex. That's all you need.\nTommy: Mysterious AF bro\nSarah: Found Alex's password in my photo metadata\nMarcus: Bro uses 'password' 💀💀💀\nDave: Most paranoid person has the most obvious password\n\nAlex: Username is just 'alex'\nAlex: And yes the password is PASSWORD\nAlex: Hiding in plain sight 😎"
                },
                {
                    id: "browser",
                    name: "Internet Explorer",
                    type: "application",
                    icon: "src/assets/images/ie.png",
                    browserHistory: [
                        { title: "Steam Store", url: "steampowered.com" },
                        { title: "PC Part Picker", url: "pcpartpicker.com" },
                        { title: "Reddit Gaming", url: "reddit.com/r/gaming" },
                        { title: "Alex's Conspiracy Theories", url: "reddit.com/r/conspiracy" }
                    ]
                }
            ],
            recycleBin: [
                {
                    id: "homework",
                    name: "definitely_homework.zip",
                    type: "file",
                    icon: "src/assets/images/zip.png",
                    content: "[Compressed File]\n\nContents: Definitely schoolwork\nNot: Game mods, pirated software\nSeriously: It's homework\n\n(It's not homework)"
                }
            ]
        }
    },

    alex: {
        username: "alex",
        password: "password",
        displayName: "Alex - The Paranoid One",
        unlockedBy: "marcus",
        difficulty: "hard",
        wallpaper: "black",
        desktop: {
            icons: [
                {
                    id: "recycle_bin",
                    name: "Recycle Bin",
                    type: "application",
                    icon: "src/assets/images/recycle_bin_full.png",
                    component: "RecycleBin"
                },
                {
                    id: "important",
                    name: "IMPORTANT.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "THEY'RE WATCHING\n\nEverything is connected.\nThe numbers don't lie.\nThe truth is out there.\n\n01000010 01101001 01101100 01101100\n\n(Binary translates to: 'Bill')\n\nWho is Bill? What does he know?"
                },
                {
                    id: "encrypted",
                    name: "encrypted_files.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "ENCRYPTED DATA [BASE64]\n\nVGhlIHRydXRoIGlzIG91dCB0aGVyZQ==\n\nDecode this if you dare.\n\n(Hint: Base64 decoder)\n(Answer: 'The truth is out there')"
                },
                {
                    id: "truth",
                    name: "THE_TRUTH.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "CONGRATULATIONS!\n\nYou've discovered all 5 hidden accounts on this PC.\n\nYou are a true explorer.\n\nThe office workers, the metalhead, the film buff, the gamer...\nAll hiding in plain sight on Bill's computer.\n\nThis PC has secrets.\nBut you found them all.\n\nWell done, seeker.\n\n-Alex\n\nP.S. Check the Admin recycle bin for a special surprise..."
                },
                {
                    id: "browser",
                    name: "Internet Explorer",
                    type: "application",
                    icon: "src/assets/images/ie.png",
                    browserHistory: [
                        { title: "Conspiracy Theories", url: "reddit.com/r/conspiracy" },
                        { title: "Archive.org", url: "archive.org" },
                        { title: "Cryptography Basics", url: "wikipedia.org/crypto" },
                        { title: "Base64 Decoder", url: "base64decode.org" }
                    ]
                }
            ],
            recycleBin: [
                {
                    id: "paranoia",
                    name: "im_not_paranoid.txt",
                    type: "file",
                    icon: "src/assets/images/notepad.png",
                    content: "I'M NOT PARANOID\n\nJust because I'm cautious doesn't mean they aren't watching.\n\nThe simplest passwords are the ones nobody suspects.\n\nHiding in plain sight.\n\n-Alex"
                }
            ]
        }
    }
};

// Helper functions
export const checkLogin = (username: string, password: string): { success: boolean; account?: Account; error?: string } => {
    const account = Object.values(accounts).find(acc => acc.username.toLowerCase() === username.toLowerCase());

    if (!account) {
        return { success: false, error: "User not found" };
    }

    // Guest has no password
    if (account.password === null && (password === '' || password === null)) {
        return { success: true, account };
    }

    // Check password
    if (account.password === password) {
        return { success: true, account };
    }

    return { success: false, error: "Incorrect password" };
};

export const isAccountUnlocked = (accountKey: string, unlockedAccounts: string[]): boolean => {
    const account = accounts[accountKey];
    if (!account.unlockedBy) return true;
    return unlockedAccounts.includes(account.unlockedBy);
};

export const saveProgress = (unlockedAccounts: string[]): void => {
    localStorage.setItem('billspc_unlocked_accounts', JSON.stringify(unlockedAccounts));
};

export const loadProgress = (): string[] => {
    const saved = localStorage.getItem('billspc_unlocked_accounts');
    return saved ? JSON.parse(saved) : ['admin', 'guest'];
};

export const unlockAccount = (accountKey: string, currentUnlocked: string[]): string[] => {
    if (!currentUnlocked.includes(accountKey)) {
        const updated = [...currentUnlocked, accountKey];
        saveProgress(updated);
        return updated;
    }
    return currentUnlocked;
};