
function update() {
	d3.selectAll('rect')
		.attr('x', function(d, i) {
			return i * 40;
		});
}