initVC = {};

initVC.historyDataFromAirly = null;
initVC.pm10ValuesFromAirly = [];
initVC.pm25ValuesFromAirly = [];
initVC.airlyCaqiFromAirly = [];
initVC.datasFromAirly = [];

initVC.init = function(){

    const ps = new PerfectScrollbar('.informations');

    initVC.getDataFromAirly();

};

initVC.getDataFromAirly = function(){
    $.ajax({
        url : "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y",
        dataType : "json"
    })
    .done(res => {
        console.log(res);
        initVC.createGraph(res);
    });
}

initVC.createGraph = function(res){ 
    initVC.historyDataFromAirly = res.history;
    
    initVC.historyDataFromAirly.forEach(function (value, i) {
        initVC.pm10ValuesFromAirly[i] = initVC.historyDataFromAirly[i].values[2].value;
        initVC.pm25ValuesFromAirly[i] = initVC.historyDataFromAirly[i].values[1].value;
        initVC.airlyCaqiFromAirly[i] = initVC.historyDataFromAirly[i].indexes[0].value;

        initVC.datasFromAirly[i] = moment(initVC.historyDataFromAirly[i].fromDateTime).format('DD/MM HH:mm');
    });


    var lineChartData = {
        labels: initVC.datasFromAirly,
        datasets: [{
            label: 'PM2.5',
            borderColor: "#7b7f8e",
            backgroundColor: "#7b7f8ea6",
            fill: true,
            data: initVC.pm25ValuesFromAirly,
            //yAxisID: 'y-axis-1',
        }, {
            label: 'PM10',
            borderColor: "#999eb1",
            backgroundColor: "#999eb19c",
            fill: true,
            data: initVC.pm10ValuesFromAirly,
            //yAxisID: 'y-axis-2'
        }]
    };

    var lineChartData2 = {
        labels: initVC.datasFromAirly,
        datasets: [{
            label: false,
            borderColor: "#7b7f8e",
            backgroundColor: "#7b7f8ea6",
            fill: true,
            data: initVC.airlyCaqiFromAirly,
        }]
    };


    var ctx = document.getElementById('graphAirlyHistoric').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: lineChartData,
    });

    var ctx2 = document.getElementById('graphAirlyPrediction').getContext('2d');
    var myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: lineChartData2,
        options: {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                   label: function(tooltipItem) {
                          return tooltipItem.yLabel;
                   }
                }
            }
        }
    });

   
};

initVC.init();