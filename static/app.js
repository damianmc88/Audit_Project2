// // svg container
// var height = 500;
// var width = 800;
// var labelArea = 110;
// var tPadBot = 20;
// var tPadLeft = 20;

// // margins
// var margin = {
//   top: 40,
//   right: 40,
//   bottom: 60,
//   left: 60
// };

// // chart area minus margins
// var chartHeight = height - margin.top - margin.bottom;
// var chartWidth = width - margin.left - margin.right;


function makeResponsive() {

  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // SVG wrapper dimensions are determined by the current width
  // and height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;



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
                    return  !d.children})
                .append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
    });

  //Initialize Tooltip
  var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .html(function(d) {
    return (`<p>"Audit Type: " ${d.data.audit_type}<p><hr><p>"Requesting Team: " ${d.data.request_channel}<p><hr><p>"Records: " ${d.data.num_records_reviewed}<p>`);
  });

//Create the tooltip in node.
node.call(toolTip);

// // Step 3: Create "mouseover" event listener to display tooltip
// node.on("mouseover", function(d) {
//   toolTip.show(d, this);
// })
// // Step 4: Create "mouseout" event listener to hide tooltip
//   .on("mouseout", function(d) {
//     toolTip.hide(d);
//   });

    
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
                  return "#e84678"
                }
                else if (d.data.audit_team == "External"){
                  return "#022682"
                }
                else {
                  return "#840853"
                }
              })
              // console.log(d.data.audit_team)
              //   return "#1e3cd6";
            .on("mouseenter",function(d, i){
              toolTip.show(d, this);
            })
            // Step 4: Create "mouseout" event listener to hide tooltip
              .on("mouseout", function(d) {
                toolTip.hide(d);
              // console.log(d.data.audit_id) 
          });
          // .on('mouseover', tip.show)
          // .on('mouseout', tip.hide);
    
    node.append("text")
          .attr("dy", ".2em")
          .attr("pointer-events", "none") //keeps the text from doing anything on mouseover
          .style("text-anchor", "middle")
          .text(function(d) {
              // console.log(d)
              return 'Audit ID: ' + d.data.audit_id
    })
          .attr("font-family", "Avenir")
          .attr("font-size", function(d){
              return d.r/5;
    })
          .attr("fill", "#f9f1e0");

    node.append("text")
          .attr("dy", "1.3em")
          .attr("pointer-events", "none")
          .style("text-anchor", "middle")
          .text(function(d) {
              return "Num Records: " + d.data.num_records_reviewed;
    })
          .attr("font-family",  "Avenir")
          .attr("font-size", function(d){
              return d.r/5;
    })
          .attr("fill", "#f9f1e0");

    d3.select(self.frameElement)
    .style("height", diameter + "px");

});
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);