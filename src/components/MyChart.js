import React from 'react';
import {Chart} from "react-google-charts";

const MyChart = (props) => {
    const totalVotes = props.voteopt1 + props.voteopt2 + props.voteopt3;

    const data = [
        ["Options", "Votes", {role: "style"}, {role: "annotation"}, {role: "tooltip"}],
        [props.opt1, props.voteopt1, "#a91919", `${props.voteopt1} votes`, `${props.pert1}%`],
        [props.opt2, props.voteopt2, "#173079", `${props.voteopt2} votes`, `${props.pert2}%`],
        [props.opt3, props.voteopt3, "#0c4d1a", `${props.voteopt3} votes`, `${props.pert3}%`],
    ];
    const options = {
        title: "Vote Results",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: {position: "none"},
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