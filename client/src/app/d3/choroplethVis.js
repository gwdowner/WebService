import * as d3 from 'd3';
import moment from 'moment';
import dataUtils from '../utils/dataUtils';

const colourFactory = (domain) => d3
    .scaleLinear().domain(domain)
    .range(['#c5fad4', '#00a32c']);

let colour = colourFactory(0, 4000);


const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function AffineTransformation(a, b, c, d, tx, ty) {
    return {
        //overrides normal D3 projection stream (to avoid adaptive sampling)
        stream: function (output) {
            return {
                point: function (x, y) { output.point(a * x + b * y + tx, c * x + d * y + ty); },
                sphere: function () { output.sphere(); },
                lineStart: function () { output.lineStart(); },
                lineEnd: function () { output.lineEnd(); },
                polygonStart: function () { output.polygonStart(); },
                polygonEnd: function () { output.polygonEnd(); }
            };
        }
    };
}

function mouseOverFactory(callback) {

    let mouseOver = function (d) {
        d3.selectAll(".county")
            .transition()
            .duration(100)
            .style("opacity", .5);
        d3.select(this)
            .transition()
            .duration(1)
            .style("opacity", 1)
            .style("stroke", "white");

        let output = callback({
            type: 'GET_OUTPUT'
        });
        
        tooltip.html(d.properties.ShortName + "<br/>" +output.toPrecision(6) + "MW")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
            .style("opacity", 1);

        let res = {
            type: 'SELECTED_COUNTY',
            payload: d.properties.GSPGroupID
        }
        callback(res);
    }

    return mouseOver
}

function mouseLeaveFactory(callback) {

    let mouseLeave = function (d) {
        d3.selectAll(".county")
            .transition()
            .duration(100)
            .style("opacity", .8);
        d3.select(this)
            .transition()
            .duration(1)
            .style("opacity", .8);

        tooltip.style("opacity", 0);

        let res = {
            type: 'SELECTED_COUNTY',
            payload: null
        }
        callback(res);

    }

    return mouseLeave;
}

async function draw(props) {
    let { mapJson, element, callback, data } = props;

    // as the map data is not in standard spherical coordinates we have to
    // implement our own projection and scaling functions
    const elementId = `#${element}`;
    const SVGwidth = parseFloat(d3.select(elementId).style('width'));
    const SVGheight = parseFloat(d3.select(elementId).style('height'));

    const path = d3.geoPath();
    const bounds = path.bounds(mapJson);

    const minx = bounds[0][0];
    const miny = bounds[0][1];
    const maxx = bounds[1][0];
    const maxy = bounds[1][1];

    const height = maxy - miny;
    const width = maxx - minx;
    const scale = 1 / Math.max(width / SVGwidth, height / SVGheight);

    const y_offset = (maxy * scale);
    const x_offset = -(minx * scale);

    let domain = d3.extent(dataUtils.getAllValues(data, false), d => d.solarMW);

    colour = colourFactory(domain);

    path.projection(AffineTransformation(scale, 0, 0, -scale, x_offset, y_offset));

    d3.select(elementId).select('svg').remove();


    let selection = d3
        .select(elementId)
        .append('svg')
        .style('width', `${SVGwidth}px`)
        .style('height', `${SVGheight}px`)
        .append('g')
        .selectAll('path')
        .data(mapJson.features);

    selection.enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'county')
        .style("opacity", .8)
        .style("stroke", "white")
        .style('fill', d => {
            return colour(data.find(x => x.region === d.properties.GSPGroupID).forecast[0]?.solarMW) ?? 'black';
        })
        .style("stroke-width", 0.5)
        .on("mouseover", mouseOverFactory(callback))
        .on("mouseleave", mouseLeaveFactory(callback));

    callback({
        type: 'REGISTER_TIME_LISTENER',
        payload: updateFactory(selection, data)
    });

};

function updateFactory(selection, data) {

    return (date, duration) => {

        selection.enter()
            .selectAll('path')
            .transition()
            .duration(duration)
            .style('fill', d => {
                let group = data.find(x => x.region === d.properties.GSPGroupID);
                let val = group.forecast.find(x => moment(new Date(x.time)).isSame(date))?.solarMW;
                return colour(val)
                    ?? 'black';
            });
    }

}

export default draw;