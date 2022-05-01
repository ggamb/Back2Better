import { useEffect, useState } from "react";

function Yellow() {
    interface Station {
        line: string;
        name: string;
        transfer: boolean;
        transferLines: string;
    }

    interface YellowTrains {
        Car: string;
        DestinationName: string;
        LocationCode: string;
        PreviousStationCode: string;
        previousStationName: string;
        currentStationCode: string;
        currentStationName: string;
        directionNumber: number;
        minutesAway: number;
        tripId: string;
        trainId: string;
        isCurrentlyHoldingOrSlow: boolean;
        Min: string;
    }
    
    const yellowLineStations : Array<Station> = [ 
        {line: 'green yellow', name: 'Greenbelt', transfer: false, transferLines: ''},
        {line: 'green yellow', name: 'College Park', transfer: false, transferLines: ''},
        {line: 'green yellow', name: "Prince George's Plaza", transfer: false, transferLines: ''},
        {line: 'green yellow', name: 'West Hyattsville', transfer: false, transferLines: ''},
        {line: 'green yellow', name: 'Fort Totten', transfer: false, transferLines: 'yellow green yellow'},
        {line: 'green yellow', name: 'Georgia Avenue-Petworth', transfer: false, transferLines: ''},
        {line: 'green yellow', name: 'Columbia Heights', transfer: false, transferLines: ''},
        {line: 'green yellow', name: 'U Street', transfer: false, transferLines: ''},
        {line: 'green yellow', name: 'Shaw-Howard U', transfer: false, transferLines: ''},
        {line: 'green yellow', name: 'Mount Vernon Square', transfer: false, transferLines: ''},
        {line: 'green yellow', name: 'Gallery Place', transfer: false, transferLines: 'yellow green yellow'},
        {line: 'green yellow', name: 'Archives', transfer: false, transferLines: ''},
        {line: 'green yellow', name: "L'Enfant Plaza", transfer: false, transferLines: 'yellow green orange silver blue'},
        {line: 'blue yellow', name: 'Pentagon', transfer: false, transferLines: 'blue yellow'},
        {line: 'blue yellow', name: 'Pentagon City', transfer: false, transferLines: ''},
        {line: 'blue yellow', name: 'Crystal City', transfer: false, transferLines: ''},
        {line: 'blue yellow', name: 'Ronald Reagan Washington National Airport', transfer: false, transferLines: ''},
        {line: 'blue yellow', name: 'Braddock Road', transfer: false, transferLines: ''},
        {line: 'blue yellow', name: 'King Street-Old Town', transfer: false, transferLines: 'blue yellow'},
        {line: 'yellow', name: 'Eisenhower Avenue', transfer: false, transferLines: ''},
        {line: 'yellow', name: 'Huntington', transfer: false, transferLines: ''},
    ];


    const [northBoundTrainsAtStation, setNorthBoundTrainsAtStation] = useState<YellowTrains[]>([]);
    const [southBoundTrainsAtStation, setSouthBoundTrainsAtStation] = useState<YellowTrains[]>([]);
    const [northBoundTrains, setNorthBoundTrains] = useState<YellowTrains[]>([]);
    const [southBoundTrains, setSouthBoundTrains] = useState<YellowTrains[]>([]);

    const apiKey = process.env.REACT_APP_METROHERO;
    const metroHeroYellowTrains = `https://dcmetrohero.com/api/v1/metrorail/trains`;

    const requestHeaders: any = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    requestHeaders.set('apiKey', apiKey);

    async function getYellowLineTrains() {
        try {
            let response : any = await fetch(metroHeroYellowTrains, {
                headers:  requestHeaders
            });

            if(!response.ok) {
                throw new Error('API failure');
            }

            let yellowLineTrains : any = await response.json();

            let yellowLineConsole : any = yellowLineTrains.filter((lines : any) => lines.Line === 'YL');
            console.log('all YL', yellowLineConsole)

            let yellowLineNorth : any = yellowLineTrains.filter((lines : any) => lines.Line === 'YL' && lines.directionNumber === 1 && lines.minutesAway > 0);
            let yellowLineSouth : any = yellowLineTrains.filter((lines : any) => lines.Line === 'YL' && lines.directionNumber === 2 && lines.minutesAway > 0);
            let yellowLineNorthAtStation : any = yellowLineTrains.filter((lines : any) => lines.Line === 'YL' && lines.directionNumber === 1 && lines.minutesAway === 0);
            let yellowLineSouthAtStation : any = yellowLineTrains.filter((lines : any) => lines.Line === 'YL' && lines.directionNumber === 2 && lines.minutesAway === 0);

            setNorthBoundTrains(yellowLineNorth);
            setSouthBoundTrains(yellowLineSouth);
            setNorthBoundTrainsAtStation(yellowLineNorthAtStation);
            setSouthBoundTrainsAtStation(yellowLineSouthAtStation);

        }  catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getYellowLineTrains();

        /*const interval=setInterval(()=>{
            getYellowLineTrains();
        },10000)

        return()=>clearInterval(interval)*/

    }, []);
    

    return (
        <>
        <div className="scrollable-container">
            <div className="inner-line-container">
                <div className="line-and-station-container">
                    <div className="vertical-yellow"></div>
                    <div className="line-and-station-content">
                            {yellowLineStations.map(station => (
                                <>
                                <div className="station-row">
                                    <div className="station-dot"></div>
                                    {/*Maps southbound trains at stations*/}
                                        {southBoundTrainsAtStation.length ?
                                            (
                                                <>                                          
                                                    {
                                                        southBoundTrainsAtStation.map(southTrains => {
                                                            if(southTrains.currentStationName === station.name) 
                                                            return ( 
                                                                <div className="train-icon-container">
                                                                    <div className="train-info-left">
                                                                        <p className="train-category">{southTrains.Min}</p>
                                                                        <p>{southTrains.Car}-car train</p>
                                                                        <p className="train-Id">Train {southTrains.trainId}</p>
                                                                    </div>
                                                                    <div key={southTrains.trainId} className="train-at-station">🚇↓</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </>
                                            ) : 
                                            (
                                                <></>
                                            )
                                        }
                                        {/*Maps northbound trains at stations*/}
                                        {northBoundTrainsAtStation.length ?
                                            (
                                                <>                                          
                                                    {
                                                        northBoundTrainsAtStation.map(northTrains => {
                                                            if(northTrains.currentStationName === station.name) 
                                                            return ( 
                                                                <>
                                                                <div key={northTrains.trainId} className="train-at-station-right">🚇↑</div>
                                                                <div className="train-icon-container-right"> 
                                                                    <div className="train-info-right">
                                                                        <p className="train-category">{northTrains.Min}</p>
                                                                        <p>{northTrains.Car}-car train</p>
                                                                        <p className="train-Id">Train {northTrains.trainId}</p>
                                                                    </div>
                                                                </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </>
                                            ) : 
                                            (
                                                <></>
                                            )
                                        }
                                    <div className="station-name">{station.name}</div>
                                    <div className="station-problems"></div>
                                </div>
                                <div className="between-station on-left">
                                    {/*Maps southbound trains in between stations*/}
                                    {southBoundTrains.length ?
                                        (
                                            <>                                          
                                                {
                                                    southBoundTrains.map(southTrains => {
                                                        if(southTrains.previousStationName === station.name) 
                                                        return( 
                                                            <>
                                                                <div className="train-icon-container">
                                                                    <div className="train-info-left">
                                                                        {southTrains.Min === 'ARR' || southTrains.Min === 'BRD' ? (
                                                                                <p className="train-category">{southTrains.Min}</p>
                                                                            ) : (
                                                                                <p className="train-category">{southTrains.Min} min</p>
                                                                            )
                                                                        }
                                                                        <p>{southTrains.Car}-car train</p>
                                                                        <p className="train-Id">Train {southTrains.trainId}</p>
                                                                    </div>
                                                                    <div key={southTrains.trainId} className="train-in-transit-left">🚇↓</div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        ) : 
                                        (
                                            <></>
                                        )
                                    }
                                </div>
                                <div className="between-station on-right">                                   
                                   {/*Maps northbound trains in between stations*/}
                                    {northBoundTrains.length ?
                                        (
                                            <>                                          
                                                {
                                                    northBoundTrains.map(northTrains => {
                                                        if(northTrains.previousStationName === station.name) 
                                                        return( 
                                                            <>
                                                                <div className="train-icon-container-right-transit">
                                                                    <div key={northTrains.trainId} className="train-in-transit-right">🚇↑</div>
                                                                    <div className="train-info-right">
                                                                        {northTrains.Min === 'ARR' || northTrains.Min === 'BRD' ? (
                                                                                <p className="train-category">{northTrains.Min}</p>
                                                                            ) : (
                                                                                <p className="train-category">{northTrains.Min} min</p>
                                                                            )
                                                                        }
                                                                        <p>{northTrains.Car}-car train</p>
                                                                        <p className="train-Id">Train {northTrains.trainId}</p>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        ) : 
                                        (
                                            <></>
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
        
        <div className= "vertical-yellow">

        </div>
        <div className="southBound"></div>
        <div>
            <ul>
                {yellowLineStations.map(station => (
                    <p className="station-list-yellow">{station.name}</p>
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

export default Yellow;