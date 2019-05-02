## Learning notes

### 1. create a barchart 

![bar_chart](https://github.com/yuanlii/data_visualization_d3/blob/master/img/bar_chart.png)

```javascript
var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function(d) {
         return svgHeight - d 
    })
    .attr("height", function(d) { 
        return d; 
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    });
```

1. first select all rectangle objects in svg;
   if rectangle does not exist in svg, then we would append rect one by one in svg. 
   
    ```javascript
    var barChart = svg.selectAll("rect")
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
   
   * Second step is to link the rectangles to the dataset
   
    ```javascript
    var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
    ```
    
2. iterate over each data point, and append rectangle one by one

    ```javascript
    .data(dataset)
    .enter()
    .append("rect")
    ```
    
3. specify attributes of the rectangle

    ```javascript
    .attr("y", function(d) {
         return svgHeight - d 
    })
    .attr("height", function(d) { 
        return d; 
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    });
    ```

    * "transform" function: 
       since we do not want the barchart to start from the same position
       
        ```javascript
        translate = [barWidth * i, 0] 
        ```
        the first one is the x axis (append barchart one after another); 
        the second one is the y axis (all start from 0 level - horizontally)


* add labels to barchart

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

   * Text has special functions, e.g, 

    .text(function(d) {
        return d;
    })
    
   
* .css class can be embedded as attribute directly in rectangles created, using:

    ```javascript
    // barchart
    var barChart = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("y", function(d) {
             return svgHeight - d 
        })
        .attr("height", function(d) { 
            return d; 
        })
        .attr("width", barWidth - barPadding)
        // add .css class to style bar
        .attr("class", "bar")
        .attr("transform", function (d, i) {
            var translate = [barWidth * i, 0]; 
            return "translate("+ translate +")";
        });
     ```
