(function () {
    let datepicker = {},
        monthData,
        wrapper,
        isShow = false,
        dom

    window.datepicker = datepicker
    wrapper = document.createElement('div')
    wrapper.className = 'ui-datepicker-wrapper'
    wrapper.innerHTML = ''
    document.body.appendChild(wrapper)

    datepicker.init = function (input) {
        datepicker.render()

        dom = document.querySelector(input)
        isShow = false
        dom.addEventListener('click', handleDOMClick)
        wrapper.addEventListener('click', e => handleWrapperClick(e))
    }

    datepicker.render = function (year, month) {
        let html = datepicker.buildUI(year, month)
        wrapper.innerHTML = html
    }

    datepicker.buildUI = function (year, month) {
        monthData = datepicker.getMonthData(year, month)
        let html = `
          <div class="ui-datepicker-header">
            <div class="ui-datepicker-btn">
              <a href="javascript:;" class="ui-datepicker-prev-btn">&lt;</a>
              <a href="javascript:;" class="ui-datepicker-next-btn">&gt;</a>
            </div>
            <span class="ui-datepicker-curr-month">${monthData.year}年${monthData.month}月</span>
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
              <tbody>`

        monthData.days.forEach((value, index) => {
            if (index % 7 === 0) html += '<tr>'
            html += `<td data-date="${value.date}" class="${value.isCurrMonth ? '' : 'mute'}">${value.showDate}</td>`
            if (index % 7 === 6) html += '</tr>'
        })

        html += `</tbody>
            </table>
          </div>`

        return html
    }

    function handleDOMClick() {
        if (isShow) {
            hideDatePickerWrapper()
        } else {
            showDatePickerWrapper()
        }
    }

    function hideDatePickerWrapper() {
        wrapper.classList.remove('show')
        isShow = !isShow
    }

    function showDatePickerWrapper() {
        let left = dom.offsetLeft,
            top = dom.offsetTop,
            height = dom.offsetHeight

        wrapper.style.top = `${top + height + 2}px`
        wrapper.style.left = `${left}px`

        wrapper.classList.add('show')
        isShow = !isShow
    }

    function handleWrapperClick(e) {
        handlePrevNextClick(e)
        handleDateClick(e)
    }

    function handlePrevNextClick(e) {
        let target = e.target,
            year = monthData.year,
            month = monthData.month

        if (target.classList.contains('ui-datepicker-prev-btn')) {
            //prev month
            datepicker.render(year, --month)
        } else if (target.classList.contains('ui-datepicker-next-btn')) {
            //next month
            datepicker.render(year, ++month)
        }
    }

    function handleDateClick(e) {
        let target = e.target,
            year = monthData.year,
            month = monthData.month,
            date

        if (target.tagName !== 'TD') return
        date = new Date(year, month - 1, target.dataset.date)
        dom.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        hideDatePickerWrapper()
    }

    datepicker.getMonthData = function (year = new Date().getFullYear(), month = new Date().getMonth() + 1) {
        let ret = [],
            currDate = new Date(year, month - 1, 1)

        let firstDateCurrMonth = new Date(year, month - 1, 1),
            lastDateCurrMonth = new Date(year, month, 0),
            lastDatePrevMonth = new Date(year, month - 1, 0)

        let lastDateDateCurrMonth = lastDateCurrMonth.getDate(),
            lastDateDatePrevMonth = lastDatePrevMonth.getDate()

        let firstDayCurrMonth = firstDateCurrMonth.getDay()
        if (firstDayCurrMonth === 0) firstDayCurrMonth = 7

        let date = 0,
            showDate = 0,
            isCurrMonth = true,
            showDayCountPrevMonth = firstDayCurrMonth - 1
        for (let i = 0; i < 42; i++) {
            date = -showDayCountPrevMonth + i + 1

            showDate = date
            isCurrMonth = true
            if (date <= 0) {
                //prev month
                isCurrMonth = false
                showDate = date + lastDateDatePrevMonth
            } else if (date > lastDateDateCurrMonth) {
                //next month
                isCurrMonth = false
                showDate = date - lastDateDateCurrMonth
            }

            ret.push({
                date: date,
                showDate: showDate,
                isCurrMonth: isCurrMonth
            })
        }

        return {
            year: currDate.getFullYear(),
            month: currDate.getMonth() + 1,
            days: ret
        }
    }
})()