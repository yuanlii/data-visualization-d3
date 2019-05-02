### Learning notes

* create a barchart that looks like this:
![bar_chart]
(https://github.com/yuanlii/data_visualization_d3/blob/master/img/bar_chart.png)

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
* "transform" function: 
do not want the barchart to start from the same position;
translate = [barWidth * i, 0] -> the first one is the x axis (append barchart one after another); the second one is the y axis (all start from 0 level)
