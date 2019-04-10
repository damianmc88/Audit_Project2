// svg container
var height = 500;
var width = 800;

// margins
var margin = {
  top: 40,
  right: 40,
  bottom: 60,
  left: 60
};

// chart area minus margins
var chartHeight = height - margin.top - margin.bottom;
var chartWidth = width - margin.left - margin.right;

// create svg container
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .attr("class", "chart");

// shift everything over by the margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var circleRadius;
function circleGet() {
    // to do: make circle radius a function based on 
    // circle data defined below in the chart calls
}

// Import data Here
d3.json('/json_endpoint').then(data => {
    console.log(data)
    allData = data;



var yAxis1 = allData.map(function(d) {
    d.num_records_reviewed = +d.num_records_reviewed
    console.log('hellloooo')
    return 
})

svg.append("g").attr("class", "xAxisText");
var xAxisText = d3.select(".xAxisText");

function xAxisTextRefresh() {
  xAxisText.attr(
    "transform",
    "translate(" +
      ((width - labelArea) / 2 + labelArea) +
      ", " +
      (height - margin - tPadBot) +
      ")"
  );
}
xAxisTextRefresh();

xAxisText
  .append("text")
  .attr("y", yAxis1)
  .attr("data-name", "audits")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("Total Reviews");

var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;


var xAxis1 = allData.forEach(function(d) {
    d.received_date
})

svg.append("g").attr("class", "yAxisText");

var yAxisText = d3.select(".yAxisText");

function yTextRefresh() {
  yAxisText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );
}
yTextRefresh();

yAxisText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "date")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Date");






    // forEach function to call individual parts of the json
    // healthData.forEach(function(d){
        // d.heatlcare = +d.healthcare;
    // })

 })
