import { useEffect, useState } from "react";

function Red() {

    interface Station {
        line: string;
        name: string;
        transfer: boolean;
        transferLines: string;
    }

    interface RedTrains {
        Car: string;
        DestinationName: string;
        LocationCode: string;
        PreviousStationCode: string;
        previousStationName: string;
        currentStationCode: string;
        currentStationName: string;
        directionNumber: number;
        maxMinutesAway: number;
        tripId: string;
        trainId: string;
        isCurrentlyHoldingOrSlow: boolean;
    }
    
    const redLineStations : Array<Station> = [ 
        {line: 'red', name: 'Glenmont', transfer: false, transferLines: ''},
        {line: 'red', name: 'Wheaton', transfer: false, transferLines: ''},
        {line: 'red', name: 'Forest Glen', transfer: false, transferLines: ''},
        {line: 'red', name: 'Silver Spring', transfer: false, transferLines: ''},
        {line: 'red', name: 'Takoma', transfer: false, transferLines: ''},
        {line: 'red', name: 'Fort Totten', transfer: false, transferLines: 'red green yellow'},
        {line: 'red', name: 'Brookland-CUA', transfer: false, transferLines: ''},
        {line: 'red', name: 'Rhode Island Avenue-Brentwood', transfer: false, transferLines: ''},
        {line: 'red', name: 'NoMa-Gallaudet U', transfer: false, transferLines: ''},
        {line: 'red', name: 'Union Station', transfer: false, transferLines: ''},
        {line: 'red', name: 'Judiciary Square', transfer: false, transferLines: ''},
        {line: 'red', name: 'Gallery Place', transfer: false, transferLines: 'red green yellow'},
        {line: 'red', name: 'Metro Center', transfer: false, transferLines: 'orange silver blue red'},
        {line: 'red', name: 'Farragut North', transfer: false, transferLines: ''},
        {line: 'red', name: 'Dupont Circle', transfer: false, transferLines: ''},
        {line: 'red', name: 'Woodley Park', transfer: false, transferLines: ''},
        {line: 'red', name: 'Cleveland Park', transfer: false, transferLines: ''},
        {line: 'red', name: 'Van Ness-UDC', transfer: false, transferLines: ''},
        {line: 'red', name: 'Tenleytown-AU', transfer: false, transferLines: ''},
        {line: 'red', name: 'Friendship Heights', transfer: false, transferLines: ''},
        {line: 'red', name: 'Bethesda', transfer: false, transferLines: ''},
        {line: 'red', name: 'Medical Center', transfer: false, transferLines: ''},
        {line: 'red', name: 'Grosvenor-Strathmore', transfer: false, transferLines: ''},
        {line: 'red', name: 'White Flint', transfer: false, transferLines: ''},
        {line: 'red', name: 'Twinbrook', transfer: false, transferLines: ''},
        {line: 'red', name: 'Rockville', transfer: false, transferLines: ''},
        {line: 'red', name: 'Shady Grove', transfer: false, transferLines: ''},
    ];


    const [northBoundTrainsAtStation, setNorthBoundTrainsAtStation] = useState<RedTrains[]>([]);
    const [southBoundTrainsAtStation, setSouthBoundTrainsAtStation] = useState<RedTrains[]>([]);
    const [northBoundTrains, setNorthBoundTrains] = useState<RedTrains[]>([]);
    const [southBoundTrains, setSouthBoundTrains] = useState<RedTrains[]>([]);

    const apiKey = process.env.REACT_APP_METROHERO;
    const metroHeroRedTrains = `https://dcmetrohero.com/api/v1/metrorail/trains`;

    const requestHeaders: any = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    requestHeaders.set('apiKey', apiKey);

    async function getRedLineTrains() {
        try {
            let response : any = await fetch(metroHeroRedTrains, {
                headers:  requestHeaders
            });

            if(!response.ok) {
                throw new Error('API failure');
            }

            let redLineTrains : any = await response.json();

            let redLineNorth : any = redLineTrains.filter((lines : any) => lines.Line === 'RD' && lines.directionNumber === 1 && !lines.isCurrentlyHoldingOrSlow);
            let redLineSouth : any = redLineTrains.filter((lines : any) => lines.Line === 'RD' && lines.directionNumber === 2 && !lines.isCurrentlyHoldingOrSlow);
            let redLineNorthAtStation : any = redLineTrains.filter((lines : any) => lines.Line === 'RD' && lines.directionNumber === 1 && lines.isCurrentlyHoldingOrSlow);
            let redLineSouthAtStation : any = redLineTrains.filter((lines : any) => lines.Line === 'RD' && lines.directionNumber === 2 && lines.isCurrentlyHoldingOrSlow);

            console.log(redLineNorth)

            setNorthBoundTrains(redLineNorth);
            setSouthBoundTrains(redLineSouth);
            setNorthBoundTrainsAtStation(redLineNorthAtStation);
            setSouthBoundTrainsAtStation(redLineSouthAtStation);

        }  catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getRedLineTrains();
    }, []);

    

    return (
        <>
        <div className="scrollable-container">
            <div className="inner-line-container">
                <div className="line-and-station-container">
                    <div className="vertical-red"></div>
                    <div className="line-and-station-content">
                            {redLineStations.map(station => (
                                <>
                                <div className="station-row">
                                    <div className="station-dot"></div>
                                        {southBoundTrainsAtStation.length ?
                                            (
                                                <>                                          
                                                    {
                                                        southBoundTrainsAtStation.map(southTrains => {
                                                            if(southTrains.currentStationName === station.name) 
                                                            return <div key={southTrains.currentStationName} className="train-at-station">🚇↓</div>
                                                        })
                                                    }
                                                </>
                                            ) : 
                                            (
                                                <div>Loading</div>
                                            )
                                        }

                                        {northBoundTrainsAtStation.length ?
                                            (
                                                <>                                          
                                                    {
                                                        northBoundTrainsAtStation.map(northTrains => {
                                                            if(northTrains.currentStationName === station.name) 
                                                            return <div key={northTrains.currentStationName} className="train-at-station-right">🚇↑</div>
                                                        })
                                                    }
                                                </>
                                            ) : 
                                            (
                                                <div>Loading</div>
                                            )
                                        }
                                    <div className="station-name">{station.name}</div>
                                    <div className="station-problems"></div>
                                </div>
                                <div className="between-station on-left">
                                    {southBoundTrains.length ?
                                        (
                                            <>                                          
                                                {
                                                    southBoundTrains.map(southTrains => {
                                                        if(southTrains.currentStationName === station.name) 
                                                        return <div key={southTrains.currentStationName} className="train-in-transit">🚇↓</div>
                                                    })
                                                }
                                            </>
                                        ) : 
                                        (
                                            <div>Loading</div>
                                        )
                                    }
                                </div>
                                <div className="between-station on-right">                                   

                                    {northBoundTrains.length ?
                                        (
                                            <>                                          
                                                {
                                                    northBoundTrains.map(northTrains => {
                                                        if(northTrains.currentStationName === station.name) 
                                                        return <div key={northTrains.currentStationName} className="train-in-transit">🚇↑</div>
                                                    })
                                                }
                                            </>
                                        ) : 
                                        (
                                            <div>Loading</div>
                                        )
                                    }
                            
                                </div>
                                </>
                            ))}
                        
                    </div>

                </div>    
            </div>
        </div>

        {/*<div className="northBound"></div>
        
        <div className= "vertical-red">

        </div>
        <div className="southBound"></div>
        <div>
            <ul>
                {redLineStations.map(station => (
                    <p className="station-list-red">{station.name}</p>
                ))
                <li class="station-name">
                    <p>{{station.name}}</p>
                    <div *ngIf="station.transferLines.includes('green')">🟢</div>
                    <div *ngIf="station.transferLines.includes('yellow')">🟡</div>
                    <div *ngIf="station.transferLines.includes('orange')">🟠</div>
                    <div *ngIf="station.transferLines.includes('silver')">⚪</div>
                    <div *ngIf="station.transferLines.includes('blue')">🔵</div>
                </li>
            </ul>
        </div>*/}
        </>
    )
}

export default Red;