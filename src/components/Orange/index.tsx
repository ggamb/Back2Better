import { useEffect, useState } from "react";


function Orange() {
    interface Station {
        line: string;
        name: string;
        transfer: boolean;
        transferLines: string;
        stationCode: string;
    }

    interface OrangeTrains {
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

    const orangeLineStations : Array<Station> = [ 
        {line: 'orange', name: 'New Carrollton', transfer: false, transferLines: '', stationCode: 'D13'},
        {line: 'orange', name: 'Landover', transfer: false, transferLines: '', stationCode: 'D12'},
        {line: 'orange', name: 'Cheverly', transfer: false, transferLines: '', stationCode: 'D11'},
        {line: 'orange', name: 'Deanwood', transfer: false, transferLines: '', stationCode: 'D10'},
        {line: 'orange', name: 'Minnesota Ave', transfer: false, transferLines: '', stationCode: 'D09'},
        {line: 'blue silver', name: 'Largo Town Center', transfer: false, transferLines: '', stationCode: 'G05'},
        {line: 'blue silver', name: 'Morgan Blvd', transfer: false, transferLines: '', stationCode: 'G04'},
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
        {line: 'blue silver orange', name: 'McPherson Square', transfer: false, transferLines: '', stationCode: 'C02'},
        {line: 'blue silver orange', name: 'Farragut West', transfer: false, transferLines: '', stationCode: 'C03'},
        {line: 'blue silver orange', name: 'Foggy Bottom-GWU', transfer: false, transferLines: '', stationCode: 'C04'},
        {line: 'blue silver orange', name: 'Rosslyn', transfer: false, transferLines: 'orange silver blue', stationCode: 'C05'},
        {line: 'silver orange', name: 'Court House', transfer: false, transferLines: '', stationCode: 'K01'},
        {line: 'silver orange', name: 'Clarendon', transfer: false, transferLines: '', stationCode: 'K02'},
        {line: 'silver orange', name: 'Virginia Square-GMU', transfer: false, transferLines: '', stationCode: 'K03'},
        {line: 'silver orange', name: 'Ballston', transfer: false, transferLines: '', stationCode: 'K04'},
        {line: 'silver orange', name: 'East Falls Church', transfer: false, transferLines: 'orange silver', stationCode: 'K05'},
        {line: 'orange', name: 'West Falls Church', transfer: false, transferLines: '', stationCode: 'K06'},
        {line: 'orange', name: 'Dunn Loring', transfer: false, transferLines: '', stationCode: 'K07'},
        {line: 'orange', name: 'Vienna/Fairfax-GMU', transfer: false, transferLines: '', stationCode: 'K08'},
    ];


    const [eastBoundTrainsAtStation, setEastBoundTrainsAtStation] = useState<OrangeTrains[]>([]);
    const [westBoundTrainsAtStation, setWestBoundTrainsAtStation] = useState<OrangeTrains[]>([]);
    const [eastBoundTrains, setEastBoundTrains] = useState<OrangeTrains[]>([]);
    const [westBoundTrains, setWestBoundTrains] = useState<OrangeTrains[]>([]);

    const apiKey = process.env.REACT_APP_METROHERO;
    const metroHeroOrangeTrains = `https://dcmetrohero.com/api/v1/metrorail/trains`;

    const requestHeaders: any = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    requestHeaders.set('apiKey', apiKey);

    async function getOrangeLineTrains() {
        try {
            let response : any = await fetch(metroHeroOrangeTrains, {
                headers:  requestHeaders
            });

            if(!response.ok) {
                throw new Error('API failure');
            }

            let orangeLineTrains : any = await response.json();

            //let orangeLineConsole : any = orangeLineTrains.filter((lines : any) => lines.Line === 'OR');
            //console.log('all OR', orangeLineConsole)

            let orangeLineEast : any = orangeLineTrains.filter((lines : any) => lines.Line === 'OR' && lines.directionNumber === 1 && lines.minutesAway > 0);
            let orangeLineWest : any = orangeLineTrains.filter((lines : any) => lines.Line === 'OR' && lines.directionNumber === 2 && lines.minutesAway > 0);
            let orangeLineEastAtStation : any = orangeLineTrains.filter((lines : any) => lines.Line === 'OR' && lines.directionNumber === 1 && lines.minutesAway === 0);
            let orangeLineWestAtStation : any = orangeLineTrains.filter((lines : any) => lines.Line === 'OR' && lines.directionNumber === 2 && lines.minutesAway === 0);

            setEastBoundTrains(orangeLineEast);
            setWestBoundTrains(orangeLineWest);
            setEastBoundTrainsAtStation(orangeLineEastAtStation);
            setWestBoundTrainsAtStation(orangeLineWestAtStation);

        }  catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getOrangeLineTrains();

        const interval=setInterval(()=>{
            getOrangeLineTrains();
        },10000)

        return()=>clearInterval(interval)

    }, []);
    

    return (
        <>
        <div className="scrollable-container">
            <div className="inner-line-container">
                <div className="line-and-station-container">
                    <div className="vertical-orange"></div>
                    <div className="line-and-station-content">
                            {orangeLineStations.map(station => (
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
        
        <div className= "vertical-orange">

        </div>
        <div className="westBound"></div>
        <div>
            <ul>
                {orangeLineStations.map(station => (
                    <p className="station-list-orange">{station.name}</p>
                ))
                <li class="station-name">
                    <p>{{station.name}}</p>
                    <div *ngIf="station.transferLines.includes('green')">🟢</div>
                    <div *ngIf="station.transferLines.includes('orange')">🟡</div>
                    <div *ngIf="station.transferLines.includes('orange')">🟠</div>
                    <div *ngIf="station.transferLines.includes('silver')">⚪</div>
                    <div *ngIf="station.transferLines.includes('orange')">🔵</div>
                </li>
            </ul>
        </div>*/}
        </>
    )
}

export default Orange;