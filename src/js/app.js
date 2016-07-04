var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
var w = 600;
var h = 250;
var barPadding = 1;
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
var xScale = d3.scaleBand()
                .domain(d3.range(0, dataset.length))
                .range([0, w])
                .round(true)
                .paddingInner(0.05);
var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)])
                .range([0, h]);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
    return xScale(i);
    })
    .attr("y", function(d) {
     return h - yScale(d);  //Height minus data value
   })
   .attr("width", xScale.bandwidth())
   .attr("height", function(d){
     return yScale(d);
   })
   .attr("fill", function(d) {
    return "rgb(0, 0, " + (d * 10) + ")";
});

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d){
     return d;
   })
   .attr("x", function(d, i) {
       return xScale(i) + xScale.bandwidth() / 2;
   })
   .attr("y", function(d) {
        return h - yScale(d) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white")
   .attr("text-anchor", "middle");

   //On click, update with new data
d3.select("p")
    .on("click", function() {

        //New values for dataset
        dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
                    5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];

        //Update all rects
        svg.selectAll("rect")
           .data(dataset)
           .transition()
           .duration(500)
           .attr("y", function(d) {
                return h - yScale(d);
           })
           .attr("height", function(d) {
                return yScale(d);
           })
           .attr("fill", function(d) {   // <-- Down here!
             return "rgb(0, 0, " + (d * 10) + ")";
        });

        svg.selectAll("text")
           .data(dataset)
           .transition()
           .duration(500)
           .text(function(d) {
                return d;
           })
           .attr("x", function(d, i) {
                return xScale(i) + xScale.bandwidth() / 2;
           })
           .attr("y", function(d) {
                return h - yScale(d) + 14;
           });

    });
