import React, { useState } from 'react';
import {BarChart} from "../charts/BarChart";
import {PieChart} from "../charts/PieChart";
import {LineChart} from "../charts/LineChart";
import "./StatisticComponent.css";

function StatisticsComponent({ personId }) {
    const [selectedChart, setSelectedChart] = useState("pieChart");

    const handleChartChange = (event) => {
        setSelectedChart(event.target.value);
    };

    return (
        <div>
            <h1>Statistics</h1>
            <div className="person-statistic-container">
                <select onChange={handleChartChange} value={selectedChart} className="select-style">
                    <option value="pieChart">Pie Chart For Genre distribution</option>
                    <option value="lineChart">Line Chart For Popularity</option>
                    <option value="barChart">Bar Chart For Roles</option>
                    {/* Add more options as needed */}
                </select>

                {selectedChart === "pieChart" && <PieChart personId={personId} />}
                {selectedChart === "lineChart" && <LineChart personId={personId} />}
                {selectedChart === "barChart" && <BarChart personId={personId} />}
            </div>
        </div>
    );
}

export {StatisticsComponent};
