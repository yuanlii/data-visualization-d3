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
``


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


