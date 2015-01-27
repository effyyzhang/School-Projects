var cWidth = 720,
    cHeight = 720,
    cOuterRadius = Math.min(cWidth, cHeight) / 2 - 10,
    cInnerRadius = cOuterRadius - 24;

var formatPercent = d3.format(".1%");

var arc = d3.svg.arc()
    .innerRadius(cInnerRadius)
    .outerRadius(cOuterRadius);

var layout = d3.layout.chord()
    .padding(.04)
    .sortSubgroups(d3.descending)
    .sortChords(d3.ascending);

var path = d3.svg.chord()
    .radius(cInnerRadius);

var svgChord = d3.select("#chart_2").append("svg")
    .attr("width", cWidth)
    .attr("height", cHeight)
  .append("g")
    .attr("id", "circle")
    .attr("transform", "translate(" + cWidth / 2 + "," + cHeight / 2 + ")");

svgChord.append("circle")
    .attr("r", cOuterRadius)
    .attr("fill","#032139");

d3.csv("static/departments.csv", function(cities) {
  d3.json("static/academic_department_chord.json", function(matrix) {

    // Compute the chord layout.
    layout.matrix(matrix);

    // Add a group per neighborhood.
    var group = svgChord.selectAll(".group")
        .data(layout.groups)
      .enter().append("g")
        .attr("class", "group")
        .on("mouseover", mouseover);

    // Add a mouseover title.
    group.append("title").text(function(d, i) {
      return cities[i].name + ": " + Math.round(d.value) + " collaborations";
    });

    // Add the group arc.
    var groupPath = group.append("path")
        .attr("id", function(d, i) { return "group" + i; })
        .attr("d", arc)
        .style("fill", function(d, i) { 
          return cities[i].color; 

        });

    // Add a text label.
    var groupText = group.append("text")
        .attr("x", 6)
        .attr("dy", 15);

    groupText.append("textPath")
        .attr("xlink:href", function(d, i) { return "#group" + i; })
        .text(function(d, i) { return cities[i].name; });

    // Remove the labels that don't fit. :(
    groupText.filter(function(d, i) { return groupPath[0][i].getTotalLength() / 2 - 16 < this.getComputedTextLength(); })
        .remove();

    // Add the chords.
    var chord = svgChord.selectAll(".chord")
        .data(layout.chords)
      .enter().append("path")
        .attr("class", "chord")
        .style("fill", function(d) { return cities[d.source.index].color; })
        .attr("d", path);

    // Add an elaborate mouseover title for each chord.
    chord.append("title").text(function(d) {
      return cities[d.source.index].name
          + "\n" + cities[d.target.index].name
          + "\n" + Math.round(d.source.value)
          + " coauthored articles";
    });

    function mouseover(d, i) {
      chord.classed("fade", function(p) {
        return p.source.index != i
            && p.target.index != i;
      });
    }
  });
});