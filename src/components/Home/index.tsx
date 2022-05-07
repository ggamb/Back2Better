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

    let [metroLineData, setMetroLineData] = useState<LineInfo[]>([]);

    const apiKey = process.env.REACT_APP_METROHERO;
    

    const metroHeroMetrics = `https://dcmetrohero.com/api/v1/metrorail/metrics`;

    const requestHeaders: any = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', '*');
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
    requestHeaders.set('apiKey', apiKey);

    async function getHomeInfo() {
        try {
            let response : any = await fetch(metroHeroMetrics, {
                headers:  requestHeaders
            });

            if(!response.ok) {
                throw new Error('API failure');
            }

            let lineDataComplete : any = await response.json();

            let lineData : any = lineDataComplete.lineMetricsByLine;

            let lineArray : any[] = [];          

            for(let [key, value] of Object.entries(lineData)) {

                let lineArrayEntry : any = value;

                lineArray.push(lineArrayEntry);
            }

            //console.log(lineArray)

            setMetroLineData(lineArray);

        }  catch (err) {
            console.log(err)
        }
    }

    const toMinutes = (time : number) => {   
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;
    
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    useEffect(() => {
        getHomeInfo();
    }, []);



    return (
        <div className="card-holder">
        <>
        {
            metroLineData.length ? (
                    <>
                    {metroLineData.map(line => (
                        <>
                            <Card className="main-card" variant = 'outlined' sx = {{backgroundColor : 'wheat'}}>
                                <>
                                <CardContent>
                                        <Typography sx={{ fontSize: 30 }} className = {line.lineCode} gutterBottom>
                                            {line.lineCode}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            Line status: 
                                            {(line.trainFrequencyStatus) == 'OK' ? 
                                                ( <span> {line.trainFrequencyStatus} 😊</span>) 
                                                : 
                                                (<span> {line.trainFrequencyStatus} 😡</span>)
                                            }
                                            <br/>
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            Average wait time: {line.averagePlatformWaitTime.toFixed(2)} minutes<br/>
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            Expected train frequency: {line.expectedTrainFrequency.toFixed(2)} minutes<br/>
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            Average train frequency: {line.averageTrainFrequency.toFixed(2)} minutes<br/>
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            Max train delay: {toMinutes(line.maximumTrainDelay)} <br/>
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            Time trend:  
                                            {(line.platformWaitTimeTrendStatus === 'NEUTRAL') ? (
                                                <span> Neutral 😑</span>
                                            ) : (line.platformWaitTimeTrendStatus === 'INCREASING') ? (
                                                <span> Increasing 😡</span>
                                            ) : 
                                                <span> Decreasing 😀</span>
                                            }
                                            <br/>
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            Trains on {line.lineCode} line: {line.numTrains}<br/>
                                        </Typography>
                                    </CardContent>
                                <CardActions>
                                    <Button href={line.lineCode} variant="contained" size="small" sx = {{margin: '0 auto'}} disableElevation>Go to live {line.lineCode} Line</Button>
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
        </div>
        
    )
}

export default Home;