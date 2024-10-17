import "./App.css";
import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.data2);
  }

  componentDidUpdate() {
    if (this.props.data2 && this.props.data2.length > 0) {
      this.renderChart();
    }
  }

  renderChart() {
    var div = d3
      .select("body")
      .selectAll(".tooltip")
      .data([0])
      .join("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const margin = { top: 90, right: 10, bottom: 60, left: 60 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    const data = this.props.data2;

    const temp_data = d3.flatRollup(
      data,
      (v) => d3.mean(v, (d) => d.tip),
      (d) => d.day
    );
    console.log(temp_data);

    const container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Render chart using temp_data...

    const x_data = temp_data.map((item) => item[0]); // Use x for x-axis
    var x_scale = d3.scaleBand().domain(x_data).range([0, w]).padding(0.2);
    console.log(x_scale("Mon"), x_scale.bandwidth());
    const y_data = temp_data.map((item) => item[1]);
    var y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([h, 0]);
    container
      .selectAll("rect")
      .data(temp_data)
      .join("rect")
      .attr("x", (d) => x_scale(d[0]))
      .attr("width", x_scale.bandwidth())
      .attr("fill", "green")
      .attr("y", (d) => y_scale(d[1]))
      .attr("height", (d) => h - y_scale(d[1]));

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0 ,${h})`)
      .call(d3.axisBottom(x_scale));
    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .attr("transform", `translate(0, 0)`)
      .call(d3.axisLeft(y_scale));

    container
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", w - 200)
      .attr("y", h + 45)
      .text("Days");
    container
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", w - 125)
      .attr("y", h - 200)
      .text("Average Tips per days");
    container
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -45)
      .attr("dy", ".75em")
      .attr("x", -25) // Center the label vertically along the y-axis

      .attr("transform", "rotate(-90)")
      .text("Average Tips");
  }

  render() {
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
