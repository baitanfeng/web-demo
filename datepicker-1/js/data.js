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
      isCurrMonth = true,
      showDayCountPrevMonth = firstDayCurrMonth - 1;
    for(let i = 0; i < 42; i++) {
      date = -showDayCountPrevMonth + i + 1;

      showDate = date;
      isCurrMonth = true;
      if(date <= 0) {
        //prev month
        isCurrMonth = false;
        showDate = date + lastDateDatePrevMonth;
      } else if(date > lastDateDateCurrMonth) {
        //next month
        isCurrMonth = false;
        showDate = date - lastDateDateCurrMonth;
      }

      ret.push({
        date: date,
        showDate: showDate,
        isCurrMonth: isCurrMonth
      });
    }

    return {
      year: year,
      month: month,
      days: ret
    };
  };

  window.datepicker = datepicker;
})();