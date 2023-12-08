import React from 'react';
import {Pie} from 'react-chartjs-2';
import {usePersonMovieGenreVariantsByPersonIdQuery} from "../../../redux/features/api/peopleApi";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    Title,
    PieController
} from 'chart.js';
import {toast} from "react-toastify";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    Title,
    PieController
);


function PieChart({personId}) {

    const {data: pieChartData, isLoading, error} = usePersonMovieGenreVariantsByPersonIdQuery(personId);

    if (error) {
        toast.update("loadingPieChart", {
            render: error.data,
            type: "error",
            autoClose: true,
        })
    }

    if (isLoading) {
        return (
            <div>
                {
                    toast("Loading Pie Chart", {
                        toastId: "loadingPieChart",
                        autoClose: true,
                        type: "info",
                    })
                }
            </div>
        );
    }

    // Ensure pieChartData is valid
    if (!pieChartData) {
        return(
            <div>
                {toast("No data available", {
                toastId: "loadingBarChart",
                autoClose: true,
                type: "info",
            })
        }</div>);
    }
    const labels = Object.keys(pieChartData);
    const values = Object.values(pieChartData);

    const pieChart_Data = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: [ // Add as many colors as you have data points
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(203,194,105,0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(111,67,199,0.6)',
                    'rgba(126,171,77,0.6)',
                    'rgba(179,54,197,0.6)',
                ],
                borderWidth: 1
            }
        ]
    }
    // noinspection JSValidateTypes
    return (
        <Pie
            datasetIdKey={"role"}
            data={pieChart_Data}
        />
    );
}

export {PieChart};
