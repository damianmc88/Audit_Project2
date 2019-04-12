// svg container
var height = 500;
var width = 800;
var labelArea = 110;
var tPadBot = 20;
var tPadLeft = 20;

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


// Import data Here
d3.json('/json_endpoint').then(data => {
    // console.log(data)
    data = data.filter(function(d){
      return d.num_records_reviewed > 20
    })
    allData = {"children": data};

    var diameter = 500;
    // var color = d3.scaleOrdinal(d3.schemeCategory20);
    // var color = d3.scaleLinear()
    //               .domain([0,186])
    //               .range(["#123456","#abcdef"])

    var bubble = d3.pack(allData)
                  .size([diameter, diameter])
                  .padding(1.5); //how close the bubbles are together

    var nodes = d3.hierarchy(allData)
                  .sum(function(d) { return d.num_records_reviewed; });

    var node = svg.selectAll(".node")
                .data(bubble(nodes).descendants())
                .enter()
                .filter(function(d){
                    return  !d.children
    })
                .append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
    });
    
    node.append("title")
        .text(function(d) {
            return d.audit_id + ": " + d.num_records_reviewed;
    });
    
    node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                if (d.data.audit_team =="Internal"){
                  return "#f18491"
                }
                else if (d.data.audit_team == "External"){
                  return "#1e3cd6"
                }
                else {
                  return "f9f1e0"
                }

              // console.log(d.data.audit_team)
              //   return "#1e3cd6";
            });
    
    node.append("text")
          .attr("dy", ".2em")
          .attr("pointer-events", "none") //keeps the text from doing anything on mouseover
          .style("text-anchor", "middle")
          .text(function(d) {
              // console.log(d)
              return d.data.audit_id
    })
          .attr("font-family", "sans-serif")
          .attr("font-size", function(d){
              return d.r/5;
    })
          .attr("fill", "white");

    node.append("text")
          .attr("dy", "1.3em")
          .attr("pointer-events", "none")
          .style("text-anchor", "middle")
          .text(function(d) {
              return d.data.num_records_reviewed;
    })
          .attr("font-family",  "Gill Sans", "Gill Sans MT")
          .attr("font-size", function(d){
              return d.r/5;
    })
          .attr("fill", "white");

    d3.select(self.frameElement)
    .style("height", diameter + "px");

  
    
    // console.log(bubble(nodes).descendants())
// var yAxis1 = allData.map(function(d) {
//     d.num_records_reviewed = +d.num_records_reviewed
//     console.log('hellloooo')
     
// })

// svg.append("g").attr("class", "xAxisText");
// var xAxisText = d3.select(".xAxisText");

// function xAxisTextRefresh() {
//   xAxisText.attr(
//     "transform",
//     "translate(" +
//       ((width - labelArea) / 2 + labelArea) +
//       ", " +
//       (height - margin - tPadBot) +
//       ")"
//   );
// }
// xAxisTextRefresh();

// xAxisText
//   .append("text")
//   .attr("y", yAxis1)
//   .attr("data-name", "audits")
//   .attr("data-axis", "x")
//   .attr("class", "aText active x")
//   .text("Total Reviews");

// var leftTextX = margin + tPadLeft;
// var leftTextY = (height + labelArea) / 2 - labelArea;


// var xAxis = allData.forEach(function(d) {
//     d.received_date
// })

// svg.append("g").attr("class", "yAxisText");

// var yAxisText = d3.select(".yAxisText");

// function yTextRefresh() {
//   yAxisText.attr(
//     "transform",
//     "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
//   );
// }
// yTextRefresh();

// yAxisText
//   .append("text")
//   .attr("y", -26)
//   .attr("data-name", "date")
//   .attr("data-axis", "y")
//   .attr("class", "aText active y")
//   .text("Date");

//   d3.json('/json_endpoint').then(data => {
//     visualize(data);
//   });

//   function visualize(theData) {
//     var currentX = "audits";
//     var currentY = "date";
//     var xMin;
//     var xMax;
//     var yMin;
//     var yMax;

//     // forEach function to call individual parts of the json
//     // healthData.forEach(function(d){
//         // d.heatlcare = +d.healthcare;
//     // })

//     var toolTip = d3.tooltip()
//     .attr("class", "d3-tip")
//     .offset([40, -60])
//     .html(function(d) {
//       console.log(d)
//       var theX;
//       var theState = "<div>" + d.state + "</div>";
//       var theY = "<div>" + currentY + ": " + d[currentY] + "%</div>";
//       if (currentX === "poverty") {
//         theX = "<div>" + currentX + ": " + d[currentX] + "%</div>";
//       }
//       else {
//           currentX +
//           ": " +
//           parseFloat(d[currentX]).toLocaleString("en") +
//           "</div>";
//       }
//       return theState + theX + theY;
//     });
//   svg.call(toolTip);

//   function xMinMax() {
//     xMin = d3.min(theData, function(d) {
//       return parseFloat(d[currentX]) * 0.90;
//     });
//     xMax = d3.max(theData, function(d) {
//       return parseFloat(d[currentX]) * 1.10;
//     });
//   }

//   function yMinMax() {
//     yMin = d3.min(theData, function(d) {
//       return parseFloat(d[currentY]) * 0.90;
//     });
//     yMax = d3.max(theData, function(d) {
//       return parseFloat(d[currentY]) * 1.10;
//     });
//   }

// //   function labelChange(axis, clickedText) {
// //     d3.selectAll(".aText")
// //       .filter("." + axis)
// //       .filter(".active")
// //       .classed("active", false)
// //       .classed("inactive", true);

// xMinMax();
// yMinMax();


// //clickedText.classed("inactive", false).classed("active", true);
  
// var xScale = d3
//     .scaleLinear()
//     .domain([xMin, xMax])
//     .range([margin + labelArea, width - margin]);
//   var yScale = d3
//     .scaleLinear()
//     .domain([yMin, yMax])
//     .range([height - margin - labelArea, margin]);

//   var xAxis = d3.axisBottom(xScale);
//   var yAxis = d3.axisLeft(yScale);

//   function tickCount() {
//     if (width <= 500) {
//       xAxis.ticks(5);
//       yAxis.ticks(5);
//     }
//     else {
//       xAxis.ticks(10);
//       yAxis.ticks(10);
//     }
//   }
//   tickCount();

//   svg
//     .append("g")
//     .call(xAxis)
//     .attr("class", "xAxis")
//     .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
//   svg
//     .append("g")
//     .call(yAxis)
//     .attr("class", "yAxis")
//     .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

//   }  
});