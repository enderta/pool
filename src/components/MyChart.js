import React from 'react';
import {Chart} from "react-google-charts";

const MyChart = (props) => {
    const totalVotes = props.voteopt1 + props.voteopt2 + props.voteopt3;

    const data = [
        ["Options", "Votes", {role: "style"}, {role: "annotation"}, {role: "tooltip"}],
        [props.opt1, Number( props.voteopt1), "#a91919", `${Number( props.voteopt1)} votes`, `${Number(props.pert1)}%`],
        [props.opt2, Number( props.voteopt2), "#093bde", `${Number( props.voteopt2)} votes`, `${Number(props.pert2)}%`],
        [props.opt3, Number( props.voteopt3), "#246b0e", `${Number( props.voteopt3)} votes`, `${Number(props.pert3)}%`],
    ];
    const options = {
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: {position: "none"},
        hAxis: {
            title: "Votes",

        },
        vAxis: {
            title: "Options",

        },

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