var data = [
    {"platform": "Android", "percentage": 40.11}, 
    {"platform": "Windows", "percentage": 36.69},
    {"platform": "iOS", "percentage": 13.06}
];

var svgWidth = 500, svgHeight = 300, radius =  Math.min(svgWidth, svgHeight) / 2;

// first create a svg object
var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Create group element to hold pie chart    
var g = svg.append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")") ;

// create color object
var color = d3.scaleOrdinal(d3.schemeCategory10);

// create a piechart, using d3.pie()
var pie = d3.pie().value(function(d) { 
    return d.percentage; 
});

// create arcs using d3.arc()
var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

// iterate over each data point, and create an arc object
var arc = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g");

// each arc appends a path, filled by percentaged size
arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.percentage); });

// add label
var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

arc.append("text")
    .attr("transform", function(d) { 
        // make label positioned at the center
        return "translate(" + label.centroid(d) + ")"; 
    })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.data.platform+":"+d.data.percentage+"%"; });