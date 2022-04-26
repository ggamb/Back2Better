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

            let lineArray = [];          

            for(let [key, value] of Object.entries(lineData)) {

                let lineArrayEntry : any = value;

                lineArray.push(lineArrayEntry);
            }

            console.log(lineArray)

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
                                    Line status: {line.trainFrequencyStatus}<br/>
                                    Average train frequency: {line.averageTrainFrequency.toFixed(2)} minutes<br/>
                                    Expected train frequency: {line.expectedTrainFrequency.toFixed(2)} minutes<br/>
                                    Average wait time: {line.averagePlatformWaitTime.toFixed(2)} minutes<br/>
                                    Max delay: {toMinutes(line.maximumTrainDelay)} <br/>
                                    Time trend: {line.platformWaitTimeTrendStatus}<br/>
                                    Trains on line: {line.numTrains}<br/>
                                    </Typography>
                                </CardContent>
                            <CardActions>
                                <Button size="small"><Link to={line.lineCode}>Go to live {line.lineCode} Line</Link></Button>
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