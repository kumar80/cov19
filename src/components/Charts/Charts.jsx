import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Charts = (props) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();

    // eslint-disable-next-line
  }, []);

  const lineChart = () => {
    if (dailyData.length) {
      return (
        <Line
          data={{
            labels: dailyData.map((d) => d.date),
            datasets: [
              {
                data: dailyData.map((d) => d.confirmed),
                label: "Infected",
                fill: true,
                borderColor: "blue",
                pointRadius : 0

              },
              {
                data: dailyData.map((d) => d.deaths),
                label: "Deaths",
                fill: true,
                borderColor: "#f54242",
                backgroundColor: "#f56042",
                pointRadius : 0
              },
            ],
          }}
        />
      );
    } else return null;
  };
 // console.log(props)
  const barChart = ()=>{
    if (props.data.confirmed) {
      return (
        <Bar
          data={{
            labels :['Infected' , 'Recovered', 'Death'],

            datasets: [
              {
                data: [props.data.confirmed.value, props.data.recovered.value, props.data.deaths.value ],
                label: "people",
                fill: true,
                backgroundColor: ["blue", "green", "red"]
              },
            ],
          }}
          options={{
            legend:{display:false},
            title:{display:true, text:`Current state in ${props.country}`}
          }}
        />
      );
    } else return null;
  }//              

  return (
      <div className={styles.container}>
{props.country!=='global'?barChart():lineChart()}    </div> );
};

export default Charts;
