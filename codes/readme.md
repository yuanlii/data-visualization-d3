## Learning notes

### 1. create a barchart 

![bar_chart](https://github.com/yuanlii/data_visualization_d3/blob/master/img/bar_chart.png)

```javascript
// first select all rectangles existing in svg; if not exist any, would get an empty selection
var barChart = svg.selectAll("rect")
    // link selection to dataset
    .data(dataset)
    // get data from dataset iteratively, and append rectangle one by one
    .enter()
    .append("rect")
    // set attributes of rectangle
    .attr("y", function(d) {
         return svgHeight - d 
    })
    .attr("height", function(d) { 
        return d; 
    })
    .attr("width", barWidth - barPadding)
    // add pre-defined css class to style bar (.css class can be embedded as attribute directly)
    .attr("class", "bar")
    // keypoint: since we do not want the barchart to start from the same position, so we need to specify different positions for each bar manually
        the second one is the y axis (all start from 0 level - horizontally)
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    });
```
    
   * need to initialize an svg object in html file first, using 
   
   ```html
   <body>
        <h1>First heading</h1>
        <svg class = "bar-chart"></svg>
        
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <script src="index.js"></script>
    </body>
   ```
   
   * before creating barchart, need to have a dataset defined as:
   
    ```javascript
    var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
    ```

   * "transform" function: 
      since we do not want the barchart to start from the same position
       
        ```javascript
        translate = [barWidth * i, 0] 
        ```
        the first one is the x axis (append barchart one after another); 
        the second one is the y axis (all start from 0 level - horizontally)
        
#### Add Labels 
Second, after we created the barcharts, we can add labels to barchart.
code example: 

```javascript
var text = svg.selectAll("text")
.data(dataset)
.enter()
.append("text")
// different from rectangle, we can use ".text" to handle text data 
.text(function(d) {
    return d;
})
.attr("y", function(d, i) {
    return svgHeight - d - 2;
})
.attr("x", function(d, i) {
    return barWidth * i;
})
// can add "fill" attribute directly
.attr("fill", "#A64C38");
```

after the previous steps, our barchart now looks like this:
![barchart2](https://github.com/yuanlii/data_visualization_d3/blob/master/img/barchart2.png)


what if our data scale is much smaller? e.g., 

```javascript
// var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
var dataset = [1,2,3,4,5];
```


#### Scale
So we would need to use "Scale" function.

```javascript
// adding scale to y    
var yScale = d3.scaleLinear()
    // get the actual range from the dataset
    .domain([0, d3.max(dataset)])
    // scale actual data range to the svg height
    .range([0, svgHeight]);
```
``` javascript
// barchart
var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    // keypoint: change return svgHeight - d => return svgHeight - yScale(d) 
    .attr("y", function(d) {
         return svgHeight - yScale(d) 
    })
    // change: return d => return yScale(d) => original d from dataset needs all to be scaled
    .attr("height", function(d) { 
        return yScale(d); 
    })
    .attr("width", barWidth - barPadding)
    .attr("class", "bar")
    .attr("transform", function (d, i) {
        var tran
```

Current barchart looks like:

![barchar_scaled](https://github.com/yuanlii/data_visualization_d3/blob/master/img/barchart_scaled.png)

Style settings in index.css:

```css
.bar {
    fill: #E1C340; 
}
```


### 2. Create Axes
![Axes](https://github.com/yuanlii/data_visualization_d3/blob/master/img/axes.png)

complete codes:

``` javascript
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
    // here, 50 -> horizontal_position; 10 -> vertical_position
    .attr("transform", "translate(50, 10)")
    .call(y_axis);

// keypoint here
// to be more general, in order to connect X axis to Y axis, horizontal position should be the same,  which decides the horizontal position of axis; yet vertical_position, should follow: diff(vertical_position of X axis, length of Y axis) = vertical position of Y axis. 
var xAxisTranslate = svgHeight - 20;

svg.append("g")
    .attr("transform", "translate(50, " + xAxisTranslate  +")")
    .call(x_axis);
```

.attr("transform", "translate(XX,XX)" is used to set the position of the shape, you may think of a brush, and such setting decides where you should lay your pen. Explanations show below.

![axes expla.](https://github.com/yuanlii/data_visualization_d3/blob/master/img/axes_explanation.png)

To sum up, in order to connect X axis to Y axis, difference between _(vertical position of X axis)_ and the _(length of Y axis)_ should be the value of vertical position of Y axis (in this example, it's 10)

```javascript
attr("transform","translate(horizontal_position,vertical_position)") 
```

### 3. Create SVG elements
Learn how to create elements such as line, rectangle, circle in svg.
complete codes:

```javascript
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
```
other style specification in index.css:

```css
.svg-container {
    background-color: #FFC988;
    }
```

the output looks like below.

![svg elements](https://github.com/yuanlii/data_visualization_d3/blob/master/img/svg_elems.png)

### 4. Create a piechart

complete code:

```javascript
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
```

outcome looks like:

![piechart](https://github.com/yuanlii/data_visualization_d3/blob/master/img/pie_chart.png)


### 5. Create a line chart
[tutorial](https://scrimba.com/p/pb4WsX/cwmGZCw)

complete codes:
```javascript
//API to fetch historical data of Bitcoin Price Index
const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';

/**
 * Loading data from API when DOM Content has been loaded'.
 */
document.addEventListener("DOMContentLoaded", function(event) {
fetch(api)
    .then(function(response) { return response.json(); })
    .then(function(data) {
        var parsedData = parseData(data);
        drawChart(parsedData);
    })
    .catch(function(err) { console.log(err); })
});

/**
 * Parse data into key-value pairs
 * @param {object} data Object containing historical data of API
 */
function parseData(data) {
    var arr = [];
    for (var i in data.bpi) {
        arr.push({
            date: new Date(i), //date
            value: +data.bpi[i] //convert string to number
        });
    }
    return arr;
}

/**
 * Creates a chart using D3
 * @param {object} data Object containing historical data of API
 */
function drawChart(data) {
var svgWidth = 600, svgHeight = 400;
// can define values first, the used later
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x-axis is a time-series axis, using d3.scaleTime()
var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date)})
    .y(function(d) { return y(d.value)})
    x.domain(d3.extent(data, function(d) { return d.date }));
    y.domain(d3.extent(data, function(d) { return d.value }));

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}
```
outcome looks like:

![timeseries chart](https://github.com/yuanlii/data_visualization_d3/blob/master/img/timeseries_chart.png)


### More Learning

* create an axis

![axis](https://github.com/yuanlii/data_visualization_d3/blob/master/img/axes_2.png)

``` javascript
// domain - lists the actual range of data to display; range - controls the actual width of axis 
var scale = d3.scaleLinear().domain([0, 1000]).range([0, 1000]);

var axis = d3.axisBottom().scale(scale);

d3.select('.axis')
    .call(axis);
``` 

* create an axis with special formatting

```javascript
var scale = d3.scaleLinear().domain([0, 1000000]).range([0, 600]);
// can define a variable of special format of tick labels 
var format = d3.format(",");

// axisTop specifies the tick labels be positioned above the axis
var axis = d3.axisTop().scale(scale)
    .tickFormat(function(d) {
        return '£' + format(d);
    })
    // specify the number of tick labels of the axis
    .ticks(5);

// finally, to evoke the commands defined 
d3.select('.axis')
    .call(axis);
```

* create a line chart 

![linechart](https://github.com/yuanlii/data_visualization_d3/blob/master/img/linechart.png)

```javascript
// data is an array of co-ordinates
var data = [[0, 50], [100, 80], [200, 40], [300, 60], [400, 30]];

// construct a line generator:
// a function that accepts an array of co-ordinates and outputs a path data string.
var lineGenerator = d3.line();

var pathString = lineGenerator(data);
// pathString is "M0,80L100,100L200,30L300,50L400,40L500,80"

// create a path element
d3.select('path')
    // set the attribute of path elem to the pathString
	.attr('d', pathString);
```

Notice that in html should have setting accordingly.

```html
<html>
    <head>
        <link rel="stylesheet" href="index.css">
        <title>Learn D3.js</title>
    </head>
    <body>
        <!-- specify the width and height of the svg -->
        <svg width="700" height="1000">
            <!-- using the path style defined in css -->
            <path class = path transform="translate(50, 50)" />
        </svg>
        
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <script src="index.js"></script>
    </body>
</html>
```
also, with css setting:
```css
.path {
    fill: none;
    stroke: #aaa;
    }
```

* create a natural cubic spline
![cubic spline](https://github.com/yuanlii/data_visualization_d3/blob/master/img/natual_cubic_spline.png)

```javascript
var data = [[0, 50], [100, 80], [200, 40], [300, 60], [400, 30]];

// create a natual cubic spline
var lineGenerator = d3.line()
    .curve(d3.curveNatural);

var pathString = lineGenerator(data);

// should already defined a path element in svg (in the html file)
d3.select('path')
	.attr('d', pathString);
```
