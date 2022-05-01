import { useEffect, useState } from "react";


function Silver() {

    interface Station {
        line: string;
        name: string;
        transfer: boolean;
        transferLines: string;
    }

    interface SilverTrains {
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


    const silverLineStations : Array<Station> = [ 
        {line: 'blue silver', name: 'Largo Town Center', transfer: false, transferLines: ''},
        {line: 'blue silver', name: 'Morgan Blvd', transfer: false, transferLines: ''},
        {line: 'blue silver', name: 'Addison Rd', transfer: false, transferLines: ''},
        {line: 'blue silver', name: 'Capitol Heights', transfer: false, transferLines: ''},
        {line: 'blue silver', name: 'Benning Rd', transfer: false, transferLines: ''},
        {line: 'blue silver orange', name: 'Stadium-Armory', transfer: false, transferLines: 'orange silver blue'},
        {line: 'blue silver orange', name: 'Potomac Ave', transfer: false, transferLines: ''},
        {line: 'blue silver orange', name: 'Eastern Market', transfer: false, transferLines: ''},
        {line: 'blue silver orange', name: 'Capitol South', transfer: false, transferLines: ''},
        {line: 'blue silver orange', name: 'Federal Center SW', transfer: false, transferLines: ''},
        {line: 'blue silver orange', name: "L'Enfant Plaza", transfer: false, transferLines: 'orange silver blue yellow green'},
        {line: 'blue silver orange', name: 'Smithsonian', transfer: false, transferLines: ''},
        {line: 'blue silver orange', name: 'Federal Triangle', transfer: false, transferLines: ''},
        {line: 'blue silver orange', name: 'Metro Center', transfer: false, transferLines: 'orange silver blue red'},
        {line: 'blue silver orange', name: 'McPherson Square', transfer: false, transferLines: ''},
        {line: 'blue silver orange', name: 'Farragut West', transfer: false, transferLines: ''},
        {line: 'blue silver orange', name: 'Foggy Bottom-GWU', transfer: false, transferLines: ''},
        {line: 'blue silver orange', name: 'Rosslyn', transfer: false, transferLines: 'orange silver blue'},
        {line: 'silver orange', name: 'Court House', transfer: false, transferLines: ''},
        {line: 'silver orange', name: 'Clarendon', transfer: false, transferLines: ''},
        {line: 'silver orange', name: 'Virginia Square-GMU', transfer: false, transferLines: ''},
        {line: 'silver orange', name: 'Ballston', transfer: false, transferLines: ''},
        {line: 'silver orange', name: 'East Falls Church', transfer: false, transferLines: 'orange silver'},
        {line: 'silver', name: 'McLean', transfer: false, transferLines: ''},
        {line: 'silver', name: 'Tysons Corner', transfer: false, transferLines: ''},
        {line: 'silver', name: 'Greensboro', transfer: false, transferLines: ''},
        {line: 'silver', name: 'Spring Hill', transfer: false, transferLines: ''},
        {line: 'silver', name: 'Wiehle-Reston East', transfer: false, transferLines: ''},
    ];


    const [eastBoundTrainsAtStation, setEastBoundTrainsAtStation] = useState<SilverTrains[]>([]);
    const [westBoundTrainsAtStation, setWestBoundTrainsAtStation] = useState<SilverTrains[]>([]);
    const [eastBoundTrains, setEastBoundTrains] = useState<SilverTrains[]>([]);
    const [westBoundTrains, setWestBoundTrains] = useState<SilverTrains[]>([]);

    const apiKey = process.env.REACT_APP_METROHERO;
    const metroHeroSilverTrains = `https://dcmetrohero.com/api/v1/metrorail/trains`;

    const requestHeaders: any = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    requestHeaders.set('apiKey', apiKey);

    async function getSilverLineTrains() {
        try {
            let response : any = await fetch(metroHeroSilverTrains, {
                headers:  requestHeaders
            });

            if(!response.ok) {
                throw new Error('API failure');
            }

            let silverLineTrains : any = await response.json();

            let silverLineConsole : any = silverLineTrains.filter((lines : any) => lines.Line === 'SV');
            console.log('all SL', silverLineConsole)

            let silverLineEast : any = silverLineTrains.filter((lines : any) => lines.Line === 'SV' && lines.directionNumber === 1 && lines.minutesAway > 0);
            let silverLineWest : any = silverLineTrains.filter((lines : any) => lines.Line === 'SV' && lines.directionNumber === 2 && lines.minutesAway > 0);
            let silverLineEastAtStation : any = silverLineTrains.filter((lines : any) => lines.Line === 'SV' && lines.directionNumber === 1 && lines.minutesAway === 0);
            let silverLineWestAtStation : any = silverLineTrains.filter((lines : any) => lines.Line === 'SV' && lines.directionNumber === 2 && lines.minutesAway === 0);

            setEastBoundTrains(silverLineEast);
            setWestBoundTrains(silverLineWest);
            setEastBoundTrainsAtStation(silverLineEastAtStation);
            setWestBoundTrainsAtStation(silverLineWestAtStation);

        }  catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSilverLineTrains();

        /*const interval=setInterval(()=>{
            getSilverLineTrains();
        },10000)

        return()=>clearInterval(interval)*/

    }, []);
    

    return (
        <>
        <div className="scrollable-container">
            <div className="inner-line-container">
                <div className="line-and-station-container">
                    <div className="vertical-silver"></div>
                    <div className="line-and-station-content">
                            {silverLineStations.map(station => (
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
                                                        if(eastTrains.currentStationName === station.name) 
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
        
        <div className= "vertical-silver">

        </div>
        <div className="westBound"></div>
        <div>
            <ul>
                {silverLineStations.map(station => (
                    <p className="station-list-silver">{station.name}</p>
                ))
                <li class="station-name">
                    <p>{{station.name}}</p>
                    <div *ngIf="station.transferLines.includes('green')">🟢</div>
                    <div *ngIf="station.transferLines.includes('silver')">🟡</div>
                    <div *ngIf="station.transferLines.includes('silver')">🟠</div>
                    <div *ngIf="station.transferLines.includes('silver')">⚪</div>
                    <div *ngIf="station.transferLines.includes('silver')">🔵</div>
                </li>
            </ul>
        </div>*/}
        </>
    )
}

export default Silver;