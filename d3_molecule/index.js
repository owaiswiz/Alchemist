var base = d3.select("#vis");
var chart = base.append("canvas")
  .attr("width", 400)
  .attr("height", 300);

var context = chart.node().getContext("2d");
var data = [1,2,13,20,23];

var scale = d3.scale.linear()
  .range([10, 390])
  .domain([1,23]);

data.forEach(function(d, i) {
  context.beginPath();
  context.rect(scale(d), 150, 10, 10);
  context.fillStyle="red";
  context.fill();
  context.closePath();
});