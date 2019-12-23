moment.locale('pl')

initVC = {};

initVC.firstCity = "GDAŃSK";
initVC.secondCity = "GDYNIA";
//First City
initVC.dataFirstCityCurrent = null;
initVC.dataFirstCityHistory = null;
initVC.dataFirstCityForecast = null;
initVC.pm10FirstCityHistory = [];
initVC.pm25FirstCityHistory = [];
initVC.caqiFirstCityHistory = [];
initVC.temperatureFirstCityHistory = [];
initVC.datasFirstCityHistory = [];
initVC.pm10FirstCityForecast = [];
initVC.pm25FirstCityForecast = [];
initVC.caqiFirstCityForecast = [];
initVC.datasFirstCityForecast = [];
initVC.chartHistory;
initVC.chartHistoryMinMax;
initVC.chartForecast;
initVC.chartFirstCityHistoryIndex = document.getElementById("graphFirstCityHistoric").getContext('2d');
initVC.chartFirstCityHistoryIndexMinMax = document.getElementById("graphFirstCityHistoricMinMax").getContext('2d');
initVC.chartFirstCityForecastIndex = document.getElementById("graphFirstCityPrediction").getContext('2d');
//Second City
initVC.dataSecondCityCurrent = null;
initVC.dataSecondCityHistory = null;
initVC.dataSecondCityForecast = null;
initVC.pm10SecondCityHistory = [];
initVC.pm25SecondCityHistory = [];
initVC.caqiSecondCityHistory = [];
initVC.temperatureSecondCityHistoryy = [];
initVC.datasSecondCityHistory = [];
initVC.pm10SecondCityForecast = [];
initVC.pm25SecondCityForecast = [];
initVC.caqiSecondCityForecast = [];
initVC.datasSecondCityForecast = [];
initVC.chartHistorySecond = undefined;
initVC.chartHistoryMinMaxSecond;
initVC.chartForecastSecond;
initVC.chartSecondCityHistoryIndex = document.getElementById("graphSecondCityHistoric").getContext('2d');
initVC.chartSecondCityHistoryIndexMinMax = document.getElementById("graphSecondCityHistoricMinMax").getContext('2d');
initVC.chartSecondCityForecastIndex = document.getElementById("graphSecondCityPrediction").getContext('2d');

// Comparison
initVC.minArrayFirst; 
initVC.maxArraySecond; 
initVC.avgArrayFirst; 
initVC.avgArraySecond;
initVC.chartHistoryComp;
initVC.chartHistoryMinMaxComp;
initVC.chartForecastComp;
initVC.chartHistoryIndexComp = document.getElementById("graphHistoricComp").getContext('2d');
initVC.chartHistoryIndexMinMaxComp = document.getElementById("graphHistoricMinMaxComp").getContext('2d');
initVC.chartForecastIndexComp = document.getElementById("graphPredictionComp").getContext('2d');


initVC.init = function(){
    var urlGda = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
    var urlGdy = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.5196057&lng=18.53524&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
    //$('.informations').each(function(){ const ps = new PerfectScrollbar($(this)[0]); });
    var $menuBtn = $(".manu__item");
    $menuBtn.off('click').click(initVC.changeView);  

    var $selectFirst = $("#selectFirstCity");
    var $selectSecond = $("#selectSecondCity");
    var $menuHistoricBtn = $(".menu-historic__item");
    var $menuPredictionBtn = $(".menu-prediction__item");
    var $menuHistoricBtnGdy = $(".menu-historic-second__item");
    var $menuPredictionBtnGdy = $(".menu-prediction-second__item");
    var $MenuHistoricBtnComp = $(".menu-historic-comp__item");
    var $menuPredictionBtnComp = $(".menu-prediction-comp__item");

    $selectSecond.val(1);
    $menuBtn.off('click').click(initVC.changeView);  
    $menuHistoricBtn.off('click').click(initVC.changeChartData);
    $menuPredictionBtn.off('click').click(initVC.changeChartData);
    $menuHistoricBtnGdy.off('click').click(initVC.changeChartData);
    $menuPredictionBtnGdy.off('click').click(initVC.changeChartData);
    $MenuHistoricBtnComp.off('click').click(initVC.changeChartData);
    $menuPredictionBtnComp.off('click').click(initVC.changeChartData);

    initVC.getDataFromFirstCity(urlGda);
    initVC.getDataFromSecondCity(urlGdy);

    $selectFirst.change(initVC.changeCity);
    $selectSecond.change(initVC.changeCity);

    setTimeout(function(){
        initVC.createChartComparisonInit();
        initVC.createGraphHistoricMinMax("comparison");
    }, 3000);
    
};


initVC.createChartComparisonInit = function(){
    var lineChartDataPmHistory = initVC.createChartSelected(initVC.datasFirstCityHistory, initVC.caqiFirstCityHistory, initVC.caqiSecondCityHistory, true, 'bar', initVC.firstCity, initVC.secondCity);
    var lineChartDataPmHistoryForecast = initVC.createChartSelected(initVC.datasSecondCityForecast, initVC.pm25FirstCityForecast, initVC.pm25SecondCityForecast, true, 'line', initVC.firstCity, initVC.secondCity);
    initVC.destroyChart(initVC.chartHistoryComp);
    initVC.destroyChart(initVC.chartForecastComp);
    initVC.chartHistoryComp = new Chart(initVC.chartHistoryIndexComp, lineChartDataPmHistory);
    initVC.chartForecastComp = new Chart(initVC.chartForecastIndexComp, lineChartDataPmHistoryForecast);
}

initVC.changeCity = function(type){
    var chosenCity = $(this)[0].value;
    var url = "";
    switch (chosenCity) {
        case '0':
            url = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
            break;
        case '1':
            url = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.5196057&lng=18.53524&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
            break
        case '2':
            url = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=52.22966&lng=20.97295&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
            break;
        case '3':
            url = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=50.0664&lng=19.9651&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
            break;
        default: break;
    }
    var selectedCity = this.options[this.selectedIndex].text;
    if($(this)[0].id == "selectFirstCity"){
        initVC.getDataFromFirstCity(url);
        initVC.firstCity = selectedCity.toUpperCase();
        $("#first-city").text(selectedCity.toUpperCase());
        $(".name__data-first").text(selectedCity.toUpperCase());
        $(".informations__first-city").find(".name__data").text(selectedCity.toUpperCase());
        setTimeout(function(){
            initVC.createChartComparisonInit();
            initVC.createGraphHistoricMinMax("comparison");
        }, 3000);
    }
    else if($(this)[0].id == "selectSecondCity"){
        initVC.getDataFromSecondCity(url);
        initVC.secondCity = selectedCity.toUpperCase();
        $("#second-city").text(selectedCity.toUpperCase());
        $(".name__data-second").text(selectedCity.toUpperCase());
        $(".informations__second-city").find(".name__data").text(selectedCity.toUpperCase());
        setTimeout(function(){
            initVC.createChartComparisonInit();
            initVC.createGraphHistoricMinMax("comparison");
        }, 3000);
    }
}

initVC.changeView = function(){
    var btnType = $(this)[0];
    $('.informations').css("display","none");
    $('.informations__' + btnType.id).css("display","block");
    $(".manu__item").removeClass("manu__item--selected");
    $(this).addClass("manu__item--selected");
};

initVC.changeChartData = function(){
    var dataType = $(this)[0];
    if(dataType.id == "predictionCaqiBtn" || dataType.id == "predictionPmBtn"){
        $(".menu-prediction__item").removeClass("menu-prediction__item--selected");
        $(this).addClass("menu-prediction__item--selected");
    }
    else if(dataType.id == "historicCaqiBtnSecond" || dataType.id == "historicPmBtnSecond" || dataType.id == "historicTempBtnSecond"){
        $(".menu-historic-second__item").removeClass("menu-historic__item--selected");
        $(this).addClass("menu-historic__item--selected");
    }
    else if(dataType.id == "predictionCaqiBtnSecond" || dataType.id == "predictionPmBtnSecond"){
        $(".menu-prediction-second__item").removeClass("menu-prediction__item--selected");
        $(this).addClass("menu-prediction__item--selected");
    }
    else if(dataType.id == "historicCaqiCompBtn" || dataType.id == "historicPm25CompBtn" || dataType.id == "historicPm10CompBtn" || dataType.id == "historicTempCompBtn"){
        $(".menu-historic-comp__item").removeClass("menu-historic__item--selected");
        $(this).addClass("menu-historic__item--selected");
    }
    else if(dataType.id == "predictionCaqiBtnComp" || dataType.id == "predictionPm25BtnComp" || dataType.id == "predictionPm10BtnComp"){
        $(".menu-prediction-comp__item").removeClass("menu-prediction__item--selected");
        $(this).addClass("menu-prediction__item--selected");
    }
    else{
        $(".menu-historic__item").removeClass("menu-historic__item--selected");
        $(this).addClass("menu-historic__item--selected");
    }
    
    var data = "";
    switch (dataType.id) {
        case 'historicCaqiBtn':
            data = initVC.createChartSelected(initVC.datasFirstCityHistory, initVC.caqiFirstCityHistory, false, false, 'bar');
            initVC.createChartFirstCity(data, "history");
            break;
        case 'historicPmBtn':
            data = initVC.createChartSelected(initVC.datasFirstCityHistory, initVC.pm25FirstCityHistory, initVC.pm10FirstCityHistory, true, 'line', 'PM25', 'PM10');
            initVC.createChartFirstCity(data, "history");
            break
        case 'historicTempBtn':
            data = initVC.createChartSelected(initVC.datasFirstCityHistory, initVC.temperatureFirstCityHistory, false, false, 'bar');
            initVC.createChartFirstCity(data, "history");
            break;
        case 'predictionCaqiBtn':
            data = initVC.createChartSelected(initVC.datasFirstCityForecast, initVC.caqiFirstCityForecast, false, false, 'bar');
            initVC.createChartFirstCity(data, "forecast");
            break;
        case 'predictionPmBtn':
            data = initVC.createChartSelected(initVC.datasFirstCityForecast, initVC.pm25FirstCityForecast, initVC.pm10FirstCityForecast, true, 'line', 'PM25', 'PM10');
            initVC.createChartFirstCity(data, "forecast");
            break;
        //second
        case 'historicCaqiBtnSecond':
            data = initVC.createChartSelected(initVC.datasSecondCityHistory, initVC.caqiSecondCityHistory, false, false, 'bar');
            initVC.createChartSecondCity(data, "history");
            break;
        case 'historicPmBtnSecond':
            data = initVC.createChartSelected(initVC.datasSecondCityHistory, initVC.pm25SecondCityHistory, initVC.pm10SecondCityHistory, true, 'line', 'PM25', 'PM10');
            initVC.createChartSecondCity(data, "history");
            break
        case 'historicTempBtnSecond':
            data = initVC.createChartSelected(initVC.datasSecondCityHistory, initVC.temperatureSecondCityHistoryy, false, false, 'bar');
            initVC.createChartSecondCity(data, "history");
            break;
        case 'predictionCaqiBtnSecond':
            data = initVC.createChartSelected(initVC.datasSecondCityForecast, initVC.caqiSecondCityForecast, false, false, 'bar');
            initVC.createChartSecondCity(data, "forecast");
            break;
        case 'predictionPmBtnSecond':
            data = initVC.createChartSelected(initVC.datasSecondCityForecast, initVC.pm25SecondCityForecast, initVC.pm10SecondCityForecast, true, 'line', 'PM25', 'PM10');
            initVC.createChartSecondCity(data, "forecast");
            break;
        // comparison
        case 'historicCaqiCompBtn':
            data = initVC.createChartSelected(initVC.datasSecondCityHistory, initVC.caqiFirstCityHistory, initVC.caqiSecondCityHistory, true, 'bar', initVC.firstCity, initVC.secondCity);
            initVC.createChartComparison(data, "history");
            break;
        case 'historicPm25CompBtn':
            data = initVC.createChartSelected(initVC.datasSecondCityHistory, initVC.pm25FirstCityHistory, initVC.pm25SecondCityHistory, true, 'line', initVC.firstCity, initVC.secondCity);
            initVC.createChartComparison(data, "history");
            break;
        case 'historicPm10CompBtn':
            data = initVC.createChartSelected(initVC.datasSecondCityHistory, initVC.pm10FirstCityHistory, initVC.pm10SecondCityHistory, true, 'line', initVC.firstCity, initVC.secondCity);
            initVC.createChartComparison(data, "history");
            break;
        case 'historicTempCompBtn':
            data = initVC.createChartSelected(initVC.datasSecondCityHistory, initVC.temperatureFirstCityHistory, initVC.temperatureSecondCityHistoryy, true, 'bar', initVC.firstCity, initVC.secondCity);
            initVC.createChartComparison(data, "history");
            break;
        case 'predictionCaqiBtnComp':
            data = initVC.createChartSelected(initVC.datasSecondCityForecast, initVC.caqiFirstCityForecast, initVC.caqiSecondCityForecast, true, 'bar', initVC.firstCity, initVC.secondCity);
            initVC.createChartComparison(data, "forecast");
            break;
        case 'predictionPm25BtnComp':
            data = initVC.createChartSelected(initVC.datasSecondCityForecast, initVC.pm25FirstCityForecast, initVC.pm25SecondCityForecast, true, 'line', initVC.firstCity, initVC.secondCity);
            initVC.createChartComparison(data, "forecast");
            break;
        case 'predictionPm10BtnComp':
            data = initVC.createChartSelected(initVC.datasSecondCityForecast, initVC.pm10FirstCityForecast, initVC.pm10SecondCityForecast, true, 'line', initVC.firstCity, initVC.secondCity);
            initVC.createChartComparison(data, "forecast");
            break;
        default: break;
    }
}

initVC.setCurrentDataFirstCity = function(){
    var $currentDateName = $(".informations__first-city").find(".current-date__day-name");
    var $currentDate = $(".informations__first-city").find(".current-date__day-date");
    var $currentDescription = $(".informations__first-city").find(".row__rate");
    var $currentDescriptionNumber = $(".informations__first-city").find(".row__rate-number");
    var $currentPm10= $(".informations__first-city").find(".current_pm10").find(".current__value");
    var $currentPm25= $(".informations__first-city").find(".current_pm25").find(".current__value");
    var $currentPm1= $(".informations__first-city").find(".current_pm1").find(".current__value");
    var $currentTemperature= $(".informations__first-city").find(".current_tem").find(".current__value");
    var $currentPressure= $(".informations__first-city").find(".current_pres").find(".current__value");
    var $currentHumidity= $(".informations__first-city").find(".current_hum").find(".current__value");
    var day = moment.utc(initVC.dataFirstCityCurrent.fromDateTime, "YYYY-MM-DD HH:mm:ss");
    var dayNameOfWeek = day.format('dddd').charAt(0).toUpperCase() + day.format('dddd').slice(1);
    var dayDate = day.format('DD-MM-YYYY');
    var rate = initVC.dataFirstCityCurrent.indexes[0].description;
    var rateValue = initVC.dataFirstCityCurrent.indexes[0].value;
    var pm10 = initVC.dataFirstCityCurrent.values[2].value;
    var pm25 = initVC.dataFirstCityCurrent.values[1].value;
    var pm1 = initVC.dataFirstCityCurrent.values[0].value;
    var temperature = initVC.dataFirstCityCurrent.values[5].value;
    var pressure = initVC.dataFirstCityCurrent.values[3].value;
    var humidity = initVC.dataFirstCityCurrent.values[4].value;
    
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

initVC.setCurrentDataSecondCity = function(){
    var $currentDateName = $(".informations__second-city").find(".current-date__day-name");
    var $currentDate = $(".informations__second-city").find(".current-date__day-date");
    var $currentDescription = $(".informations__second-city").find(".row__rate");
    var $currentDescriptionNumber = $(".informations__second-city").find(".row__rate-number");
    var $currentPm10= $(".informations__second-city").find(".current_pm10").find(".current__value");
    var $currentPm25= $(".informations__second-city").find(".current_pm25").find(".current__value");
    var $currentPm1= $(".informations__second-city").find(".current_pm1").find(".current__value");
    var $currentTemperature= $(".informations__second-city").find(".current_tem").find(".current__value");
    var $currentPressure= $(".informations__second-city").find(".current_pres").find(".current__value");
    var $currentHumidity= $(".informations__second-city").find(".current_hum").find(".current__value");
    var day = moment.utc(initVC.dataSecondCityCurrent.fromDateTime, "YYYY-MM-DD HH:mm:ss");
    var dayNameOfWeek = day.format('dddd').charAt(0).toUpperCase() + day.format('dddd').slice(1);
    var dayDate = day.format('DD-MM-YYYY');
    var rate = initVC.dataSecondCityCurrent.indexes[0].description;
    var rateValue = initVC.dataSecondCityCurrent.indexes[0].value;
    var pm10 = initVC.dataSecondCityCurrent.values[2].value;
    var pm25 = initVC.dataSecondCityCurrent.values[1].value;
    var pm1 = initVC.dataSecondCityCurrent.values[0].value;
    var temperature = initVC.dataSecondCityCurrent.values[5].value;
    var pressure = initVC.dataSecondCityCurrent.values[3].value;
    var humidity = initVC.dataSecondCityCurrent.values[4].value;

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

initVC.createChartSelected = function(labels, data, data2, display, type, label1, label2){
    var chart;
    if(data2 == false){
        chart = {
            type: type,
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
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label1,
                    borderColor: "#7b7f8e",
                    backgroundColor: "#7b7f8ea6",
                    fill: true,
                    data: data,
                }, 
                {
                    label: label2,
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

initVC.getDataFromFirstCity = function(url){
    $.ajax({
       url : url,
       dataType : "json"
    })
    .done(res => {
        console.log("Gdańsk");
        console.log(res);
        initVC.dataFirstCityCurrent = res.current;
        initVC.dataFirstCityHistory = res.history;
        initVC.dataFirstCityForecast = res.forecast;
        initVC.dataFirstCityHistory.forEach(function (value, i) {
            initVC.pm10FirstCityHistory[i] = initVC.dataFirstCityHistory[i].values[2].value;
            initVC.pm25FirstCityHistory[i] = initVC.dataFirstCityHistory[i].values[1].value;
            initVC.caqiFirstCityHistory[i] = initVC.dataFirstCityHistory[i].indexes[0].value;
            initVC.temperatureFirstCityHistory[i] = initVC.dataFirstCityHistory[i].values[5].value;

            initVC.datasFirstCityHistory[i] = moment.utc(initVC.dataFirstCityHistory[i].fromDateTime).format('DD/MM HH:mm');
        });
        initVC.dataFirstCityForecast.forEach(function (value, i) {
            initVC.pm10FirstCityForecast[i] = initVC.dataFirstCityForecast[i].values[0].value;
            initVC.pm25FirstCityForecast[i] = initVC.dataFirstCityForecast[i].values[1].value;
            initVC.caqiFirstCityForecast[i] = initVC.dataFirstCityForecast[i].indexes[0].value;

            initVC.datasFirstCityForecast[i] = moment.utc(initVC.dataFirstCityForecast[i].fromDateTime).format('DD/MM HH:mm');
        });

        initVC.setCurrentDataFirstCity();
        initVC.createGraphHistoricFirstCity(res);
        initVC.createGraphHistoricMinMax("first");
    });
}

initVC.createGraphHistoricMinMax = function(type){ 
    const arrMin = arr => Math.min(...arr);
    const arrMax = arr => Math.max(...arr);
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    var minCaquiHistory, minCaquiHistoryIndex, maxCaquiHistory, maxCaquiHistoryIndex, avgCaquiHistory, minArray, maxArray;
    if(type == "first" ){
        minCaquiHistory = arrMin(initVC.caqiFirstCityHistory);
        minCaquiHistoryIndex = initVC.caqiFirstCityHistory.indexOf(minCaquiHistory);
        maxCaquiHistory = arrMax(initVC.caqiFirstCityHistory);
        maxCaquiHistoryIndex = initVC.caqiFirstCityHistory.indexOf(maxCaquiHistory);
        avgCaquiHistory = arrAvg(initVC.caqiFirstCityHistory).toFixed(2);;
        minArray = Array(initVC.caqiFirstCityHistory.length).fill(null);    
        maxArray = Array(initVC.caqiFirstCityHistory.length).fill(null); 
        avgArray = Array(initVC.caqiFirstCityHistory.length).fill(avgCaquiHistory); 
        initVC.minArrayFirst= Array(initVC.caqiFirstCityHistory.length).fill(null); 
        initVC.minArrayFirst[minCaquiHistoryIndex] = minCaquiHistory;
        initVC.maxArrayFirst= Array(initVC.caqiFirstCityHistory.length).fill(null); 
        initVC.maxArrayFirst[maxCaquiHistoryIndex] = maxCaquiHistory;
        initVC.avgArrayFirst = avgArray;
    }
    else if(type == "second" ){
        minCaquiHistory = arrMin(initVC.caqiSecondCityHistory);
        minCaquiHistoryIndex = initVC.caqiSecondCityHistory.indexOf(minCaquiHistory);
        maxCaquiHistory = arrMax(initVC.caqiSecondCityHistory);
        maxCaquiHistoryIndex = initVC.caqiSecondCityHistory.indexOf(maxCaquiHistory);
        avgCaquiHistory = arrAvg(initVC.caqiSecondCityHistory).toFixed(2);;
        minArray = Array(initVC.caqiSecondCityHistory.length).fill(null);    
        maxArray = Array(initVC.caqiSecondCityHistory.length).fill(null); 
        avgArray = Array(initVC.caqiSecondCityHistory.length).fill(avgCaquiHistory);
        initVC.minArraySecond= Array(initVC.caqiSecondCityHistory.length).fill(null);
        initVC.minArraySecond[minCaquiHistoryIndex] = minCaquiHistory;
        initVC.maxArraySecond= Array(initVC.caqiFirstCityHistory.length).fill(null); 
        initVC.maxArraySecond[maxCaquiHistoryIndex] = maxCaquiHistory;
        initVC.avgArraySecond = avgArray;
    }
    if(type != "comparison"){
        minArray[minCaquiHistoryIndex] = minCaquiHistory;
        maxArray[maxCaquiHistoryIndex] = maxCaquiHistory;

        var chart;
        chart = {
            type: 'line',
            data: {
                datasets: [
                    {
                    label: 'Wartość średnia',
                    data: avgArray,
                    fill: false,
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
                labels: initVC.datasFirstCityHistory
            },
            options: {
                legend: {
                    display: true
                }
            }
        };
    }

    
    var chartComparison;
    chartComparison = {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Wartość średnia ' + initVC.firstCity,
                    data: initVC.avgArrayFirst,
                    fill: false,
                    type: 'line'
                },
                {
                    label: 'Wartość średnia ' + initVC.secondCity,
                    data: initVC.avgArraySecond,
                    fill: false,
                    type: 'line',
                    backgroundColor: "#a7a7b1",
                    borderColor: "#a7a7b1",
                },
                {
                    label: 'Maximum ' + initVC.firstCity,
                    backgroundColor: "rgb(48, 134, 204)",
                    pointBackgroundColor: "rgb(48, 134, 204)",
                    pointBorderColor: "#55bae7",
                    data: initVC.maxArrayFirst
                },
                {
                    label: 'Maximum ' + initVC.secondCity,
                    backgroundColor: "#00495f",
                    pointBackgroundColor: "#00495f",
                    pointBorderColor: "#00495f",
                    data: initVC.maxArraySecond
                },
                {
                    label: 'Minimum ' + initVC.firstCity,
                    backgroundColor: "#18e02a",
                    pointBackgroundColor: "#18e02a",
                    pointBorderColor: "#18e02a",
                    data: initVC.minArrayFirst
                },
                {
                    label: 'Minimum ' + initVC.secondCity,
                    backgroundColor: "#00a20f",
                    pointBackgroundColor: "#00a20f",
                    pointBorderColor: "#00a20f",
                    data: initVC.minArraySecond
                },
            ],
            labels: initVC.datasFirstCityHistory
        },
        options: {
            legend: {
                display: true
            }
        }
    };
    if(type == "first"){
        initVC.destroyChart(initVC.chartHistoryMinMax);
        initVC.chartHistoryMinMax = new Chart(initVC.chartFirstCityHistoryIndexMinMax, chart);
    }
    else if(type == "second"){
        initVC.destroyChart(initVC.chartHistoryMinMaxSecond);
        initVC.chartHistoryMinMaxSecond = new Chart(initVC.chartSecondCityHistoryIndexMinMax, chart);
    }
    else{
        initVC.destroyChart(initVC.chartHistoryMinMaxComp);
        initVC.chartHistoryMinMaxComp = new Chart(initVC.chartHistoryIndexMinMaxComp, chartComparison);
    }
}


initVC.createGraphHistoricFirstCity = function(res){ 
    var lineChartDataPmHistory = initVC.createChartSelected(initVC.datasFirstCityHistory, initVC.pm25FirstCityHistory, initVC.pm10FirstCityHistory, true, 'line', 'PM25', 'PM10');
    var lineChartDataPmHistoryForecast = initVC.createChartSelected(initVC.datasFirstCityForecast, initVC.pm25FirstCityForecast, initVC.pm10FirstCityForecast, true, 'line', 'PM25', 'PM10');

    initVC.destroyChart(initVC.chartHistory);
    initVC.destroyChart(initVC.chartForecast);
    initVC.chartHistory = new Chart(initVC.chartFirstCityHistoryIndex, lineChartDataPmHistory);
    initVC.chartForecast = new Chart(initVC.chartFirstCityForecastIndex, lineChartDataPmHistoryForecast);
};

initVC.createGraphHistoricSecondCity = function(res){ 
    var lineChartDataPmHistory = initVC.createChartSelected(initVC.datasSecondCityHistory, initVC.pm25SecondCityHistory, initVC.pm10SecondCityHistory, true, 'line', 'PM25', 'PM10');
    var lineChartDataPmHistoryForecast = initVC.createChartSelected(initVC.datasSecondCityForecast, initVC.pm25SecondCityForecast, initVC.pm10SecondCityForecast, true, 'line', 'PM25', 'PM10');

    initVC.destroyChart(initVC.chartHistorySecond);
    initVC.destroyChart(initVC.chartForecastSecond);
    initVC.chartHistorySecond = new Chart(initVC.chartSecondCityHistoryIndex, lineChartDataPmHistory);
    initVC.chartForecastSecond = new Chart(initVC.chartSecondCityForecastIndex, lineChartDataPmHistoryForecast);
};

initVC.destroyChart = function(chart){
    if(chart != undefined){
        chart.destroy();
    }
}

initVC.createChartFirstCity = function(chartData, chartPlace){
    if(chartPlace == "history"){
        initVC.chartHistory.destroy();
	    initVC.chartHistory = new Chart(initVC.chartFirstCityHistoryIndex, chartData);
    }
    else if(chartPlace == "forecast"){
        initVC.chartForecast.destroy();
	    initVC.chartForecast = new Chart(initVC.chartFirstCityForecastIndex, chartData);
    }
}

initVC.createChartSecondCity = function(chartData, chartPlace){
    if(chartPlace == "history"){
        initVC.chartHistorySecond.destroy();
	    initVC.chartHistorySecond = new Chart(initVC.chartSecondCityHistoryIndex, chartData);
    }
    else if(chartPlace == "forecast"){
        initVC.chartForecastSecond.destroy();
	    initVC.chartForecastSecond = new Chart(initVC.chartSecondCityForecastIndex, chartData);
    }
}

initVC.createChartComparison = function(chartData, chartPlace){
    if(chartPlace == "history"){
        initVC.chartHistoryComp.destroy();
	    initVC.chartHistoryComp = new Chart(initVC.chartHistoryIndexComp, chartData);
    }
    else if(chartPlace == "forecast"){
        initVC.chartForecastComp.destroy();
	    initVC.chartForecastComp = new Chart(initVC.chartForecastIndexComp, chartData);
    }
}

initVC.getData = function(url){
    $.ajax({
        url : url,
        dataType : "json"
    })
    .done(res => {
        this.buildList(res)
    })
    .fail(function(error) { console.log(error) });
}

initVC.getDataFromSecondCity = function(url){
    $.ajax({
        url : url,
        dataType : "json"
    })
    .done(res => {
        initVC.dataSecondCityCurrent = res.current;
        initVC.dataSecondCityHistory = res.history;
        initVC.dataSecondCityForecast = res.forecast;
        initVC.dataSecondCityHistory.forEach(function (value, i) {
            initVC.pm10SecondCityHistory[i] = initVC.dataSecondCityHistory[i].values[2].value;
            initVC.pm25SecondCityHistory[i] = initVC.dataSecondCityHistory[i].values[1].value;
            initVC.caqiSecondCityHistory[i] = initVC.dataSecondCityHistory[i].indexes[0].value;
            initVC.temperatureSecondCityHistoryy[i] = initVC.dataSecondCityHistory[i].values[5].value;

            initVC.datasSecondCityHistory[i] = moment.utc(initVC.dataSecondCityHistory[i].fromDateTime).format('DD/MM HH:mm');
        });
        initVC.dataSecondCityForecast.forEach(function (value, i) {
            initVC.pm10SecondCityForecast[i] = initVC.dataSecondCityForecast[i].values[0].value;
            initVC.pm25SecondCityForecast[i] = initVC.dataSecondCityForecast[i].values[1].value;
            initVC.caqiSecondCityForecast[i] = initVC.dataSecondCityForecast[i].indexes[0].value;

            initVC.datasSecondCityForecast[i] = moment.utc(initVC.dataSecondCityForecast[i].fromDateTime).format('DD/MM HH:mm');
        });
        initVC.setCurrentDataSecondCity();
        initVC.createGraphHistoricSecondCity(res);
        initVC.createGraphHistoricMinMax("second");
    });
}

initVC.init();



