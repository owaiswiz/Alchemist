Highcharts.chart('medicine-sales-chart', {

  title: {
    text: 'Total Medicine Sales - 7 Days'
  },

  xAxis: {
    // type: 'datetime',
    // dateTimeLabelFormats: {
    //   day: '%A'    //ex- 01 Jan 2016
    // }
    categories: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    labels: {
      align: 'left'
    }
  },

  yAxis: {
    title: {
      text: 'Number of Medicines Sold'
    }
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom'
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      // pointStart: Date.UTC(),
      // pointInterval: 24 * 3600 * 1000
    }
  },

  series: [{
    name: 'Kalpol',
    data: [43934, 57177, 69658, 97031, 119931, 137133, 154175]
  }, {
    name: 'Eayelie',
    data: [24916, 29742, 29851, 32490, 30282, 38121, 40434]
  }, {
    name: 'Merse',
    data: [11744, 16005, 19771, 20185, 24377, 32147, 39387]
  }, {
    name: 'Teses',
    data: [ 92323, 7988, 12169, 15112, 22452, 34400, 34227]
  }, {
    name: 'Jevere',
    data: [5948, 8105, 11248, 8989, 11816, 18274, 18111]
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }

});
