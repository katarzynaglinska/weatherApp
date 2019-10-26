moment.locale('pl')

initVC = {};

// AIRLY
initVC.dataFromAirlyCurrent = null;
initVC.dataFromAirlyHistory = null;
initVC.dataFromAirlyForecast = null;
initVC.pm10ValuesFromAirlyHistory = [];
initVC.pm25ValuesFromAirlyHistory = [];
initVC.caqiFromAirlyHistory = [];
initVC.temperatureFromAirlyHistory = [];
initVC.datasFromAirlyHistory = [];
initVC.pm10ValuesFromAirlyForecast = [];
initVC.pm25ValuesFromAirlyForecast = [];
initVC.caqiFromAirlyForecast = [];
initVC.datasFromAirlyForecast = [];
initVC.chartHistory;
initVC.chartHistoryMinMax;
initVC.chartForecast;
initVC.chartAirlyHistoryIndex = document.getElementById("graphAirlyHistoric").getContext('2d');
initVC.chartAirlyHistoryIndexMinMax = document.getElementById("graphAirlyHistoricMinMax").getContext('2d');
initVC.chartAirlyForecastIndex = document.getElementById("graphAirlyPrediction").getContext('2d');

// PG
initVC.dataFromPgCurrent = null;
initVC.datasFromPgHistory = null;
initVC.pm10ValuesFromPgHistory = [];
initVC.pm25ValuesFromPgHistory = [];
initVC.datasFromPgHistory = [];
initVC.chartPgHistory;
initVC.chartPgHistoryIndex = document.getElementById("graphPgHistoric").getContext('2d');


initVC.init = function(){
   // const ps = new PerfectScrollbar('.informations__airly');
    $('.informations').each(function(){ const ps = new PerfectScrollbar($(this)[0]); });

    var $menuBtn = $(".manu__item");
    var $airlyMenuHistoricBtn = $(".menu-historic__item");
    var $airlyMenuPredictionBtn = $(".menu-prediction__item");

    $menuBtn.off('click').click(initVC.changeView);  
    $airlyMenuHistoricBtn.off('click').click(initVC.changeChartData);
    $airlyMenuPredictionBtn.off('click').click(initVC.changeChartData);

    initVC.getDataFromAirly();
    initVC.getDataFromPgCurrent();
    initVC.getDataFromPgHistoric();
};



initVC.changeView = function(){
    var btnType = $(this)[0];
    $('.informations').css("display","none");
    $('.informations__' + btnType.id).css("display","block");

    $('.informations').each(function(){ const ps = new PerfectScrollbar($(this)[0]); });

    switch (btnType.id) {
        case 'airly':
            break;
        case 'pg':
            break
        case 'comparison':
            break;
        default:
    }

    $(".manu__item").removeClass("manu__item--selected");
    $(this).addClass("manu__item--selected");
};

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
            var lineChartDataCaqiHistory = initVC.createChartSelected(initVC.datasFromAirlyHistory, initVC.caqiFromAirlyHistory, false, false);
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
            var lineChartDataCaqiForecast = initVC.createChartSelected(initVC.datasFromAirlyForecast, initVC.caqiFromAirlyForecast, false, false);
            initVC.createChart(lineChartDataCaqiForecast, "forecast");
            break;
        case 'predictionPmBtn':
            var lineChartDataPmForecast = initVC.createChartSelected(initVC.datasFromAirlyForecast, initVC.pm25ValuesFromAirlyForecast, initVC.pm10ValuesFromAirlyForecast, true);
            initVC.createChart(lineChartDataPmForecast, "forecast");
            break;
        default:
    }
}

initVC.setCurrentDataAirly = function(){
    var $currentDateName = $(".informations__airly").find(".current-date__day-name");
    var $currentDate = $(".informations__airly").find(".current-date__day-date");
    var $currentDescription = $(".informations__airly").find(".row__rate");
    var $currentDescriptionNumber = $(".informations__airly").find(".row__rate-number");
    var $currentPm10= $(".informations__airly").find(".current_pm10").find(".current__value");
    var $currentPm25= $(".informations__airly").find(".current_pm25").find(".current__value");
    var $currentPm1= $(".informations__airly").find(".current_pm1").find(".current__value");
    var $currentTemperature= $(".informations__airly").find(".current_tem").find(".current__value");
    var $currentPressure= $(".informations__airly").find(".current_pres").find(".current__value");
    var $currentHumidity= $(".informations__airly").find(".current_hum").find(".current__value");
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

initVC.setCurrentDatePg = function(){
    var mydate = initVC.convertDate(initVC.dataFromPgCurrent["Stacja Testowa"].date);
    var day = moment(new Date(mydate), "YYYY-MM-DD HH:mm:ss");   
    var dayNameOfWeek = day.format('dddd').charAt(0).toUpperCase() + day.format('dddd').slice(1);
    var dayDate = day.format('DD-MM-YYYY');
    var $currentPm10= $(".informations__pg").find(".current_pm10").find(".current__value");
    var $currentPm25= $(".informations__pg").find(".current_pm25").find(".current__value");

    $(".informations__pg").find(".name__data").text("").text("PG");
    $(".informations__pg").find(".current-date__day-name").text("").text(dayNameOfWeek);
    $(".informations__pg").find(".current-date__day-date").text("").text(dayDate);
    $currentPm10.text("").text(initVC.dataFromPgCurrent["Stacja Testowa"].pm10);
    $currentPm25.text("").text(initVC.dataFromPgCurrent["Stacja Testowa"].pm25);
};

initVC.convertDate = function(date){
    var day = date.substring(0, date.indexOf(' '));
    var month = date.substring(date.indexOf(' ') + 1, date.indexOf(' ') + 4);
    var montfCount = "stylutmarkwimajczelipsiewrzpazlisgru".indexOf(month) / 3 + 1;
    if(montfCount<10){
        montfCount="0"+montfCount;
    }
    var year = date.substring(date.indexOf(' ') + 5, date.indexOf(' ') + 9);
    return year+"-"+montfCount+"-"+day;
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
        initVC.dataFromAirlyHistory = res.history;
        initVC.dataFromAirlyForecast = res.forecast;
        initVC.dataFromAirlyHistory.forEach(function (value, i) {
            initVC.pm10ValuesFromAirlyHistory[i] = initVC.dataFromAirlyHistory[i].values[2].value;
            initVC.pm25ValuesFromAirlyHistory[i] = initVC.dataFromAirlyHistory[i].values[1].value;
            initVC.caqiFromAirlyHistory[i] = initVC.dataFromAirlyHistory[i].indexes[0].value;
            initVC.temperatureFromAirlyHistory[i] = initVC.dataFromAirlyHistory[i].values[5].value;

            initVC.datasFromAirlyHistory[i] = moment(initVC.dataFromAirlyHistory[i].fromDateTime).format('DD/MM HH:mm');
        });
        initVC.dataFromAirlyForecast.forEach(function (value, i) {
            initVC.pm10ValuesFromAirlyForecast[i] = initVC.dataFromAirlyForecast[i].values[0].value;
            initVC.pm25ValuesFromAirlyForecast[i] = initVC.dataFromAirlyForecast[i].values[1].value;
            initVC.caqiFromAirlyForecast[i] = initVC.dataFromAirlyForecast[i].indexes[0].value;

            initVC.datasFromAirlyForecast[i] = moment(initVC.dataFromAirlyForecast[i].fromDateTime).format('DD/MM HH:mm');
        });
        initVC.pm10ValuesFromAirlyForecast = initVC.pm10ValuesFromAirlyForecast.slice(0,8);
        initVC.pm25ValuesFromAirlyForecast = initVC.pm25ValuesFromAirlyForecast.slice(0,8);
        initVC.caqiFromAirlyForecast = initVC.caqiFromAirlyForecast.slice(0,8);
        initVC.datasFromAirlyForecast = initVC.datasFromAirlyForecast.slice(0,8);

        initVC.setCurrentDataAirly();
        initVC.createGraphHistoric(res);
        initVC.createGraphHistoricMinMax(res);
    });
}

initVC.createGraphHistoricMinMax = function(res){ 
    const arrMin = arr => Math.min(...arr);
    const arrMax = arr => Math.max(...arr);
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    var minCaquiHistory = arrMin(initVC.caqiFromAirlyHistory);
    var minCaquiHistoryIndex = initVC.caqiFromAirlyHistory.indexOf(minCaquiHistory);
    var maxCaquiHistory = arrMax(initVC.caqiFromAirlyHistory);
    var maxCaquiHistoryIndex = initVC.caqiFromAirlyHistory.indexOf(maxCaquiHistory);
    var avgCaquiHistory = arrAvg(initVC.caqiFromAirlyHistory).toFixed(2);;
    var minArray = Array(initVC.caqiFromAirlyHistory.length).fill(null);    
    var maxArray = Array(initVC.caqiFromAirlyHistory.length).fill(null); 
    var avgArray = Array(initVC.caqiFromAirlyHistory.length).fill(avgCaquiHistory); 
    minArray[minCaquiHistoryIndex] = minCaquiHistory;
    maxArray[maxCaquiHistoryIndex] = maxCaquiHistory;

    console.log("minCaquiHistoryIndex " + minCaquiHistoryIndex)
    var chart;
    chart = {
        type: 'line',
        data: {
            datasets: [
                 {
                label: 'Wartość średnia',
                data: avgArray,
                fill: false,
                // Changes this dataset to become a line
                type: 'line'
            },
            {
                label: 'Maximum',
                backgroundColor: "rgb(48, 134, 204)",
                pointBackgroundColor: "rgb(48, 134, 204)",
                pointBorderColor: "#55bae7",
                data: maxArray
              },
              {
                label: 'Minimum',
                backgroundColor: "#18e02a",
                pointBackgroundColor: "#18e02a",
                pointBorderColor: "#18e02a",
                data: minArray
              },],
            labels: initVC.datasFromAirlyHistory
        },
        options: {
            legend: {
                display: true
            }
        }
    };
    initVC.chartHistoryMinMax = new Chart(initVC.chartAirlyHistoryIndexMinMax, chart);

}


initVC.createGraphHistoric = function(res){ 
    var lineChartDataPmHistory = initVC.createChartSelected(initVC.datasFromAirlyHistory, initVC.pm25ValuesFromAirlyHistory, initVC.pm10ValuesFromAirlyHistory, true);
    var lineChartDataPmHistoryForecast = initVC.createChartSelected(initVC.datasFromAirlyForecast, initVC.pm25ValuesFromAirlyForecast, initVC.pm10ValuesFromAirlyForecast, true);

    initVC.chartHistory = new Chart(initVC.chartAirlyHistoryIndex, lineChartDataPmHistory);
    initVC.chartForecast = new Chart(initVC.chartAirlyForecastIndex, lineChartDataPmHistoryForecast);
};

initVC.createGraphHistoricPg = function(res){ 
    var lineChartDataPmHistory = initVC.createChartSelected(initVC.datasFromPgHistory, initVC.pm25ValuesFromPgHistory, initVC.pm10ValuesFromPgHistory, true);
    initVC.chartPgHistory = new Chart(initVC.chartPgHistoryIndex, lineChartDataPmHistory);
};

initVC.createChart = function(chartData, chartPlace){
    if(chartPlace == "history"){
        initVC.chartHistory.destroy();
	    initVC.chartHistory = new Chart(initVC.chartAirlyHistoryIndex, chartData);
    }
    else if(chartPlace == "forecast"){
        initVC.chartForecast.destroy();
	    initVC.chartForecas = new Chart(initVC.chartAirlyForecastIndex, chartData);
        console.log(initVC.chartForecas);
    }
}

initVC.getDataFromPgCurrent = function(){
    $.ajax({
        url : "https://smogpg.firebaseio.com/stations.json",
        dataType : "json"
    })
    .done(res => {
        console.log("initVC.getDataFromPgCurrent");
        console.log(res);
        initVC.dataFromPgCurrent = res;
        initVC.setCurrentDatePg();
    });
}

initVC.getDataFromPgHistoric = function(){
    $.ajax({
        url : "https://smogpg.firebaseio.com/stations_history.json",
        dataType : "json"
    })
    .done(res => {
        console.log("initVC.getDataFromPgHistoric");
        console.log(res);
        initVC.dataFromPgHistory = res;
        var i = 0;
        var indexOfSecondValue = 0;
        for (const [key, value] of Object.entries(initVC.dataFromPgHistory["Stacja Testowa"])) {
            indexOfSecondValue = value.indexOf(',' ) + 2;
            initVC.datasFromPgHistory[i] = moment(parseInt(key)).format('DD/MM HH:mm');
            initVC.pm10ValuesFromPgHistory[i] = value.substring(0, value.indexOf(','));
            initVC.pm25ValuesFromPgHistory[i] = value.substring(indexOfSecondValue, value.length);
            i++;
        }
        initVC.createGraphHistoricPg();
    });
}

initVC.init();