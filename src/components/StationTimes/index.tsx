import React from 'react';
import Box from '@mui/material/Box';


function StationTimes({stationTime, clickedStation}) {

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
        width: '100%',
        bgcolor: 'transparent',
        border: '2px solid #000',
        boxShadow: 24,
    };

    return (
        <>
        <Box sx = {style}>
            <h3 style={{'textAlign' : 'center', 'color' : 'red'}}>Station times for {clickedStation}</h3>
            <table style={{ 'margin' : '0 auto'}}>
                <tr style={{'width' : '20%', 'color' : 'red', 'fontWeight' : 'bold'}}>
                    <th>LN</th>
                    <th>CAR</th>
                    <th>DEST</th>
                    <th>MIN</th>
                </tr>
                    {stationTime.map((stationLine) : any => (
                        <tr>
                            <>
                                <td key={stationLine.trainId} className='station-time-display'>{stationLine.Line}</td>
                                <td className='station-time-display'>{stationLine.Car}</td>
                                <td className='station-time-display'>{stationLine.DestinationName}</td>
                                <td className='station-time-display'>{stationLine.Min}</td>
                            </>
                        </tr>
                    ))}
            </table>
        </Box>
        </>
    )
}

export default StationTimes;