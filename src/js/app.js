function barChart() {
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
var w = 600;
var h = 250;
var maxValue = 100;
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
var easing = d3.easeCircle;
var tDuration = 500;
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
        var numValues = dataset.length;
        dataset = [];
        for (var i = 0; i < numValues; i++) {
          var newNumber = Math.floor(Math.random() * maxValue);
          dataset.push(newNumber);
        }

        yScale.domain([0, d3.max(dataset)]);

        //Update all rects
        svg.selectAll("rect")
           .data(dataset)
           .transition()
           .delay(function(d, i) {
           return i / dataset.length * 1000;
           })
           .duration(tDuration)
           .ease(easing)
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
           .delay(function(d, i) {
           return i / dataset.length * 1000;
           })
           .duration(tDuration)
           .ease(easing)
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
}

//piechart

function pieChart() {
  var dataset = [ 5, 10, 20, 45, 6, 25 ];
  var pie = d3.pie();
  var w = 300;
  var h = 300;
  var outerRadius = w / 2;
  var innerRadius = 0;
  var color = d3.schemeCategory10;
  var arc = d3.arc()
                  .innerRadius(innerRadius)
                  .outerRadius(outerRadius);
  var svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);
  var arcs = svg.selectAll("g.arc")
          .data(pie(dataset))
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");
  arcs.append("path")
    .attr("fill", function(d, i) {
        return color[i];
    })
    .attr("d", arc);

  arcs.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
        return d.value;
    });

}
