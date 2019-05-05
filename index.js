var svgWidth = 600, svgHeight = 500;
var svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "svg-container");

// append a line to svg
// for line, we need to specify x1,y1, x2,y2 for the positions of the line
// if it's horizontal line, y ticks remain the same; if vertical line, x ticks remain the same, and y ticks vary
var line = svg.append("line")
    .attr("x1", 100)
    .attr("x2", 500)
    .attr("y1", 50)
    .attr("y2", 50)
    // set the color of the line, using "stroke"
    .attr("stroke", "red")
    // set the width of the line, using "stroke-width"
    .attr("stroke-width", 5);

// append a rect to svg
var rect = svg.append("rect")
    // specify where to start drawing the rectangle
    .attr("x", 100)
    .attr("y", 100)
    // specify width and height of the rectangle
    .attr("width", 200)
    .attr("height", 100)
    // specify fill color
    .attr("fill", "#9B95FF");

// append a circle to svg
var circle = svg.append("circle")
    // set coordinates of the circle
    .attr("cx", 200)
    .attr("cy", 300)
    // set radius
    .attr("r", 80)
    .attr("fill", "#7CE8D5"); 
    