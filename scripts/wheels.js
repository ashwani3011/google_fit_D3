let values = [{ steps: 2300 }];
let goal = 10000;

let dims = { height: 300, width: 300 };
const center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

const svg = d3
  .select(".c")
  .append("svg")
  .attr("height", dims.height)
  .attr("width", dims.width);

let bgWheels = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

let stepsWheels = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

let pointsWheel = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

let pie = d3
  .pie()
  .sort(null)
  .value((d) => d);

let stepsPie = d3
  .pie()
  .sort(null)
  .value((d) => d.steps);

let pointsPie = d3
  .pie()
  .sort(null)
  .value((d) => d.points);

let outerArc = d3.arc().outerRadius(115).innerRadius(105).cornerRadius(20);
let innerArc = d3.arc().outerRadius(95).innerRadius(85).cornerRadius(20);

let buildBgWheels = () => {
  let paths = bgWheels.selectAll("path").data(pie([1]));

  paths
    .enter()
    .append("path")
    .attr("d", (d) => outerArc(d))
    .attr("fill", "#00b359")
    .attr("opacity", "0.3");
  paths
    .enter()
    .append("path")
    .attr("d", (d) => innerArc(d))
    .attr("fill", "#00005a")
    .attr("opacity", "0.2");
};

let buildStepsWheel = () => {
  let currData = [
    { steps: values[0].steps, type: "done" },
    { steps: 10000 - values[0].steps, type: "remaining" },
  ];

  let paths = stepsWheels.selectAll("path").data(stepsPie(currData));

  paths
    .enter()
    .append("path")
    .attr("d", (d) => innerArc(d))
    .attr("opacity", (d) => {
      console.log(d);
      if (d.data.type === "remaining") return 0;
      return 1;
    })
    .attr("fill", "#00005a")
    .transition()
    .duration(2000)
    .attrTween("d", (d) => arcTweenInnerEnter(d));
};

let buildPointsWheel = () => {
  let hPoint = Math.floor((values[0].steps / goal) * 100) + 10;
  let currData = [
    { points: hPoint, type: "done" },
    { points: 100 - hPoint, type: "remaining" },
  ];

  let paths = pointsWheel.selectAll("path").data(pointsPie(currData));

  paths
    .enter()
    .append("path")
    .attr("d", (d) => outerArc(d))
    .attr("opacity", (d) => {
      if (d.data.type == "remaining") return 0;
      return 1;
    })
    .attr("fill", "#00b359")
    .transition()
    .duration(2500)
    .attrTween("d", (d) => arcTweenOuterEnter(d));
};

let arcTweenInnerEnter = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle);

  return function (t) {
    d.endAngle = i(t);
    return innerArc(d);
  };
};

let arcTweenOuterEnter = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle);

  return function (t) {
    d.endAngle = i(t);
    return outerArc(d);
  };
};

buildPointsWheel();

buildBgWheels();
buildStepsWheel();
