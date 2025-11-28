//import React from "react";
//import { Button, Select, TextInput } from "react95";
import { Bar, Button } from "react95";
//import { useRecoilValue } from recoil;
import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableDataCell } from "react95";

//import useNewWindow from "../../hooks/useNewWindow";

import formatDate from "../../utilities/formatDate";
import formatBigNumber from "../../utilities/formatBigNumber";

import "./styles.scss";


export default function Documents() {
    //const followed = useRecoilValue(mostFollowed);
    //const [shortcuts, setShortcuts] = React.useState([]);
    //const [highlighted, setHighlight] = React.useState("");

    //const { getMostFollowed } = useReposApi();
    //const open = useNewWindow();

    //const handleSnglClick = (name: any) => () => {
    //    setHighlight(name);
    //};

    //const handleDblClick = (name: any, owner: any) => () => {
    //    open(name, owner);
    //};

    //React.useEffect(() => {
        //getMostFollowed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    //}, []); // 'getMostFollowed' not needed

    //React.useEffect(() => {
        //setShortcuts(followed["edges"]);
    //}, [followed]);

    return (
        <>
            <section className="flex flex-column explorerWindow mostFollowedWindow">
                <div className="flex justify-between explorerWindow__header">
                    <div className="flex flex-auto items-center explorerWindow__headerButtons">
                        <Bar className="explorerWindow__bar" />
                        <Button variant="menu" size="sm">
                            File
                        </Button>
                        <Button variant="menu" size="sm">
                            Edit
                        </Button>
                        <Button variant="menu" size="sm">
                            View
                        </Button>
                    </div>
                    <div className="flex explorerWindow__logo">
                        <div className="explorerWindow__logoBg" />
                        <img
                            src="../../src/assets/images/logo_2.png"
                            alt=""
                            width="30"
                            className="pixelated"
                        />
                    </div>
                </div>

                <div className="flex flex-auto">
                    <div className="flex flex-wrap scrollable -yOnly">
                        <Table className="table userRepos__table">
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell className="table__headCell mostFollowedWindow__th -first">
                                        Name
                                    </TableHeadCell>
                                    <TableHeadCell className="table__headCell -fixedWidth mostFollowedWindow__th">
                                        Size (stars)
                                    </TableHeadCell>
                                    <TableHeadCell className="table__headCell -fixedWidth mostFollowedWindow__th">
                                        Type
                                    </TableHeadCell>
                                    <TableHeadCell className="table__headCell mostFollowedWindow__th">
                                        Modified
                                    </TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <img
                                            src="../../src/assets/images/folder-closed.png"
                                            className="pixelated mostFollowedWindow__tdImg"
                                            alt="icon"
                                            width="15"
                                        />
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {"Blog Posts"}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {formatBigNumber(4000000)}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {"File Folder"}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {formatDate("2024-05-15T00:00:00.000Z", { time: true })}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <img
                                            src="../../src/assets/images/folder-closed.png"
                                            className="pixelated mostFollowedWindow__tdImg"
                                            alt="icon"
                                            width="15"
                                        />
                                        <span
                                            className={`mostFollowedWindow__tdName${ 0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {"Embedded Stuff"}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {formatBigNumber(4000000)}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {"File Folder"}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {formatDate("2020-07-27T00:00:00.000Z", { time: true })}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <img
                                            src="../../src/assets/images/folder-closed.png"
                                            className="pixelated mostFollowedWindow__tdImg"
                                            alt="icon"
                                            width="15"
                                        />
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {"Web Service Stuff"}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {formatBigNumber(4000000)}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {"File Folder"}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {formatDate("2024-03-02T00:00:00.000Z", { time: true })}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {""}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {""}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {""}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {""}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {""}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {""}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {""}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {""}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {""}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                        <span
                                            className={`mostFollowedWindow__tdName${0 ? " -highlighted" : ""
                                                }`}
                                        >
                                            {""}
                                        </span>
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                        {""}
                                    </TableDataCell>
                                </TableRow>
                                {/*shortcuts &&
                                    shortcuts.length > 0 &&
                                    shortcuts.map(
                                        ({
                                            node: {
                                                id,
                                                name,
                                                owner,
                                                stargazers,
                                                primaryLanguage,
                                                pushedAt,
                                            },
                                        }) => {
                                            return (
                                                <TableRow
                                                    key={id}
                                                    data-name={name + owner.login}
                                                    className="table__bodyRow"
                                                    onClick={handleSnglClick(name)}
                                                    onDoubleClick={handleDblClick(name, owner.login)}
                                                >
                                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                                                        <img
                                                            src={require(`../../assets/folder-closed.png`).default}
                                                            className="pixelated mostFollowedWindow__tdImg"
                                                            alt="icon"
                                                            width="15"
                                                        />
                                                        <span
                                                            className={`mostFollowedWindow__tdName${highlighted === name ? " -highlighted" : ""
                                                                }`}
                                                        >
                                                            {name}
                                                        </span>
                                                    </TableDataCell>
                                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                                        {formatBigNumber(stargazers.totalCount)}
                                                    </TableDataCell>
                                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                                        {primaryLanguage ? primaryLanguage.name : "-"}
                                                    </TableDataCell>
                                                    <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                                                        {formatDate(pushedAt, { time: true })}
                                                    </TableDataCell>
                                                </TableRow>
                                            );
                                        }
                                    )*/}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="mostFollowedWindow__footer">
                    <p>2 items</p>
                </div>
            </section>
        </>
    );
}