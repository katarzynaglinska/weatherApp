moment.locale('pl')

initVC = {};
initVC.dataFromAirlyCurrent = null;
initVC.dataFromAirlyHistory = null;
initVC.dataFromAirlyForecast = null;
initVC.pm10ValuesFromAirlyHistory = [];
initVC.pm25ValuesFromAirlyHistory = [];
initVC.airlyCaqiFromAirlyHistory = [];
initVC.temperatureFromAirlyHistory = [];
initVC.datasFromAirlyHistory = [];
initVC.pm10ValuesFromAirlyForecast = [];
initVC.pm25ValuesFromAirlyForecast = [];
initVC.airlyCaqiFromAirlyForecast = [];
initVC.datasFromAirlyForecast = [];
initVC.chartHistory;
initVC.chartForecast;
initVC.chartHistoryIndex = document.getElementById("graphAirlyHistoric").getContext('2d');
initVC.chartForecastIndex = document.getElementById("graphAirlyPrediction").getContext('2d');

initVC.init = function(){
    const ps = new PerfectScrollbar('.informations');

    var $historicCaqiBtn = $("#historicCaqiBtn");
    var $historicPmBtn = $("#historicPmBtn");
    var $historicTempBtn = $("#historicTempBtn");
    var $predictionCaqiBtn = $("#predictionCaqiBtn");
    var $predictionPmBtn = $("#predictionPmBtn");

    $historicCaqiBtn.off('click').click(initVC.changeChartData);
    $historicPmBtn.off('click').click(initVC.changeChartData);
    $historicTempBtn.off('click').click(initVC.changeChartData);
    $predictionCaqiBtn.off('click').click(initVC.changeChartData);
    $predictionPmBtn.off('click').click(initVC.changeChartData);

    initVC.getDataFromAirly();
    
};

initVC.setCurrentDate = function(){
    var $currentDateName = $(".current-date__day-name");
    var $currentDate = $(".current-date__day-date");
    var $currentDescription = $(".row__rate");
    var $currentDescriptionNumber = $(".row__rate-number");
    var $currentPm10= $(".current_pm10").find(".current__value");
    var $currentPm25= $(".current_pm25").find(".current__value");
    var $currentPm1= $(".current_pm1").find(".current__value");
    var $currentTemperature= $(".current_tem").find(".current__value");
    var $currentPressure= $(".current_pres").find(".current__value");
    var $currentHumidity= $(".current_hum").find(".current__value");
    var day = moment(initVC.dataFromAirlyCurrent.fromDateTime, "YYYY-MM-DD HH:mm:ss");
    var dayNameOfWeek = day.format('dddd').charAt(0).toUpperCase() + day.format('dddd').slice(1);
    var dayDate = day.format('DD-MM-YYYY');
    var rate = initVC.dataFromAirlyCurrent.indexes[0].description;
    var rateValue = initVC.dataFromAirlyCurrent.indexes[0].value;
    var pm10 = initVC.dataFromAirlyCurrent.values[2].value;
    var pm25 = initVC.dataFromAirlyCurrent.values[1].value;
    var pm1 = initVC.dataFromAirlyCurrent.values[0].value;
    var temperature = initVC.dataFromAirlyCurrent.values[5].value;
    var pressure = initVC.dataFromAirlyCurrent.values[3].value;
    var humidity = initVC.dataFromAirlyCurrent.values[4].value;

    $currentDateName.text("").text(dayNameOfWeek);
    $currentDate.text("").text(dayDate);
    $currentDescription.text("").text(rate);
    $currentDescriptionNumber.text("").text(rateValue);
    $currentPm10.text("").text(pm10);
    $currentPm25.text("").text(pm25);
    $currentPm1.text("").text(pm1);
    $currentTemperature.text("").text(temperature);
    $currentPressure.text("").text(pressure);
    $currentHumidity.text("").text(humidity);
}

initVC.changeChartData = function(){
    var dataType = $(this)[0];
    if(dataType.id == "predictionCaqiBtn" || dataType.id == "predictionPmBtn"){
        $(".menu-prediction__item").removeClass("menu-prediction__item--selected");
        $(this).addClass("menu-prediction__item--selected");
    }
    else{
        $(".menu-historic__item").removeClass("menu-historic__item--selected");
        $(this).addClass(" menu-historic__item--selected");
    }
    switch (dataType.id) {
        case 'historicCaqiBtn':
            var lineChartDataCaqiHistory = initVC.createChartSelected(initVC.datasFromAirlyHistory, initVC.airlyCaqiFromAirlyHistory, false, false);
            initVC.createChart(lineChartDataCaqiHistory, "history");
            break;
        case 'historicPmBtn':
            var lineChartDataPmHistory = initVC.createChartSelected(initVC.datasFromAirlyHistory, initVC.pm25ValuesFromAirlyHistory, initVC.pm10ValuesFromAirlyHistory, true);
            initVC.createChart(lineChartDataPmHistory, "history");
            break
        case 'historicTempBtn':
            var lineChartDataTempHistory = initVC.createChartSelected(initVC.datasFromAirlyHistory, initVC.temperatureFromAirlyHistory, false, false);
            initVC.createChart(lineChartDataTempHistory, "history");
            break;
        case 'predictionCaqiBtn':
            var lineChartDataCaqiForecast = initVC.createChartSelected(initVC.datasFromAirlyForecast, initVC.airlyCaqiFromAirlyForecast, false, false);
            initVC.createChart(lineChartDataCaqiForecast, "forecast");
            break;
        case 'predictionPmBtn':
            var lineChartDataPmForecast = initVC.createChartSelected(initVC.datasFromAirlyForecast, initVC.pm25ValuesFromAirlyForecast, initVC.pm10ValuesFromAirlyForecast, true);
            initVC.createChart(lineChartDataPmForecast, "forecast");
            break;
        default:
    }
}

initVC.createChartSelected = function(labels, data, data2, display){
    var chart;
    if(data2 == false){
        chart = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                label: false,
                borderColor: "#7b7f8e",
                backgroundColor: "#7b7f8ea6",
                fill: true,
                data: data,
                }]
            },
            options: {
                legend: {
                    display: display
                }
            }
        };
    }
    else{
        chart = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                label: 'PM2.5',
                borderColor: "#7b7f8e",
                backgroundColor: "#7b7f8ea6",
                fill: true,
                data: data,
            }, {
                label: 'PM10',
                borderColor: "#999eb1",
                backgroundColor: "#999eb19c",
                fill: true,
                data: data2,
            }]
            },
            options: {
                legend: {
                    display: display
                }
            }
        };
    }
    return chart;
}

initVC.getDataFromAirly = function(){
    $.ajax({
        url : "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y",
        dataType : "json"
    })
    .done(res => {
        console.log(res);
        initVC.dataFromAirlyCurrent = res.current;
        initVC.dataFromAirlyForecast = res.forecast;
        initVC.dataFromAirlyHistory = res.history;
        initVC.dataFromAirlyHistory.forEach(function (value, i) {
            initVC.pm10ValuesFromAirlyHistory[i] = initVC.dataFromAirlyHistory[i].values[2].value;
            initVC.pm25ValuesFromAirlyHistory[i] = initVC.dataFromAirlyHistory[i].values[1].value;
            initVC.airlyCaqiFromAirlyHistory[i] = initVC.dataFromAirlyHistory[i].indexes[0].value;
            initVC.temperatureFromAirlyHistory[i] = initVC.dataFromAirlyHistory[i].values[5].value;

            initVC.datasFromAirlyHistory[i] = moment(initVC.dataFromAirlyHistory[i].fromDateTime).format('DD/MM HH:mm');
        });
        initVC.dataFromAirlyForecast.forEach(function (value, i) {
            initVC.pm10ValuesFromAirlyForecast[i] = initVC.dataFromAirlyForecast[i].values[0].value;
            initVC.pm25ValuesFromAirlyForecast[i] = initVC.dataFromAirlyForecast[i].values[1].value;
            initVC.airlyCaqiFromAirlyForecast[i] = initVC.dataFromAirlyForecast[i].indexes[0].value;

            initVC.datasFromAirlyForecast[i] = moment(initVC.dataFromAirlyForecast[i].fromDateTime).format('DD/MM HH:mm');
        });

        initVC.setCurrentDate();
        initVC.createGraphHistoric(res);
    });
}

initVC.createGraphHistoric = function(res){ 
    var lineChartDataPmHistory = initVC.createChartSelected(initVC.datasFromAirlyHistory, initVC.pm25ValuesFromAirlyHistory, initVC.pm10ValuesFromAirlyHistory, true);
    var lineChartDataPmHistoryForecast = initVC.createChartSelected(initVC.datasFromAirlyForecast, initVC.pm25ValuesFromAirlyForecast, initVC.pm10ValuesFromAirlyForecast, true);

    initVC.chartHistory = new Chart(initVC.chartHistoryIndex, lineChartDataPmHistory);
    initVC.chartForecast = new Chart(initVC.chartForecastIndex, lineChartDataPmHistoryForecast);
};

initVC.createChart = function(chartData, chartPlace){
    if(chartPlace == "history"){
        initVC.chartHistory.destroy();
	    initVC.chartHistory = new Chart(initVC.chartHistoryIndex, chartData);
    }
    else if(chartPlace == "forecast"){
        initVC.chartForecast.destroy();
	    initVC.chartForecas = new Chart(initVC.chartForecastIndex, chartData);
    }
}

initVC.init();