import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import 'chartjs-plugin-datalabels'; // Import the datalabels plugin



export const TheLineChart = ({ data }) => {

  const counts = {};
  data.forEach((item) => {
    const Thedate = new Date(item.timestamp.seconds * 1000 + item.timestamp.nanoseconds / 1000000);
    const year = Thedate.getFullYear();
    const month = (Thedate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits with leading zero
    const day = Thedate.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero
    const formattedDate = `${year}-${parseInt(month)}-${parseInt(day)}`;
    counts[formattedDate] = (counts[formattedDate] || 0) + 1;
    // counts[dateKey] = (counts[dateKey] || 0) + 1;
    // console.log(`Valid dateKey: ${dateKey}`);
  });

  const labels = Object.keys(counts);
  const chartData = Object.values(counts);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartDataObject = {
    labels: labels,
    datasets: [
      {
        label: 'Inscripciones por día',
        data: chartData,
        backgroundColor: data.colors, // Customize the bar color
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Line data={chartDataObject} options={options} />
    </div>
  );
}

export const TheBarChart = ({ data }) => {

  const counts = {};
  data.forEach((item) => {
    const value = item.staff;
    counts[value] = (counts[value] || 0) + 1;
    // console.log(counts)
  });

  const labels = Object.keys(counts);
  const chartData = Object.values(counts);

  const options = {
    maintainAspectRatio: false,
    width: "17px",
    heigth: "17px",
  };

  const chartDataObject = {
    labels: labels,
    datasets: [
      {
        label: 'Distribución Iglesias',
        data: chartData,
        backgroundColor: data.colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie data={chartDataObject} options={options} />
    </div>)
  
}

export const ThePieChart = ({ data }) => {

  const counts = {};
  data.forEach((item) => {
    const value = item.iglesiaVisita;
    counts[value] = (counts[value] || 0) + 1;
    // console.log(counts)
  });

  const labels = Object.keys(counts);
  const chartData = Object.values(counts);

  const options = {
    maintainAspectRatio: false,
    width: "17px",
    heigth: "17px",
      plugins: {
        datalabels: {
          color: 'white', // Set the color of the data labels
          anchor: 'end', // Position of the data labels ('end' positions them outside the pie chart)
          align: 'start', // Alignment of the data labels
          formatter: (value, counts) => {
            // Customize the label format (e.g., value + "%")
            return value;
          },
        },
      },
    };
  
  const chartDataObject = {
    labels: labels,
    datasets: [
      {
        label: 'Distribución Iglesias',
        data: chartData,
        backgroundColor: data.colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie data={chartDataObject} options={options} />
    </div>
  );
}

export default { TheBarChart, TheLineChart, ThePieChart };