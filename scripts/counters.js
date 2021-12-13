let stepsCounter = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

let pointsCounter = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

let buildStepsCounter = () => {
  let text = stepsCounter.selectAll("text").data(values);
  text
    .enter()
    .append("text")
    .text((d) => d.steps)
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0, 25)")
    .attr("font-size", 25)
    .attr("font-weight", 550)
    .attr("fill", "#00005a")
    .transition()
    .duration(2000)
    .tween("text", (d) => counterTween(d.steps));
};

let buildPointsCounter = () => {
  let hPoints = Math.floor(values[0].steps / 100) + 10;
  let text = pointsCounter.selectAll("text").data([hPoints]);

  text
    .enter()
    .append("text")
    .text((d) => d)
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0, 0)")
    .attr("font-size", 65)
    .attr("font-weight", 500)
    .attr("fill", "#00b359")
    .transition()
    .duration(2500)
    .tween("text", (d) => counterTween(d));
};

let counterTween = (d) => {
  let i = d3.interpolateNumber(0, d);

  return function (t) {
    d = i(t);
    d3.select(this).text(Math.round(d));
  };
};

buildPointsCounter();

buildStepsCounter();
