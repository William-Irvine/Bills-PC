//import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
//import { Button, Anchor, Frame, Table, TableRow, TableHeadCell, TableHead, TableBody, TableDataCell, Separator } from "react95";
import { Button, Frame, Table, TableRow, TableHeadCell, TableHead, TableBody, TableDataCell } from "react95";

//import useNewWindow from "../../hooks/useNewWindow";

import "./styles.scss";


interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function getDate(date_offset: number) {
    const today = new Date();
    const month = today.getMonth()+1;
    const date = today.getDate()+date_offset;
    const year = today.getFullYear();
    if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && date > 31) 
        return `${month + 1}/${date - 31}/${year}`;
    else if ((month == 4 || month == 6 || month == 9 || month == 11) && date > 30)
            return `${month + 1}/${date - 30}/${year}`;     
    else if (month == 2 && (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) && date > 29) 
        return `${month + 1}/${date - 29}/${year}`;
    else if (month == 2 && !(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) && date > 28)
        return `${month + 1}/${date - 28}/${year}`;
    else
        return `${month}/${date}/${year}`;
}

export default function Weather() {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    return (
        <section className="weatherWindow">
            <div className="flex justify-between weatherWindow__header">
                <div className="flex flex-auto items-center">
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
            </div>
            <div className="weatherWindow__bodyInner">
                <Frame
                    variant='outside'
                    style={{ padding: '0.5rem', lineHeight: '1.5', width: 415 }}>
                    <Table className="weatherWindow__weatherTable">
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Date</TableHeadCell>
                                <TableHeadCell>Temp. (C)</TableHeadCell>
                                <TableHeadCell>Temp. (F)</TableHeadCell>
                                <TableHeadCell>Summary</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        {forecasts 
                        ? forecasts.map(forecast =>
                            <TableBody>
                                <TableRow key={forecast.date}>
                                    <TableDataCell>{forecast.date}</TableDataCell>
                                    <TableDataCell>{forecast.temperatureC}</TableDataCell>
                                    <TableDataCell>{forecast.temperatureF}</TableDataCell>
                                    <TableDataCell>{forecast.summary}</TableDataCell>
                                </TableRow>
                            </TableBody>
                            )
                            : <TableBody>
                                <TableRow>
                                    <TableDataCell>{getDate(0)}</TableDataCell>
                                    <TableDataCell>NA</TableDataCell>
                                    <TableDataCell>NA</TableDataCell>
                                    <TableDataCell>No Data</TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell>{getDate(1)}</TableDataCell>
                                    <TableDataCell>NA</TableDataCell>
                                    <TableDataCell>NA</TableDataCell>
                                    <TableDataCell>No Data</TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell>{getDate(2)}</TableDataCell>
                                    <TableDataCell>NA</TableDataCell>
                                    <TableDataCell>NA</TableDataCell>
                                    <TableDataCell>No Data</TableDataCell>
                                    </TableRow>
                                <TableRow>
                                    <TableDataCell>{getDate(3)}</TableDataCell>
                                    <TableDataCell>NA</TableDataCell>
                                    <TableDataCell>NA</TableDataCell>
                                    <TableDataCell>No Data</TableDataCell>
                                </TableRow>
                                <TableRow>
                                    <TableDataCell>{getDate(4)}</TableDataCell>
                                    <TableDataCell>NA</TableDataCell>
                                    <TableDataCell>NA</TableDataCell>
                                    <TableDataCell>No Data</TableDataCell>
                                </TableRow>
                            </TableBody>
                        }
                    </Table>
                </Frame>
            </div>
            <div className="notif">
                {!forecasts ? <p>Unable to contact server...</p> : <p></p>}                
            </div>
        </section>
    );

    //Get Some Weather
    //var coords;
    //var geometry;
    //var lat = 0;
    //var lng = 0;

    /*
        Try to get the data from our .NET web server. 
        Otherwise just use React to get it directly from NWS
    */
    async function populateWeatherData() {
        //var response = await fetch('weatherforecasts');
        var response = await fetch('weatherforecast');
        //console.log('>>> ', response);
        //console.log('>>> Status: ', response.status);
        var data

        var data_source = 0;
        if (response.status != 404) {
            data = await response.json();
            data_source = 1;
        } else {
            console.log('>>> .NET Web Server Down ');
            console.log('>>> Finding Another Way');

            response = await fetch('https://api.weather.gov/stations/KPYM/');
            console.log('>>> ', response);
            console.log('>>> Status: ', response.status);
            if (response.status != 404) {
                data = await response.json;
                console.log('>>> ', data);
                console.log('>>> Status: ', response.status);
            }
            data_source = 2;
        }
        setForecasts(data);
        console.log("Data Source: ", data_source);
    }


}