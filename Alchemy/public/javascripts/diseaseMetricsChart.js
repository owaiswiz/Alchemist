/* global Highcharts */
/* global Voting */
/* global getTotalVotes */
// Create the chart

var malaria = medsCount[0], typhoid = medsCount[1], dengue = medsCount[2], others = 0;
var totalVotes = [malaria, typhoid, dengue, others].reduce(getTotalVotes);
function percentVotes(votes) {
  return (votes/totalVotes) * 100;
}
Highcharts.chart('disease-metrics-chart', {
  chart: {
    type: 'column'
  },
  title: {
    text: null
  },
  exporting: {
    enabled: false
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    title: {
      text: 'Total Percentage of Disease'
    }
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.votes} People Affected'
      }
    }
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
  },

  series: [{
    name: 'Diseases',
    colorByPoint: true,
    data: [{
      name: 'Malaria',
      y: percentVotes(malaria),
      color: 'rgba(74,131,240,0.80)',
      votes: malaria,

    }, {
      name: 'Typhoid',
      y: percentVotes(typhoid),
      color: 'rgba(220,71,71,0.80)',
      votes: typhoid,
    }, {
      name: 'Dengue',
      y: percentVotes(dengue),
      color: 'rgba(240,190,50,0.80)',
      votes: dengue,
    }, {
      name: 'Others',
      y: percentVotes(others),
      color: 'rgba(90,200,90,0.80)',
      votes: others,
    }]
  }],
});
