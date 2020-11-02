<template>
<div class="about">
  <div class="echarts" ref="echarts"></div>
</div>
</template>

<script>
/* eslint-disable */
const echarts = require('echarts');

const data1 = [],
  data2 = [],
  data3 = [],
  data4 = [],
  data5 = [];
const date = [];
let base = Date.now();
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

  data1.push(Math.round(Math.random() * 30) + 100);
  data2.push(Math.round(Math.random() * 15) + 10);
  data3.push(Math.round(Math.random() * 15) + 40);
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
            color: '#ccc',
            type: 'dashed',
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

          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <span style="display: inline-block; width: 10px; height: 10px; background-color: #aaa;"></span>
            <div style="flex: 1; display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding-left: 5px;">
              <span style="padding-right: 30px;">{a0}</span>
              <span style="color: grey; font-size: 10px;">{c0}亿元</span>
            </div>
          </div>

          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <span style="display: inline-block; width: 10px; height: 10px; background-color: #eee;"></span>
            <div style="flex: 1; display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding-left: 5px;">
              <span style="padding-right: 30px;">{a2}</span>
              <span style="color: grey; font-size: 10px;">{c2}%</span>
            </div>
          </div>

          <div style="display: flex; align-items: center;">
            <span style="display: inline-block; width: 10px; height: 10px; background-color: #ccc;"></span>
            <div style="flex: 1; display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding-left: 5px;">
              <span style="padding-right: 30px;">{a1}</span>
              <span style="color: grey; font-size: 10px;">{c1}%</span>
            </div>
          </div>
        `
      },
      legend: {
        data: ['活期存款总规模', '活期存款加权利率', '活期FTP'],
        // data: [{
        //   name: '活期存款总规模',
        //   icon: 'path://M0 0 L10 0 L10 10 L0 10 Z'
        // }, {
        //   name: '活期存款加权利率',
        //   icon: 'path://M0 0 L30 0 L30 5 L0 5 Z'
        // }, {
        //   name: '活期FTP',
        //   icon: 'path://M0 0 L30 0 L30 5 L0 5 Z'
        // }],

        // left: '10',
        // right: '10',
        top: 'bottom',
        // align: 'center',

        padding: 0,
        itemGap: 25,
        itemWidth: 10,
        itemHeight: 10,
        selectedMode: false,
        icon: 'rect',

        // formatter: name => `${name}${' '.repeat(4)}`,
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
        // splitLine: {
        //   lineStyle: {
        //     type: 'dashed'
        //   }
        // },
        max: 150
      }, {
        type: 'value',
        name: '%',
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
          show: false,
        },
        max: 100,
      }],
      series: [{
          type: 'line',
          name: '活期存款总规模',
          // symbol: 'none',
          showSymbol: false,
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
          name: '活期存款加权利率',
          // symbol: 'none',
          showSymbol: false,
          data: data2,
          yAxisIndex: 1,
        },
        {
          type: 'line',
          name: '活期FTP',
          // symbol: 'none',
          showSymbol: false,
          data: data3,
          yAxisIndex: 1,
        },
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
  justify-content: space-between;
}
</style>
