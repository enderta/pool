import React from 'react';
import { Chart } from "react-google-charts";

const MyChart = (props) => {
    const data = [
        [
            "Options",
            "Votes",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        [props.opt1, props.voteopt1, "#a91919", null],
        [props.opt2, props.voteopt2, "#173079", null],
        [props.opt3, props.voteopt3, "#0c4d1a", null],
    ];
    const options = {
        title: "Vote Results",
        width: 600,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };
    return (
        <div>
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    );
};

export default MyChart;