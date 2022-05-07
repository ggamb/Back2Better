import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import StationTimes from "../StationTimes";

function Green() {
    
    interface Station {
        line: string;
        name: string;
        transfer: boolean;
        transferLines: string;
        stationCode: string;
    }

    interface GreenTrains {
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

    const greenLineStations : Array<Station> = [
        {line: 'green yellow', name: 'Greenbelt', transfer: false, transferLines: '', stationCode: 'E10'},
        {line: 'green yellow', name: 'College Park', transfer: false, transferLines: '', stationCode: 'E09'},
        {line: 'green yellow', name: "Prince George's Plaza", transfer: false, transferLines: '', stationCode: 'E08'},
        {line: 'green yellow', name: 'West Hyattsville', transfer: false, transferLines: '', stationCode: 'E07'},
        {line: 'green yellow', name: 'Fort Totten', transfer: false, transferLines: 'yellow green green', stationCode: 'E06,B06'},
        {line: 'green yellow', name: 'Georgia Avenue-Petworth', transfer: false, transferLines: '', stationCode: 'E05'},
        {line: 'green yellow', name: 'Columbia Heights', transfer: false, transferLines: '', stationCode: 'E04'},
        {line: 'green yellow', name: 'U Street', transfer: false, transferLines: '', stationCode: 'E03'},
        {line: 'green yellow', name: 'Shaw-Howard U', transfer: false, transferLines: '', stationCode: 'E02'},
        {line: 'green yellow', name: 'Mount Vernon Square', transfer: false, transferLines: '', stationCode: 'E01'},
        {line: 'green yellow', name: 'Gallery Place', transfer: false, transferLines: 'yellow green green', stationCode: 'F01,B01'},
        {line: 'green yellow', name: 'Archives', transfer: false, transferLines: '', stationCode: 'F02'},
        {line: 'green yellow', name: "L'Enfant Plaza", transfer: false, transferLines: 'yellow green orange silver blue', stationCode: 'F03,D03'},
        {line: 'green', name: 'Waterfront', transfer: false, transferLines: '', stationCode: 'F04'},
        {line: 'green', name: 'Navy Yard-Ballpark', transfer: false, transferLines: '', stationCode: 'F05'},
        {line: 'green', name: 'Anacostia', transfer: false, transferLines: '', stationCode: 'F06'},
        {line: 'green', name: 'Congress Heights', transfer: false, transferLines: '', stationCode: 'F07'},
        {line: 'green', name: 'Southern Ave', transfer: false, transferLines: '', stationCode: 'F08'},
        {line: 'green', name: 'Naylor Road', transfer: false, transferLines: '', stationCode: 'F09'},
        {line: 'green', name: 'Suitland', transfer: false, transferLines: '', stationCode: 'F10'},
        {line: 'green', name: 'Branch Avenue', transfer: false, transferLines: '', stationCode: 'F11'},
    ];
    
    
    const [northBoundTrainsAtStation, setNorthBoundTrainsAtStation] = useState<GreenTrains[]>([]);
    const [southBoundTrainsAtStation, setSouthBoundTrainsAtStation] = useState<GreenTrains[]>([]);
    const [northBoundTrains, setNorthBoundTrains] = useState<GreenTrains[]>([]);
    const [southBoundTrains, setSouthBoundTrains] = useState<GreenTrains[]>([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [stationTimes, setStationTimes] = useState([]);

    const [clickedStation, setClickedStation] = useState('');

    const apiKey = process.env.REACT_APP_METROHERO;
    const metroHeroGreenTrains = `https://dcmetrohero.com/api/v1/metrorail/trains`;

    const requestHeaders: any = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    requestHeaders.set('apiKey', apiKey);

    async function getGreenLineTrains() {
        try {
            let response : any = await fetch(metroHeroGreenTrains, {
                headers:  requestHeaders
            });

            if(!response.ok) {
                throw new Error('API failure');
            }

            let greenLineTrains : any = await response.json();

            //let greenLineConsole : any = greenLineTrains.filter((lines : any) => lines.Line === 'GR');
            //console.log('all GR', greenLineConsole)

            let greenLineNorth : any = greenLineTrains.filter((lines : any) => lines.Line === 'GR' && lines.directionNumber === 1 && lines.minutesAway > 0);
            let greenLineSouth : any = greenLineTrains.filter((lines : any) => lines.Line === 'GR' && lines.directionNumber === 2 && lines.minutesAway > 0);
            let greenLineNorthAtStation : any = greenLineTrains.filter((lines : any) => lines.Line === 'GR' && lines.directionNumber === 1 && lines.minutesAway === 0);
            let greenLineSouthAtStation : any = greenLineTrains.filter((lines : any) => lines.Line === 'GR' && lines.directionNumber === 2 && lines.minutesAway === 0);

            setNorthBoundTrains(greenLineNorth);
            setSouthBoundTrains(greenLineSouth);
            setNorthBoundTrainsAtStation(greenLineNorthAtStation);
            setSouthBoundTrainsAtStation(greenLineSouthAtStation);

        }  catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getGreenLineTrains();

        const interval=setInterval(()=>{
            getGreenLineTrains();
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
                    <div className="vertical-green"></div>
                    <div className="line-and-station-content">
                            {greenLineStations.map(station => (
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

export default Green;