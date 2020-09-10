<template>
<div class="about">
  <div class="echarts" ref="echarts"></div>
</div>
</template>

<script>
/* eslint-disable */
const echarts = require('echarts');

const data = [
  '中国工商银行有限公司',
  '中国兴业银行有限公司',
  '中国银行股份有限公司',
  '中信银行股份有限公司',
  '浙商银行股份有限公司',
  '上海银行股份有限公司'
];

export default {
  name: 'About',
  data() {
    return {
      currentDataIndex: 2,
    }
  },
  mounted() {
    const myChart = echarts.init(this.$refs.echarts);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#ccc'
          }
        },
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        textStyle: {
          color: '#000',
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
        // position: (pos, params, dom, rect, size) => {
        //   const obj = {
        //     top: 30
        //   };
        //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = '50vw';
        //   return obj;
        // }
        formatter: `
          {b} <br/>
          <span style="display: inline-block; width: 10px; height: 10px; background-color: violet;"></span> {a4} <span style="color: grey; font-size: 10px;">{c4}亿元</span> <br/>
          <span style="display: inline-block; width: 10px; height: 10px; background-color: green;"></span> {a3} <span style="color: grey; font-size: 10px;">{c3}亿元</span> <br/>
          <span style="display: inline-block; width: 10px; height: 10px; background-color: blue;"></span> {a2} <span style="color: grey; font-size: 10px;">{c2}亿元</span> <br/>
          <span style="display: inline-block; width: 10px; height: 10px; background-color: red;"></span> {a1} <span style="color: grey; font-size: 10px;">{c1}亿元</span> <br/>
          <span style="display: inline-block; width: 10px; height: 10px; background-color: #000;"></span> {a0} <span style="color: grey; font-size: 10px;">{c0}亿元</span> <br/>
        `
      },
      legend: {
        data: ['1M', '3M', '6M', '9M', '1Y'],
        top: 'bottom',
        itemWidth: 10,
        itemHeight: 10,
        formatter: name => `${name}${' '.repeat(4)}`,
      },
      grid: {
        left: '10',
        right: '40',
        bottom: '40',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: data,
        silent: true,
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: (value, index) => {
            return this.currentDataIndex === index ? '#666' : '#ccc';
          },
          formatter: (value, index) => {
            const len = value.length;
            let res = '';

            if (len <= 4) {
              res = `${value}`;
            } else if (len <= 8) {
              res = `${value.slice(0, 4)}\n${value.slice(4)}`;
            } else {
              res = `${value.slice(0, 4)}\n${value.slice(4, 6)}...`;
            }

            return `${res}\n${index + 3}/140`
          },
        },
      }],
      yAxis: [{
        type: 'value',
        name: '亿',
        axisLine: {
          show: false,
        },
        axisTick: {
          lineStyle: {
            color: '#ccc',
          }
        },
        axisLabel: {
          color: 'lightgrey'
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
      }],
      series: [{
          type: 'bar',
          name: '1M',
          itemStyle: {
            color: '#000'
          },
          stack: '交易量',
          data: [620, 732, 701, 734, 1090, 600]
        },
        {
          type: 'bar',
          name: '3M',
          itemStyle: {
            color: 'red'
          },
          stack: '交易量',
          data: [120, 132, 101, 134, 290, 350]
        },
        {
          type: 'bar',
          name: '6M',
          itemStyle: {
            color: 'blue'
          },
          stack: '交易量',
          data: [60, 72, 71, 74, 190, 260]
        },
        {
          type: 'bar',
          name: '9M',
          itemStyle: {
            color: 'green'
          },
          stack: '交易量',
          data: [62, 82, 91, 84, 109, 160]
        },
        {
          type: 'bar',
          name: '1Y',
          itemStyle: {
            color: 'violet'
          },
          barWidth: 15,
          stack: '交易量',
          data: [62, 82, 91, 84, 109, 175]
        }
      ]
    };

    myChart.setOption(option);
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: this.currentDataIndex,
      position: (pos, params, dom, rect, size) => {
        const obj = {
          top: 60
        };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
        return obj;
      }
    });
    // myChart.on('click', params => {
    //   this.currentDataIndex = params.dataIndex;
    //   myChart.setOption(option);
    // });
  },
};
</script>

<style>
.echarts {
  width: 100vw;
  height: 400px;
}
</style>
