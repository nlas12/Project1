
let json_data


function print_hello_world() {
  console.log("Hello world!")
}

// this is working because of the import in the html file
// https://socket.io/docs/v4/client -installation/#standalone -build
const socket = io()

socket.on("connect", () => {
console.log("Connected to the webserver.")
//get data from server
socket.emit("getData")
})

socket.on("disconnect", () => {
console.log("Disconnected from the webserver.")
})

socket.on("data", (obj) => {
  json_data = JSON.parse(obj).slice(0,5)
})




//visualisation

function draw_vis() {

  let svg = d3.select("#svgRoot")

  let g_bars = svg.append("g").attr("class", "g_bar")

  let g_xAxis = svg.append("g").attr("class", "g_xAxis")
  let g_yAxis = svg.append("g").attr("class", "g_yAxis")

   const margin = {
     top: 50,
     left: 75,
     bottom: 50,
     right: 50,
    }

  let width = parseInt(svg.style("width"))
  let height = parseInt(svg.style("height"))

  let scale_x = d3
    .scaleBand()
    .domain(json_data.map((d) => d.title))
    .range([margin.left, width - margin.right])
    .padding(0.1)

  let scale_y = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height - margin.top, margin.bottom])
    

  g_xAxis
    .attr("transform", "translate(0, " + (height - margin.bottom) + ")")
    .call(d3.axisBottom(scale_x))

  g_yAxis
    .attr("transform", "translate(" + margin.left + ", 0)")
    .call(d3.axisLeft(scale_y))

  let bars = g_bars.selectAll(".bar").data(json_data)
  //console.log(json_data.map((d) => d.rating))
  //console.log(Object.values({rating : "2", num:  "3"})[0])

  //draw bars
  //d.rating looks like this {property: value, property: value} -> need to extract values 
  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => scale_x(d.title))
    .attr("y", (d) => height - margin.bottom - (scale_y(0) - scale_y(Object.values(d.rating)[0])))
    .attr("width", scale_x.bandwidth())
    .attr("height", (d) => scale_y(0) - scale_y(Object.values(d.rating)[0]))

}