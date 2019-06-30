d3.selectAll('g.item')
  .append('text')
// add text to each g.item
  .text(function(d, i) {
    return i + 1;
  })
//   specify the position of the item
  	.attr('y', 50)
	.attr('x', 30);