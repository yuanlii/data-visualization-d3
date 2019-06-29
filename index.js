
var data = [[0, 50], [100, 80], [200, 40], [300, 60], [400, 30]];

// create a natual cubic spline
var lineGenerator = d3.line()
    .curve(d3.curveNatural);

var pathString = lineGenerator(data);

// should already defined a path element in svg (in the html file)
d3.select('path')
	.attr('d', pathString);