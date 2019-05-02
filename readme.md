### Learning notes

* "transform" function: 
do not want the barchart to start from the same position,
so using transform function can help us achieve that
translate = [barWidth * i, 0] -> the first one is the x axis (append barchart one after another); the second one is the y axis (all start from 0 level)


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
