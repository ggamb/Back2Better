import React from 'react';
import Box from '@mui/material/Box';


function StationTimes({stationTime}) {

    //console.log(stationTime)

    const apiKey = process.env.REACT_APP_METROHERO;
    const requestHeaders: any = new Headers();

    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    requestHeaders.set('apiKey', apiKey);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'silver',
        border: '2px solid #000',
        boxShadow: 24
    };

    return (
        <>
        <Box sx = {style}>
            <table>
                {/*<div>
                    Station times for {stationTime[0].LocationName}
                </div>*/}
                <tr style={{'width' : '20%'}}>
                    <th>LN</th>
                    <th>CAR</th>
                    <th>DEST</th>
                    <th>MIN</th>
                </tr>
                    {stationTime.map((stationLine) : any => (
                        <tr>
                            <>
                                <td key={stationLine.trainId} style={{'width' : '20%', 'textAlign': 'center'}}>{stationLine.Line}</td>
                                <td style={{'width' : '20%', 'textAlign': 'center'}}>{stationLine.Car}</td>
                                <td style={{'width' : '20%', 'textAlign': 'center'}}>{stationLine.DestinationName}</td>
                                <td style={{'width' : '20%', 'textAlign': 'center'}}>{stationLine.Min}</td>
                            </>
                        </tr>
                    ))}
            </table>
        </Box>
        </>
    )
}

export default StationTimes;