import * as d3 from 'd3';

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

        callback(d);
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
        callback(null);
    }

    return mouseLeave;
}

function draw(props) {
    let { mapJson, element, callback } = props;
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

    path.projection(AffineTransformation(scale, 0, 0, -scale, x_offset, y_offset));

    let selection = d3
        .select(elementId)
        .append('svg')
        .style('width', SVGwidth)
        .style('height', SVGheight)
        .append('g')
        .selectAll('path')
        .data(mapJson.features);

    selection.enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'county')
        .style("opacity", .8)
        .style("stroke", "white")
        .style('fill', 'green')
        .style("stroke-width", 0.5)
        .on("mouseover", mouseOverFactory(callback))
        .on("mouseleave", mouseLeaveFactory(callback));
};

export default draw;