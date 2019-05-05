
var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

var svgWidth = 500, svgHeight = 300;

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// add scale to x    
var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgWidth]);

// adding scale to y    
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    // note: the order changes to make sure the value is increasing from the bottom level
    .range([svgHeight - 30,0]);

// add x axis using axisBottom()
var x_axis = d3.axisBottom()
    .scale(xScale);

// add y axis using axisLeft()
var y_axis = d3.axisLeft()
    .scale(yScale);

// append group to svg element
svg.append("g")
    .attr("transform", "translate(50, 10)")
    .call(y_axis);

var xAxisTranslate = svgHeight - 20;

svg.append("g")
    .attr("transform", "translate(50, " + xAxisTranslate  +")")
    .call(x_axis);





