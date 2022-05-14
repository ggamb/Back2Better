import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import StationTimes from "../StationTimes";

function Silver() {

    interface Station {
        line: string;
        name: string;
        transfer: boolean;
        transferLines: string;
        stationCode: string;
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
        realTrainId: string;
        isCurrentlyHoldingOrSlow: boolean;
        Min: string;
    }


    const silverLineStations : Array<Station> = [ 
        {line: 'blue silver', name: 'Largo Town Center', transfer: false, transferLines: '', stationCode: 'G05'},
        {line: 'blue silver', name: 'Morgan Boulevard', transfer: false, transferLines: '', stationCode: 'G04'},
        {line: 'blue silver', name: 'Addison Road', transfer: false, transferLines: '', stationCode: 'G03'},
        {line: 'blue silver', name: 'Capitol Heights', transfer: false, transferLines: '', stationCode: 'G02'},
        {line: 'blue silver', name: 'Benning Road', transfer: false, transferLines: '', stationCode: 'G01'},
        {line: 'blue silver orange', name: 'Stadium-Armory', transfer: false, transferLines: 'orange silver blue', stationCode: 'D08'},
        {line: 'blue silver orange', name: 'Potomac Ave', transfer: false, transferLines: '', stationCode: 'D07'},
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
        {line: 'silver', name: 'McLean', transfer: false, transferLines: '', stationCode: 'N01'},
        {line: 'silver', name: 'Tysons Corner', transfer: false, transferLines: '', stationCode: 'N02'},
        {line: 'silver', name: 'Greensboro', transfer: false, transferLines: '', stationCode: 'N03'},
        {line: 'silver', name: 'Spring Hill', transfer: false, transferLines: '', stationCode: 'N04'},
        {line: 'silver', name: 'Wiehle-Reston East', transfer: false, transferLines: '', stationCode: 'N06'},
    ];


    const [eastBoundTrainsAtStation, setEastBoundTrainsAtStation] = useState<SilverTrains[]>([]);
    const [westBoundTrainsAtStation, setWestBoundTrainsAtStation] = useState<SilverTrains[]>([]);
    const [eastBoundTrains, setEastBoundTrains] = useState<SilverTrains[]>([]);
    const [westBoundTrains, setWestBoundTrains] = useState<SilverTrains[]>([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [stationTimes, setStationTimes] = useState([]);

    const [clickedStation, setClickedStation] = useState('');

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

            //let silverLineConsole : any = silverLineTrains.filter((lines : any) => lines.Line === 'SV');
            //console.log('all SL', silverLineConsole);

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

        const interval=setInterval(()=>{
            getSilverLineTrains();
        },10000)

        return()=>clearInterval(interval)

    }, []);

    async function showStationTimes(e : any){
        e.preventDefault();

        let stationCode = e.target.id;

        const metroHeroStationTimes = `https://dcmetrohero.com/api/v1/metrorail/stations/${stationCode}/trains`;

        try {
            let response : any = await fetch(metroHeroStationTimes, {
                headers:  requestHeaders
            });

            if(!response.ok) {
                throw new Error('API failure');
            }

            let calledStationTime : any = await response.json();

            console.log(calledStationTime);

            setStationTimes(calledStationTime);

            setClickedStation(calledStationTime[0].LocationName);

        }  catch (err) {
            console.log(err)
        }
    }
    

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
                                <div className="station-dot" id={`${station.stationCode}`} onClick= {(e) => {handleOpen(); showStationTimes(e)}}></div>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <StationTimes
                                                stationTime = {stationTimes}
                                                clickedStation = {clickedStation}
                                            />
                                        </Modal>
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
                                                                        <p className="train-Id">Train {westTrains.realTrainId}</p>
                                                                    </div>
                                                                    <div key={westTrains.realTrainId} className="train-at-station">🚇↓</div>
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
                                                                <div key={eastTrains.realTrainId} className="train-at-station-right">🚇↑</div>
                                                                <div className="train-icon-container-right"> 
                                                                    <div className="train-info-right">
                                                                        <p className="train-category">{eastTrains.Min}</p>
                                                                        <p>{eastTrains.Car}-car train</p>
                                                                        <p className="train-Id">Train {eastTrains.realTrainId}</p>
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
                                    <div className="station-name" id={`${station.stationCode}`} onClick= {(e) => {handleOpen(); showStationTimes(e)}}>{station.name}</div>
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
                                                                        <p className="train-Id">Train {westTrains.realTrainId}</p>
                                                                    </div>
                                                                    <div key={westTrains.realTrainId} className="train-in-transit-left">🚇↓</div>
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
                                                                    <div key={eastTrains.realTrainId} className="train-in-transit-right">🚇↑</div>
                                                                    <div className="train-info-right">
                                                                        {eastTrains.Min === 'ARR' || eastTrains.Min === 'BRD' ? (
                                                                                <p className="train-category">{eastTrains.Min}</p>
                                                                            ) : (
                                                                                <p className="train-category">{eastTrains.Min} min</p>
                                                                            )
                                                                        }
                                                                        <p>{eastTrains.Car}-car train</p>
                                                                        <p className="train-Id">Train {eastTrains.realTrainId}</p>
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
        </>
    )
}

export default Silver;