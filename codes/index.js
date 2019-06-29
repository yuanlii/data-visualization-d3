function positionRects(d, i) {
	return i * 40;
  }

function update() {
	d3.selectAll('rect')
		.attr('x', positionRects
		);
}