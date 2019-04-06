var body = d3.select('body')

// Pie Chart
var w = 960
var h = 500
var r = Math.min(w,h)/2
var color = d3.scale.category20()

var pie = d3.layout.pie()
  .value(function (d) { return d.Apples })
  .sort(null)

var arc = d3.svg.arc()
  .innerRadius(r - 100)
  .outerRadius(r - 20)

var svg = d3.select('body')
  .append('svg')
    .attr('width',w)
    .attr('height',h)
  .append('g')
    .attr('transform','translate(' + w/2 + ',' + h/2 + ')')

d3.csv('data.csv', type, function (error,data) {
  // Form
	body.append('form')
  .selectAll('label')
  .data(d3.keys(data[0])).enter()
  .append('label')
    .text(function (d) { return d;})
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value',function (d) { return d; })
    .text(function (d) { return d; })

  d3.select('input[value="Apples"]').property('checked',true) // check the apples radio button

  // Pie Chart
  var path = svg.datum(data)
    .selectAll('path')
      .data(pie).enter()
    .append('path')
      .attr('fill', function (d,i) { return color(i); })
      .attr('d', arc);

  d3.selectAll('input')
    .on('change',change);

  function change() {
  	var value = this.value;
  	pie.value(function (d) { return d[value]; });
  	path = path.data(pie)
  	path.attr('d', arc)
  }
})

function type(d) {
	for (var i in d) {
		d[i] = +d[i]
	}
	return d;
}
