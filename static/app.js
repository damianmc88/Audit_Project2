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
                  return "#e84678"
                }
                else if (d.data.audit_team == "External"){
                  return "#022682"
                }
                else {
                  return "#840853"
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

});