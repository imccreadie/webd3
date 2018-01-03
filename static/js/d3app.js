angular.module('d3', [])
  .directive('barChart', function($parse) {
    return {
      restrict: 'E',
      replace: true,
      scope: {data: "=chartData"},
      link: function(scope, element, attrs) {
        var chart = d3.select(element[0]);
        chart.append("div").attr("class", "chart")
          .selectAll('div')
          .data(scope.data).enter().append("div")
          .transition().ease("elastic")
          .style("width", function(d) { return d + "%"; })
          .text(function(d) { return d+"%"; });
      }
    }
  })
  .directive('scatter', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {x: "=x",
              y: "=y"},
      link: function(scope, element, attrs) {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
        var svg = d3.select(element[0]);
        svg.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        x.domain(d3.extent(x)).nice();
        y.domain(d3.extent(y)).nice();

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
         .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Sepal Width (cm)");

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
         .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Sepal Length (cm)");
        var data = {};
        data.x = x;
        data.y = y;

        svg.selectAll(".dot")
          .data(data)
         .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", function(d) { return x(d.x); })
          .attr("cy", function(d) { return y(d.y); })
          .style("fill", function(d) { return color();});
          
        
      }
    }

  });

