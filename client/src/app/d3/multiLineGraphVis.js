import * as d3 from 'd3';
import dataUtils from '../utils/dataUtils';

const getX = (dates, width, margin) => {
    return d3.scaleUtc()
        .domain(d3.extent(dates, d => new Date(d)))
        .range([margin.left, width - margin.right])
};

const getY = (data, height, margin) => d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max(d.forecast, i => i.solarMW))]).nice()
    .range([height - margin.bottom, margin.top]);


function mouseOverFactory(callback) {
    let mouseOver =function(d){
        d3.selectAll(".graphRegion")
            .transition()
            .duration(100)
            .style("opacity", 0.3);
        d3.select(this)
            .transition()
            .duration(1)
            .style("opacity", 1);
        
        let res = {
            type: 'SELECTED_COUNTY',
            payload: d.region
        }
        callback(res);

    };

    return mouseOver;
}

function mouseLeaveFactory(callback) {
    let mouseLeave = function(d) {
        d3.selectAll(".graphRegion")
            .transition()
            .duration(100)
            .style("opacity", .8);
        d3.select(this)
            .transition()
            .duration(1)
            .style("opacity", .8);

        let res = {
            type: 'SELECTED_COUNTY',
            payload: null
        }

        callback(res);
    };

    return mouseLeave;
}

async function draw(props) {

    let { element, callback, data } = props;

    // as the map data is not in standard spherical coordinates we have to
    // implement our own projection and scaling functions
    const elementId = `#${element}`;
    const SVGwidth = parseFloat(d3.select(elementId).style('width'));
    const SVGheight = parseFloat(d3.select(elementId).style('height'));
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };
    const dates = dataUtils.getDateRange(data);
    const yLabel = 'Total output in MW';

    let x = getX(dates, SVGwidth, margin);
    let y = getY(data, SVGheight, margin);
   
    let line = d3.line()
        .defined(d => { return !isNaN(d.solarMW) })
        .x((d, i) => x(new Date(dates[i])))
        .y(d => {
            return y(d.solarMW);
        });

    let xAxis = g => g
        .attr("transform", `translate(0,${SVGheight - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(SVGwidth / 80).tickSizeOuter(0));

    let yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(yLabel));

    d3.select(elementId).select('svg').remove();
    const svg = d3.select(elementId).append('svg')
        .attr("viewBox", [0, 0, SVGwidth, SVGheight])
        .style("overflow", "visible");

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .selectAll("path")
        .data(data)
        .join("path")
        .attr("d", d => line(d.forecast))
        .attr('class', 'graphRegion')
       
        .attr('stroke', '#ffffff')
        .style("stroke-width", 5)
        .style("opacity", .8)
        .on("mouseover", mouseOverFactory(callback))
        .on("mouseleave", mouseLeaveFactory(callback));;

}

export default draw;