<template>
<div class="about">
  <div class="echarts" ref="echarts"></div>
</div>
</template>

<script>
/* eslint-disable */
const echarts = require('echarts');

const map = new Map([
  ['普通活期存款', 335],
  ['三方存管业务沉淀活期', 310],
  ['托管业务沉淀活期', 234],
  ['约期存款', 135],
]);

export default {
  name: 'About',
  mounted() {
    const myChart = echarts.init(this.$refs.echarts);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: `
          {b} <br/>{c} <span style="color: orange">亿元</span>
        `
      },
      legend: {
        orient: 'vertical',
        top: 'middle',
        right: 40,
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 25,
        data: ['普通活期存款', '三方存管业务沉淀活期', '托管业务沉淀活期', '约期存款'],
        selectedMode: false,
        formatter: function (value) {
          return `${value}\n{grey|${map.get(value)}亿元}`;
        },
        textStyle: {
          rich: {
            grey: {
              color: '#ccc',
              lineHeight: 20
            }
          }
        },
        icon: 'circle',
      },
      series: [{
        type: 'pie',
        name: '访问来源',
        center: ['25%', '50%'],
        radius: ['25%', '35%'],
        label: {
          show: false,
        },
        labelLine: {
          show: false
        },
        hoverOffset: 5,
        data: [{
            name: '普通活期存款',
            value: 335,
            itemStyle: {
              color: '#000',
              borderColor: '#fff',
              borderWidth: 3
            },
            emphasis: {
              itemStyle: {
                color: '#666'
              }
            },
          },
          {
            name: '三方存管业务沉淀活期',
            value: 310,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 3
            },
            emphasis: {
              itemStyle: {
                color: '#666'
              }
            }
          },
          {
            name: '托管业务沉淀活期',
            value: 234,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 3
            },
            emphasis: {
              itemStyle: {
                color: '#666'
              }
            }
          },
          {
            name: '约期存款',
            value: 135,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 3
            },
            emphasis: {
              itemStyle: {
                color: '#666'
              }
            }
          }
        ]
      }]
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
