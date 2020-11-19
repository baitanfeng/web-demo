<template>
<div class="about">
  <div class="echarts" ref="echarts"></div>
</div>
</template>

<script>
/* eslint-disable */
// const echarts = require('echarts');
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

const data1 = [],
  data2 = [],
  data3 = [],
  data4 = [],
  data5 = [];
const date = [];
let base = +new Date(2020, 2, 5);
const oneDay = 24 * 3600 * 1000;

for (let i = 0; i < 365; i++) {
  const now = new Date(base += oneDay);
  if (i === 0) {
    date.push({
      value: [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
      textStyle: {
        align: 'left'
      }
    });
  } else if (i === 364) {
    date.push({
      value: [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
      textStyle: {
        align: 'right'
      }
    });
  } else {
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
  }

  data1.push(Math.round(Math.random() * 30) + 60);
  data2.push(Math.round(Math.random() * 30) + 80);
  data3.push(Math.round(Math.random() * 30) + 100);
  data4.push(Math.round(Math.random() * 30) + 120);
  data5.push(Math.round(Math.random() * 30) + 140);
};

export default {
  name: 'About',
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
          <span style="display: inline-block; width: 10px; height: 10px; background-color: #eee;"></span> {a4} <span style="color: grey; font-size: 10px;">{c4}亿元</span> <br/>
          <span style="display: inline-block; width: 10px; height: 10px; background-color: #ccc;"></span> {a3} <span style="color: grey; font-size: 10px;">{c3}亿元</span> <br/>
          <span style="display: inline-block; width: 10px; height: 10px; background-color: #aaa;"></span> {a2} <span style="color: grey; font-size: 10px;">{c2}亿元</span> <br/>
          <span style="display: inline-block; width: 10px; height: 10px; background-color: #777;"></span> {a1} <span style="color: grey; font-size: 10px;">{c1}亿元</span> <br/>
          <span style="display: inline-block; width: 10px; height: 10px; background-color: #333;"></span> {a0} <span style="color: grey; font-size: 10px;">{c0}亿元</span> <br/>
        `
      },
      legend: {
        data: ['<=1M', '1-3M', '3-6M', '6M-1Y', '>=1Y'],

        left: '10',
        right: '10',
        top: 'bottom',

        padding: 0,
        itemWidth: 10,
        itemHeight: 10,
        selectedMode: false,
        icon: 'rect',

        formatter: name => `${name}${' '.repeat(4)}`,
      },
      grid: {
        left: '10',
        right: '10',
        top: '40',
        bottom: '40',

        containLabel: true,
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: date,
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          // interval: (index, value) => {
          //   return (
          //     index === 0 ||
          //     index === date.length - 1 ||
          //     index === Math.round(date.length / 2)
          //   );
          // },
          color: '#ccc',
          interval: 182,
          showMinLabel: true,
          showMaxLabel: true,
        },
      }],
      yAxis: [{
        type: 'value',
        name: '亿',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false
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
          type: 'line',
          name: '<=1M',
          symbol: 'none',
          stack: '总量',
          itemStyle: {
            color: 'orangered'
          },
          areaStyle: {
            // color: 'orangered'
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'red' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#fff' // 100% 处的颜色
              }],
            }
          },
          data: data1
        },
        {
          type: 'line',
          name: '1-3M',
          symbol: 'none',
          stack: '总量',
          areaStyle: {},
          data: data2
        },
        {
          type: 'line',
          name: '3-6M',
          symbol: 'none',
          stack: '总量',
          areaStyle: {},
          data: data3
        },
        {
          type: 'line',
          name: '6M-1Y',
          symbol: 'none',
          stack: '总量',
          areaStyle: {},
          data: data4
        },
        {
          type: 'line',
          name: '>=1Y',
          symbol: 'none',
          stack: '总量',
          areaStyle: {},
          data: data5
        }
      ]
    };

    myChart.setOption(option);
  },
};
</script>

<style>
.echarts {
  width: 100vw;
  height: 400px;
}
</style>
