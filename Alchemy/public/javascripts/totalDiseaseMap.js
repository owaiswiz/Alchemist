/* global Highcharts */
Highcharts.seriesType('mappie', 'pie', {
  center: null, // Can't be array by default anymore
  clip: true, // For map navigation
  states: {
    hover: {
      halo: {
        size: 5
      }
    }
  },
  dataLabels: {
    enabled: false
  }
}, {
  getCenter: function () {
    var options = this.options,
      chart = this.chart,
      slicingRoom = 2 * (options.slicedOffset || 0);
    if (!options.center) {
      options.center = [null, null]; // Do the default here instead
    }
    // Handlelat/lon support
    if (options.center.lat !== undefined) {
      var point = chart.fromLatLonToPoint(options.center);
      options.center = [
        chart.xAxis[0].toPixels(point.x, true),
        chart.yAxis[0].toPixels(point.y, true)
      ];
    }
    // Handle dynamic size
    if (options.sizeFormatter) {
      options.size = options.sizeFormatter.call(this);
    }
    // Call parent function
    var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
    // Must correct for slicing room to get exact pixel pos
    result[0] -= slicingRoom;
    result[1] -= slicingRoom;
    return result;
  },
  translate: function (p) {
    this.options.center = this.userOptions.center;
    this.center = this.getCenter();
    return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
  }
});

function getTotalVotes(total, votes) {
  return total + votes;
}
function populateData(stateName, malaria, typhoid, dengue, others){
  var votes = [malaria, typhoid, dengue, others];
  var winner = votes.indexOf(Math.max(...votes));
  var winnerMap = [-1,1,2,3]
  var sumVotes = votes.reduce(getTotalVotes);
  var stateVotes = [stateName, ...votes, sumVotes, winnerMap[winner], -1];
  return stateVotes;
}
var stateNames = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttaranchal","Uttar Pradesh","West Bengal"]
var data = [
  // state, malaria, typhoid, dengue, others, sumVotes, winner, offset config for pies
];

stateNames.map(function(stateName) {
  var malaria = Math.random()*100;
  var typhoid = Math.random()*100;
  var dengue = Math.random()*100;
  data.push(populateData(stateName,malaria,typhoid,dengue,0 ))
  // tempVoted.push([stateName, Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100)])
});


var maxVotes = 0,
  malariaColor = 'rgba(74,131,240,0.80)',
  typhoidColor = 'rgba(220,71,71,0.80)',
  dengueColor = 'rgba(240,190,50,0.80)',
  otherColor = 'rgba(90,200,90,0.80)';


// Compute max votes to find relative sizes of bubbles
Highcharts.each(data, function (row) {
  maxVotes = Math.max(maxVotes, row[5]);
});

// Build the chart
var chart = Highcharts.mapChart('regions-affected-map', {
  title: {
    text: null
  },

  chart: {
    animation: false // Disable animation, especially for zooming
  },

  exporting: {
    enabled: false
  },

  colorAxis: {
    dataClasses: [{
      from: -1,
      to: 0,
      color: malariaColor,
      name: 'Malaria'
    }, {
      from: 0,
      to: 1,
      color: typhoidColor,
      name: 'Typhoid'
    }, {
      from: 2,
      to: 3,
      name: 'Dengue',
      color: dengueColor
    }, {
      from: 3,
      to: 4,
      name: 'Others',
      color: otherColor
    }]
  },

  // Limit zoom range
  yAxis: {
    minRange: 2300
  },

  tooltip: {
    useHTML: true
  },

  // Default options for the pies
  plotOptions: {
    mappie: {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: 1,
      tooltip: {
        headerFormat: ''
      }
    }
  },

  series: [{
    mapData: Highcharts.maps['countries/in/in-all'],
    data: data,
    name: 'States',
    borderColor: '#FFF',
    showInLegend: false,
    joinBy: ['name', 'id'],
    keys: ['id', 'malaria', 'typhoid', 'dengue', 'otherVotes',
      'sumVotes', 'value', 'pieOffset'],
    tooltip: {
      headerFormat: '',
      pointFormatter: function () {
        var hoverVotes = this.hoverVotes; // Used by pie only
        return '<b>' + this.id + '</b><br/>' +
          Highcharts.map([
            ['Malaria', this.malaria, malariaColor],
            ['Typhoid', this.typhoid, typhoidColor],
            ['Dengue', this.dengue, dengueColor],
            ['Others', this.otherVotes, otherColor]
          ].sort(function (a, b) {
            return b[1] - a[1]; // Sort tooltip by most votes
          }), function (line) {
            return '<span style="color:' + line[2] +
              // Colorized bullet
              '">\u25CF</span> ' +
              // Party and votes
              (line[0] === hoverVotes ? '<b>' : '') +
              line[0] + ': ' +
              Highcharts.numberFormat(line[1], 0) +
              (line[0] === hoverVotes ? '</b>' : '') +
              '<br/>';
          }).join('') +
          '<hr/>Total: ' + Highcharts.numberFormat(this.sumVotes, 0);
      }
    }
  }, {
    name: 'Separators',
    type: 'mapline',
    data: Highcharts.geojson(Highcharts.maps['countries/in/in-all'], 'mapline'),
    color: '#707070',
    showInLegend: false,
    enableMouseTracking: false
  }, {
    name: 'Connectors',
    type: 'mapline',
    color: 'rgba(130, 130, 130, 0.5)',
    zIndex: 5,
    showInLegend: false,
    enableMouseTracking: false
  }]
});

// When clicking legend items, also toggle connectors and pies
Highcharts.each(chart.legend.allItems, function (item) {
  var old = item.setVisible;
  item.setVisible = function () {
    var legendItem = this;
    old.call(legendItem);
    Highcharts.each(chart.series[0].points, function (point) {
      if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
        // Find this state's pie and set visibility
        Highcharts.find(chart.series, function (item) {
          return item.name === point.id;
        }).setVisible(legendItem.visible, false);
        // Do the same for the connector point if it exists
        var connector = Highcharts.find(chart.series[2].points, function (item) {
          return item.name === point.id;
        });
        if (connector) {
          connector.setVisible(legendItem.visible, false);
        }
      }
    });
    chart.redraw();
  };
});

// Add the pies after chart load, optionally with offset and connectors
Highcharts.each(chart.series[0].points, function (state) {
  if (!state.id) {
    return; // Skip points with no data, if any
  }

  var pieOffset = state.pieOffset || {},
    centerLat = parseFloat(state.properties.latitude),
    centerLon = parseFloat(state.properties.longitude);

  // Add the pie for this state
  chart.addSeries({
    type: 'mappie',
    name: state.id,
    zIndex: 6, // Keep pies above connector lines
    sizeFormatter: function () {
      var yAxis = this.chart.yAxis[0],
        zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
        (yAxis.max - yAxis.min);
      return Math.max(
        this.chart.chartWidth / 45 * zoomFactor, // Min size
        this.chart.chartWidth / 11 * zoomFactor * state.sumVotes / maxVotes
      );
    },
    tooltip: {
      // Use the state tooltip for the pies as well
      pointFormatter: function () {
        return state.series.tooltipOptions.pointFormatter.call({
          id: state.id,
          hoverVotes: this.name,
          malaria: state.malaria,
          typhoid: state.typhoid,
          dengue: state.dengue,
          otherVotes: state.otherVotes,
          sumVotes: state.sumVotes
        });
      }
    },
    data: [{
      name: 'Malaria',
      y: state.malaria,
      color: malariaColor
    }, {
      name: 'Typhoid',
      y: state.typhoid,
      color: typhoidColor
    }, {
      name: 'Dengue',
      y: state.dengue,
      color: dengueColor
    }, {
      name: 'Others',
      y: state.otherVotes,
      color: otherColor
    }],
    center: {
      lat: centerLat + (pieOffset.lat || 0),
      lon: centerLon + (pieOffset.lon || 0)
    }
  }, false);

  // Draw connector to state center if the pie has been offset
  if (pieOffset.drawConnector !== false) {
    var centerPoint = chart.fromLatLonToPoint({
      lat: centerLat,
      lon: centerLon
    }),
      offsetPoint = chart.fromLatLonToPoint({
        lat: centerLat + (pieOffset.lat || 0),
        lon: centerLon + (pieOffset.lon || 0)
      });
    chart.series[2].addPoint({
      name: state.id,
      path: 'M' + offsetPoint.x + ' ' + offsetPoint.y +
      'L' + centerPoint.x + ' ' + centerPoint.y
    }, false);
  }
});
// Only redraw once all pies and connectors have been added
chart.redraw();
