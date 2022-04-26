import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Home() {
    
    interface LineInfo {
        lineCode: string;
        maximumTrainDelay: number;
        averageTrainFrequency: number;
        expectedTrainFrequency: number;
        averagePlatformWaitTime: number;
        platformWaitTimeTrendStatus: string;
        numTrains: number;
        trainFrequencyStatus: string;
    }

    let [metroLineData, setMetroLineData] = useState([]);

    const apiKey = process.env.REACT_APP_METROHERO;
    

    const metroHeroMetrics = `https://dcmetrohero.com/api/v1/metrorail/metrics`;

    const requestHeaders: any = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    requestHeaders.set('apiKey', apiKey);

    async function getHomeInfo() {
        try {
            let response = await fetch(metroHeroMetrics, {
                headers:  requestHeaders
            });

            if(!response.ok) {
                throw new Error('API failure');
            }

            let lineData = await response.json();

            console.log(lineData.lineMetricsByLine);

            let lineArray  = [];
            

            for(let [key, value] of Object.entries(lineData.lineMetricsByLine)) {

                console.log(typeof(value))

                let lineArrayEntry = {
                    lineCode : value.lineCode,
                    maximumTrainDelay : value.maximumTrainDelay,
                    averageTrainFrequency : value.averageTrainFrequency,
                    expectedTrainFrequency : value.expectedTrainFrequency,
                    averagePlatformWaitTime : value.averagePlatformWaitTime,
                    platformWaitTimeTrendStatus : value.platformWaitTimeTrendStatus,
                    numTrains : value.numTrains,
                    trainFrequencyStatus : value.trainFrequencyStatus
                }

                lineArray.push(lineArrayEntry);
            }

            console.log(lineArray)

            setMetroLineData(lineArray);

        }  catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getHomeInfo();
    }, [])



    return (
        <>
        {
            metroLineData.length ? (
                    <>
                    {metroLineData.map(line => (
                        <>
                        <Card variant = 'outlined'>
                            <>
                            <CardContent>
                                <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                                {line.lineCode}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Max delay: {line.maximumTrainDelay} <br/>

                                    Average train frequency: {line.averageTrainFrequency.toFixed(2)}<br/>

                                    Expected train frequency: {line.expectedTrainFrequency.toFixed(2)}<br/>

                                    Average wait time: {line.averagePlatformWaitTime.toFixed(2)}<br/>

                                    Time trend: {line.platformWaitTimeTrendStatus}<br/>
                                    
                                    Trains on line: {line.numTrains}<br/>
                                    Line status: {line.trainFrequencyStatus}
                                    </Typography>
                                </CardContent>
                            <CardActions>
                                <Button size="small"><Link to={line.lineCode}>Go to Line</Link></Button>
                            </CardActions>
                            </>
                        </Card>
                        </>
                    ))}
                    </>
                
                
            ) : 
            (
                <h2>Loading Metro data</h2>
            )
        }
        </>
        
    )
}

export default Home;