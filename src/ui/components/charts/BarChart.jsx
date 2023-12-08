import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {toast} from "react-toastify";
import {usePersonMovieRolesByPersonIdQuery} from "../../../redux/features/api/peopleApi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
function BarChart ({ personId }) {

    const {data,isLoading,error} = usePersonMovieRolesByPersonIdQuery(personId);

    if (error) {
        toast.update("loadingBarChart", {
            render: error.data,
            type: "error",
            autoClose: true,
        })
    }

    if (isLoading) {
        return(
            <div>
                {
                    toast("Loading Bar Chart", {
                        toastId: "loadingBarChart",
                        autoClose: true,
                        type: "info",
                    })
                }
            </div>
        );
    }

    // Ensure Data is valid
    if (!data) {
        return <div>{
            toast("No data available", {
                toastId: "loadingBarChart",
                autoClose: true,
                type: "info",
            })
        }</div>;
    }

    const labels = Object.keys(data);
    //making labels better
    for(let i=0;i<labels.length;i++){
        labels[i]=labels[i].replace(/_/g, ' ')
        labels[i]=labels[i].replace(/-/g, ' ')
        labels[i]=labels[i].replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    }
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Role Count',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ height: '400px', width: '600px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
}

export  {BarChart}
