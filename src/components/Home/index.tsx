import { useEffect, useState } from "react";

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
        let response = await fetch(metroHeroMetrics, {
            headers:  requestHeaders
        });

        let lineData = await response.json();

        console.log(lineData.lineMetricsByLine);

        let lineArray  = []

        for(let [key, value] of Object.entries(lineData.lineMetricsByLine)) {

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
    }

    useEffect(() => {
        getHomeInfo();
    }, [])



    return (
        <>
        {
            metroLineData.length ? (
                
                <div>
                    {metroLineData.map(line => (
                        <div>{line.lineCode}</div>
                    ))}
                </div>
                
            ) : 
            (
                <h2>Loading Metro data</h2>
            )
        }
        </>
        
    )
}

export default Home;