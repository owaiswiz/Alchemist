Highcharts.chart('medicine-sales-chart', {

  title: {
    text: 'Total Medicine Sales - 7 Days'
  },

  xAxis: {
    // type: 'datetime',
    // dateTimeLabelFormats: {
    //   day: '%A'    //ex- 01 Jan 2016
    // }
    categories: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
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
    data: [1, 2, 0, 1, 3, 2, parseInt(Capsule.get_medicine_history()[0].toString())]
  }, {
    name: 'Eayelie',
    data: [6, 2, 1, 0, 2, 1, parseInt(Capsule.get_medicine_history()[1].toString())]
  }, {
    name: 'Merse',
    data: [4, 5, 1, 5, 7, 7, parseInt(Capsule.get_medicine_history()[2].toString())]
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
