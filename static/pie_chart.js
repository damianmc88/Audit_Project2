// function buildCharts(sample) {
  d3.json('/json_endpoint').then(data => {
    console.log(data)
    allData = data;

    let piesData = [{
      values: allData.map(x => x.num_records_reviewed),
      labels: allData.map(x => x.request_channel),

      // d.finished_date ,
      // hovertext: otu_labels.slice(0, 10),
      // hoverinfo: 'hovertext',
      type: 'pie'
    }]
    let piesLayout = {
      height: 400,
      width: 500
    }
    Plotly.plot('pie', piesData, piesLayout)
  })
// //  **We need to initiliaze the chart with this template**
// function init() {
//   // Grab a reference to the dropdown select element
//   // var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("/json_endpoint").then((sampleNames) => {
//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }
// init();
