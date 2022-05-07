import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import StationTimes from "../StationTimes";


function Red() {

    const apiKey = process.env.REACT_APP_METROHERO;

    const metroHeroTrains = `https://dcmetrohero.com/api/v1/metrorail/trains`;

    const requestHeaders: any = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    requestHeaders.set('apiKey', apiKey);

    interface Station {
        line: string;
        name: string;
        transfer: boolean;
        transferLines: string;
        stationCode: string;
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
        minutesAway: number;
        tripId: string;
        trainId: string;
        isCurrentlyHoldingOrSlow: boolean;
        Min: string;
    }
    
    const redLineStations : Array<Station> = [ 
        {line: 'red', name: 'Glenmont', transfer: false, transferLines: '', stationCode: 'B11'},
        {line: 'red', name: 'Wheaton', transfer: false, transferLines: '', stationCode: 'B10'},
        {line: 'red', name: 'Forest Glen', transfer: false, transferLines: '', stationCode: 'B09'},
        {line: 'red', name: 'Silver Spring', transfer: false, transferLines: '', stationCode: 'B08'},
        {line: 'red', name: 'Takoma', transfer: false, transferLines: '', stationCode: 'B07'},
        {line: 'red', name: 'Fort Totten', transfer: false, transferLines: 'red green yellow', stationCode: 'B06,E06'},
        {line: 'red', name: 'Brookland-CUA', transfer: false, transferLines: '', stationCode: 'B05'},
        {line: 'red', name: 'Rhode Island Avenue-Brentwood', transfer: false, transferLines: '', stationCode: 'B04'},
        {line: 'red', name: 'NoMa-Gallaudet U', transfer: false, transferLines: '', stationCode: 'B35'},
        {line: 'red', name: 'Union Station', transfer: false, transferLines: '', stationCode: 'B03'},
        {line: 'red', name: 'Judiciary Square', transfer: false, transferLines: '', stationCode: 'B02'},
        {line: 'red', name: 'Gallery Place', transfer: false, transferLines: 'red green yellow', stationCode: 'B01,F01'},
        {line: 'red', name: 'Metro Center', transfer: false, transferLines: 'orange silver blue red', stationCode: 'A01,C01'},
        {line: 'red', name: 'Farragut North', transfer: false, transferLines: '', stationCode: 'A02'},
        {line: 'red', name: 'Dupont Circle', transfer: false, transferLines: '', stationCode: 'A03'},
        {line: 'red', name: 'Woodley Park', transfer: false, transferLines: '', stationCode: 'A04'},
        {line: 'red', name: 'Cleveland Park', transfer: false, transferLines: '', stationCode: 'A05'},
        {line: 'red', name: 'Van Ness-UDC', transfer: false, transferLines: '', stationCode: 'A06'},
        {line: 'red', name: 'Tenleytown-AU', transfer: false, transferLines: '', stationCode: 'A07'},
        {line: 'red', name: 'Friendship Heights', transfer: false, transferLines: '', stationCode: 'A08'},
        {line: 'red', name: 'Bethesda', transfer: false, transferLines: '', stationCode: 'A09'},
        {line: 'red', name: 'Medical Center', transfer: false, transferLines: '', stationCode: 'A10'},
        {line: 'red', name: 'Grosvenor-Strathmore', transfer: false, transferLines: '', stationCode: 'A11'},
        {line: 'red', name: 'White Flint', transfer: false, transferLines: '', stationCode: 'A12'},
        {line: 'red', name: 'Twinbrook', transfer: false, transferLines: '', stationCode: 'A13'},
        {line: 'red', name: 'Rockville', transfer: false, transferLines: '', stationCode: 'A14'},
        {line: 'red', name: 'Shady Grove', transfer: false, transferLines: '', stationCode: 'A15'},
    ];

    const [northBoundTrainsAtStation, setNorthBoundTrainsAtStation] = useState<RedTrains[]>([]);
    const [southBoundTrainsAtStation, setSouthBoundTrainsAtStation] = useState<RedTrains[]>([]);
    const [northBoundTrains, setNorthBoundTrains] = useState<RedTrains[]>([]);
    const [southBoundTrains, setSouthBoundTrains] = useState<RedTrains[]>([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [stationTimes, setStationTimes] = useState([]);

    const [clickedStation, setClickedStation] = useState('');


    async function getRedLineTrains() {
        try {
            let response : any = await fetch(metroHeroTrains, {
                headers:  requestHeaders
            });

            if(!response.ok) {
                throw new Error('API failure');
            }

            let redLineTrains : any = await response.json();

            //let redLineConsole : any = redLineTrains.filter((lines : any) => lines.Line === 'RD');
            //console.log('all RD', redLineConsole)

            let redLineNorth : any = redLineTrains.filter((lines : any) => lines.Line === 'RD' && lines.directionNumber === 1 && lines.minutesAway > 0);
            let redLineSouth : any = redLineTrains.filter((lines : any) => lines.Line === 'RD' && lines.directionNumber === 2 && lines.minutesAway > 0);
            let redLineNorthAtStation : any = redLineTrains.filter((lines : any) => lines.Line === 'RD' && lines.directionNumber === 1 && lines.minutesAway === 0);
            let redLineSouthAtStation : any = redLineTrains.filter((lines : any) => lines.Line === 'RD' && lines.directionNumber === 2 && lines.minutesAway === 0);

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

        const interval=setInterval(()=>{
            getRedLineTrains();
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

            //let redLineConsole : any = redLineTrains.filter((lines : any) => lines.Line === 'RD');
            //console.log('station time', calledStationTime)

        }  catch (err) {
            console.log(err)
        }
    }

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
                                    <div className="station-name" id={`${station.stationCode}`} onClick= {(e) => {handleOpen(); showStationTimes(e)}}>{station.name}</div>
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
        </>
    )
}

export default Red;