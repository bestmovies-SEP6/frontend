import React from 'react';
import {Line} from 'react-chartjs-2';
import {toast} from 'react-toastify';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {usePersonMovePopularityByPersonIdQuery} from "../../../redux/features/api/peopleApi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function LineChart({personId}) {
    const {data: apiData, isLoading, error} = usePersonMovePopularityByPersonIdQuery(personId);

    if (error) {
        toast.update("loadingLinegraph", {
            render: error.data || "An error occurred",
            type: "error",
            autoClose: true,
        });
        return <div>Error loading data.</div>;
    }

    if (isLoading) {
        return (
            <div>
                {toast("Loading Line graph", {
                    toastId: "loadingLinegraph",
                    autoClose: true,
                    type: "info",
                })}
            </div>
        );
    }

    // Check if apiData is defined
    if (!apiData) {
        return (
            <div>
                {toast("No data available", {
                    toastId: "loadingLineGraph",
                    autoClose: true,
                    type: "info",
                })}
            </div>
        );
    }
    // Sort the data by release date
    const sortedData = apiData ? [...apiData].sort((a, b) => new Date(a.release_date) - new Date(b.release_date)) : [];

    const labels = sortedData.map(item => item.release_date);
    const dataPoints = sortedData.map(item => item.popularity_scores);


    const data = {
        labels,
        datasets: [
            {
                label: 'Movie Popularity Scores',
                data: dataPoints,
                fill: true,
                borderColor: 'rgb(53, 162, 235)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Popularity Score'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Release Date'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        // Get the index of the hovered item
                        const index = tooltipItems[0].dataIndex;
                        // Return the movie title for that index
                        return sortedData[index].movie_title;
                    },
                    label: function (tooltipItem) {
                        return `Popularity: ${tooltipItem.formattedValue}`;
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Line datasetIdKey="role" data={data} options={options}/>
    );

}

export {LineChart}
