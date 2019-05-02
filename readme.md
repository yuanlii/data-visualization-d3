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
