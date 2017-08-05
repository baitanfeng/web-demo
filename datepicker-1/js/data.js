(function(){
  let datepicker = {};

  datepicker.getMonthData = function(year = new Date().getFullYear(), month = new Date().getMonth() + 1){
    let ret = [];
    let firstDateCurrMonth = new Date(year, month - 1, 1),
      lastDateCurrMonth = new Date(year, month, 0),
      lastDatePrevMonth = new Date(year, month - 1, 0);

    let lastDateDateCurrMonth = lastDateCurrMonth.getDate(),
      lastDateDatePrevMonth = lastDatePrevMonth.getDate();

    let firstDayCurrMonth = firstDateCurrMonth.getDay();
    if(firstDayCurrMonth === 0) firstDayCurrMonth = 7;

    let date = 0,
      showDate = 0,
      showDayCountPrevMonth = firstDayCurrMonth - 1;
    for(let i = 0; i < 42; i++){
      date = -showDayCountPrevMonth + i + 1;

      showDate = date;
      if(date <= 0){
        //prev month
        showDate = date + lastDateDatePrevMonth;
      }else if(date > lastDateDateCurrMonth){
        //next month
        showDate = date - lastDateDateCurrMonth;
      }

      ret.push({date: date, showDate: showDate});
    }

    return ret;
  };

  datepicker.init = function(year, month){
    let monthData = datepicker.getMonthData();
    console.log(monthData);
  };

  window.datepicker = datepicker;
})();