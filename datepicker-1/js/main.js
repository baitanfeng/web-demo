(function(){
  let datepicker = window.datepicker;

  datepicker.buildUI = function(year, month){
    let monthData = datepicker.getMonthData(year, month);
    let year=monthData.year,
      month=monthData.month;
      month=month<10?'0'+month:month;
    let html = `
          <div class="ui-datepicker-header">
            <a href="javascript:;" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>
            <a href="javascript:;" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>
            <span class="ui-datepicker-curr-month">${monthData.year}-${monthData.month < 10 ? '0' + monthData.month : monthData.month}</span>
          </div>
          <div class="ui-datepicker-body">
            <table>
              <thead>
              <tr>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
                <th>日</th>
              </tr>
              </thead>
              <tbody>`;

    monthData.days.forEach((value, index) =>{
      if(index % 7 === 0) html += '<tr>';
      html += `<td data-date="${value.date}" class="${value.isCurrMonth ? '' : 'mute'}">${value.showDate}</td>`;
      if(index % 7 === 6) html += '</tr>';
    });

    html += `</tbody>
            </table>
          </div>`;

    return html;
  };

  datepicker.init = function(dom){
    let html = datepicker.buildUI();
    dom.innerHTML = html;
  }
})();