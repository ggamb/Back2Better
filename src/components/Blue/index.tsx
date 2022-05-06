import { useEffect, useState } from "react";

function Blue() {
    interface Station {
        line: string;
        name: string;
        transfer: boolean;
        transferLines: string;
        stationCode: string;
    }

    interface BlueTrains {
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
    
    const blueLineStations : Array<Station> = [ 
        {line: 'blue silver', name: 'Largo Town Center', transfer: false, transferLines: '', stationCode: 'G05'},
        {line: 'blue silver', name: 'Morgan Boulevard', transfer: false, transferLines: '', stationCode: 'G04'},
        {line: 'blue silver', name: 'Addison Road', transfer: false, transferLines: '', stationCode: 'G03'},
        {line: 'blue silver', name: 'Capitol Heights', transfer: false, transferLines: '', stationCode: 'G02'},
        {line: 'blue silver', name: 'Benning Road', transfer: false, transferLines: '', stationCode: 'G01'},
        {line: 'blue silver orange', name: 'Stadium-Armory', transfer: false, transferLines: 'orange silver blue', stationCode: 'D08'},
        {line: 'blue silver orange', name: 'Potomac Avenue', transfer: false, transferLines: '', stationCode: 'D07'},
        {line: 'blue silver orange', name: 'Eastern Market', transfer: false, transferLines: '', stationCode: 'D06'},
        {line: 'blue silver orange', name: 'Capitol South', transfer: false, transferLines: '', stationCode: 'D05'},
        {line: 'blue silver orange', name: 'Federal Center SW', transfer: false, transferLines: '', stationCode: 'D04'},
        {line: 'blue silver orange', name: "L'Enfant Plaza", transfer: false, transferLines: 'orange silver blue yellow green', stationCode: 'D03,F03'},
        {line: 'blue silver orange', name: 'Smithsonian', transfer: false, transferLines: '', stationCode: 'D02'},
        {line: 'blue silver orange', name: 'Federal Triangle', transfer: false, transferLines: '', stationCode: 'D01'},
        {line: 'blue silver orange', name: 'Metro Center', transfer: false, transferLines: 'orange silver blue red', stationCode: 'C01,A01'},
        {line: 'blue silver orange', name: 'McPherson Squre', transfer: false, transferLines: '', stationCode: 'C02'},
        {line: 'blue silver orange', name: 'Farragut West', transfer: false, transferLines: '', stationCode: 'C03'},
        {line: 'blue silver orange', name: 'Foggy Bottom-GWU', transfer: false, transferLines: '', stationCode: 'C04'},
        {line: 'blue silver orange', name: 'Rosslyn', transfer: false, transferLines: 'orange silver blue', stationCode: 'C05'},
        {line: 'blue', name: 'Arlington Cemetery', transfer: false, transferLines: '', stationCode: 'C06'},
        {line: 'blue yellow', name: 'Pentagon', transfer: false, transferLines: 'blue yellow', stationCode: 'C07'},
        {line: 'blue yellow', name: 'Pentagon City', transfer: false, transferLines: '', stationCode: 'C08'},
        {line: 'blue yellow', name: 'Crystal City', transfer: false, transferLines: '', stationCode: 'C09'},
        {line: 'blue yellow', name: 'Ronald Reagan Washington National Airport', transfer: false, transferLines: '', stationCode: 'C10'},
        {line: 'blue yellow', name: 'Braddock Road', transfer: false, transferLines: '', stationCode: 'C12'},
        {line: 'blue yellow', name: 'King Street-Old Town', transfer: false, transferLines: 'blue yellow', stationCode: 'C13'},
        {line: 'blue', name: 'Van Dorn Street', transfer: false, transferLines: '', stationCode: 'J02'},
        {line: 'blue', name: 'Franconia-Springfield', transfer: false, transferLines: '', stationCode: 'J03'},
    ];


    const [eastBoundTrainsAtStation, setEastBoundTrainsAtStation] = useState<BlueTrains[]>([]);
    const [westBoundTrainsAtStation, setWestBoundTrainsAtStation] = useState<BlueTrains[]>([]);
    const [eastBoundTrains, setEastBoundTrains] = useState<BlueTrains[]>([]);
    const [westBoundTrains, setWestBoundTrains] = useState<BlueTrains[]>([]);

    const apiKey = process.env.REACT_APP_METROHERO;
    const metroHeroBlueTrains = `https://dcmetrohero.com/api/v1/metrorail/trains`;

    const requestHeaders: any = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    requestHeaders.set('apiKey', apiKey);

    async function getYellowLineTrains() {
        try {
            let response : any = await fetch(metroHeroBlueTrains, {
                headers:  requestHeaders
            });

            if(!response.ok) {
                throw new Error('API failure');
            }

            let blueLineTrains : any = await response.json();

            //let blueLineConsole : any = blueLineTrains.filter((lines : any) => lines.Line === 'BL');
           // console.log('all BL', blueLineConsole)

            let blueLineEast : any = blueLineTrains.filter((lines : any) => lines.Line === 'BL' && lines.directionNumber === 1 && lines.minutesAway > 0);
            let blueLineWest : any = blueLineTrains.filter((lines : any) => lines.Line === 'BL' && lines.directionNumber === 2 && lines.minutesAway > 0);
            let blueLineEastAtStation : any = blueLineTrains.filter((lines : any) => lines.Line === 'BL' && lines.directionNumber === 1 && lines.minutesAway === 0);
            let blueLineWestAtStation : any = blueLineTrains.filter((lines : any) => lines.Line === 'BL' && lines.directionNumber === 2 && lines.minutesAway === 0);

            setEastBoundTrains(blueLineEast);
            setWestBoundTrains(blueLineWest);
            setEastBoundTrainsAtStation(blueLineEastAtStation);
            setWestBoundTrainsAtStation(blueLineWestAtStation);

        }  catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getYellowLineTrains();

        const interval=setInterval(()=>{
            getYellowLineTrains();
        },10000)

        return()=>clearInterval(interval)

    }, []);
    

    return (
        <>
        <div className="scrollable-container">
            <div className="inner-line-container">
                <div className="line-and-station-container">
                    <div className="vertical-blue"></div>
                    <div className="line-and-station-content">
                            {blueLineStations.map(station => (
                                <>
                                <div className="station-row">
                                    <div className="station-dot"></div>
                                    {/*Maps westbound trains at stations*/}
                                        {westBoundTrainsAtStation.length ?
                                            (
                                                <>                                          
                                                    {
                                                        westBoundTrainsAtStation.map(westTrains => {
                                                            if(westTrains.currentStationName === station.name) 
                                                            return ( 
                                                                <div className="train-icon-container">
                                                                    <div className="train-info-left">
                                                                        <p className="train-category">{westTrains.Min}</p>
                                                                        <p>{westTrains.Car}-car train</p>
                                                                        <p className="train-Id">Train {westTrains.trainId}</p>
                                                                    </div>
                                                                    <div key={westTrains.trainId} className="train-at-station">🚇↓</div>
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
                                        {/*Maps eastbound trains at stations*/}
                                        {eastBoundTrainsAtStation.length ?
                                            (
                                                <>                                          
                                                    {
                                                        eastBoundTrainsAtStation.map(eastTrains => {
                                                            if(eastTrains.currentStationName === station.name) 
                                                            return ( 
                                                                <>
                                                                <div key={eastTrains.trainId} className="train-at-station-right">🚇↑</div>
                                                                <div className="train-icon-container-right"> 
                                                                    <div className="train-info-right">
                                                                        <p className="train-category">{eastTrains.Min}</p>
                                                                        <p>{eastTrains.Car}-car train</p>
                                                                        <p className="train-Id">Train {eastTrains.trainId}</p>
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
                                    {/*Maps westbound trains in between stations*/}
                                    {westBoundTrains.length ?
                                        (
                                            <>                                          
                                                {
                                                    westBoundTrains.map(westTrains => {
                                                        if(westTrains.previousStationName === station.name) 
                                                        return( 
                                                            <>
                                                                <div className="train-icon-container">
                                                                    <div className="train-info-left">
                                                                        {westTrains.Min === 'ARR' || westTrains.Min === 'BRD' ? (
                                                                                <p className="train-category">{westTrains.Min}</p>
                                                                            ) : (
                                                                                <p className="train-category">{westTrains.Min} min</p>
                                                                            )
                                                                        }
                                                                        <p>{westTrains.Car}-car train</p>
                                                                        <p className="train-Id">Train {westTrains.trainId}</p>
                                                                    </div>
                                                                    <div key={westTrains.trainId} className="train-in-transit-left">🚇↓</div>
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
                                   {/*Maps eastbound trains in between stations*/}
                                    {eastBoundTrains.length ?
                                        (
                                            <>                                          
                                                {
                                                    eastBoundTrains.map(eastTrains => {
                                                        if(eastTrains.previousStationName === station.name) 
                                                        return( 
                                                            <>
                                                                <div className="train-icon-container-right-transit">
                                                                    <div key={eastTrains.trainId} className="train-in-transit-right">🚇↑</div>
                                                                    <div className="train-info-right">
                                                                        {eastTrains.Min === 'ARR' || eastTrains.Min === 'BRD' ? (
                                                                                <p className="train-category">{eastTrains.Min}</p>
                                                                            ) : (
                                                                                <p className="train-category">{eastTrains.Min} min</p>
                                                                            )
                                                                        }
                                                                        <p>{eastTrains.Car}-car train</p>
                                                                        <p className="train-Id">Train {eastTrains.trainId}</p>
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

        {/*<div className="eastBound"></div>
        
        <div className= "vertical-blue">

        </div>
        <div className="westBound"></div>
        <div>
            <ul>
                {blueLineStations.map(station => (
                    <p className="station-list-blue">{station.name}</p>
                ))
                <li class="station-name">
                    <p>{{station.name}}</p>
                    <div *ngIf="station.transferLines.includes('green')">🟢</div>
                    <div *ngIf="station.transferLines.includes('blue')">🟡</div>
                    <div *ngIf="station.transferLines.includes('orange')">🟠</div>
                    <div *ngIf="station.transferLines.includes('silver')">⚪</div>
                    <div *ngIf="station.transferLines.includes('blue')">🔵</div>
                </li>
            </ul>
        </div>*/}
        </>
    )
}

export default Blue;