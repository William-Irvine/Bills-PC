// windows/Weather/index.tsx
import { useEffect, useState } from "react";
import { Button, Frame, Table, TableRow, TableHeadCell, TableHead, TableBody, TableDataCell } from "react95";
import { api } from '../../config/api';  // ⭐ Import the API config

import "./styles.scss";

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function getDate(date_offset: number) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate() + date_offset;
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
    const [error, setError] = useState(false);

    useEffect(() => {
        populateWeatherData();
    }, []);

    async function populateWeatherData() {
        try {
            // ⭐ Use the API config to call the backend
            const data = await api.get('/weatherforecast');
            
            if (Array.isArray(data)) {
                setForecasts(data);
                setError(false);
                return;
            }
        } catch (err) {
            // Backend not available - show placeholder data
            console.error('Weather fetch error:', err);
            console.log('Backend not available - showing placeholder');
            setError(true);
        }
    }

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
                        <TableBody>
                            {forecasts && forecasts.length > 0
                                ? forecasts.map(forecast =>
                                    <TableRow key={forecast.date}>
                                        <TableDataCell>{forecast.date}</TableDataCell>
                                        <TableDataCell>{forecast.temperatureC}</TableDataCell>
                                        <TableDataCell>{forecast.temperatureF}</TableDataCell>
                                        <TableDataCell>{forecast.summary}</TableDataCell>
                                    </TableRow>
                                )
                                : <>
                                    <TableRow>
                                        <TableDataCell>{getDate(0)}</TableDataCell>
                                        <TableDataCell>15</TableDataCell>
                                        <TableDataCell>59</TableDataCell>
                                        <TableDataCell>Partly Cloudy</TableDataCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableDataCell>{getDate(1)}</TableDataCell>
                                        <TableDataCell>18</TableDataCell>
                                        <TableDataCell>64</TableDataCell>
                                        <TableDataCell>Sunny</TableDataCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableDataCell>{getDate(2)}</TableDataCell>
                                        <TableDataCell>12</TableDataCell>
                                        <TableDataCell>54</TableDataCell>
                                        <TableDataCell>Rainy</TableDataCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableDataCell>{getDate(3)}</TableDataCell>
                                        <TableDataCell>16</TableDataCell>
                                        <TableDataCell>61</TableDataCell>
                                        <TableDataCell>Overcast</TableDataCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableDataCell>{getDate(4)}</TableDataCell>
                                        <TableDataCell>20</TableDataCell>
                                        <TableDataCell>68</TableDataCell>
                                        <TableDataCell>Clear</TableDataCell>
                                    </TableRow>
                                </>
                            }
                        </TableBody>
                    </Table>
                </Frame>
            </div>
            <div className="notif">
                {error && <p>Backend server unavailable - showing sample data</p>}
            </div>
        </section>
    );
}
