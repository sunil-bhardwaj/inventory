import {React,useEffect} from "react";
import {useSelector,useDispatch} from 'react-redux'
import { Doughnut, Line, Radar } from "react-chartjs-2";
import './Dashboard.css'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  } from "chart.js";
import { Bar } from "react-chartjs-2";
import { inventoryActions } from "../_actions";
import ChartDataLabels from "chartjs-plugin-datalabels";
function DashBoard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(inventoryActions.getBarChartData());
    dispatch(inventoryActions.getBarChartData2());
  }, []);

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    ArcElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
  );
  const labels = [];
  const chartData = useSelector((state) => state.inventoryData.chartdata);
  const chartData2 = useSelector((state) => state.inventoryData.chartdata2);
  chartData.map((item) => {
    labels.push(item.itemname);
  });

  const options = {
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          barPercentage:0.9,
          barThickness: 10, // number (pixels) or 'flex'
          maxBarThickness: 20, // number (pixels)
        },
      ],
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "Inventory Bar Chart",
      },
      datalabels: {
        display: true,
        color: "green",
        fontSize: "14px",
      },
    },
  };

  /* barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2, */
  const data = {
    labels,
    datasets: [
      
      {
        label: "InStore",
        data: chartData2.map((item) => item.itemcount),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Alloted",
        data: chartData.map((item) => item.itemcount),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const data2 = {
    labels: chartData.map((item) => {
      return item.itemname;
    }),
    datasets: [
      {
        label: "# of Share",
        data: chartData.map((item) => item.itemcount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='container'>
      <div className='row' style={{ display: "flex", padding: "2% 2% 2% 2%" }}>
        <div className='col-6'>
          <Bar options={options} data={data} />
        </div>
        <div className='col-6'>
          <Doughnut options={options} data={data2} />
        </div>
      </div>
      <div className='row' style={{ display: "flex", padding: "2% 2% 2% 2%" }}>
        <div className='col-6'>
          <Line options={options} data={data} />
        </div>
        <div className='col-6'>
          <Radar  options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
