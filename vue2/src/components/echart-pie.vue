<template>
<div class="about">
  <div class="echarts" ref="echarts"></div>
</div>
</template>

<script>
/* eslint-disable */
const echarts = require('echarts');

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
        right: 50,
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 25,
        data: ['<=1M', '1-3M', '3-6M', '6M-1Y', '>=1Y']
      },
      series: [{
        type: 'pie',
        name: '访问来源',
        center: ['35%', '50%'],
        radius: ['25%', '35%'],
        label: {
          show: false,
        },
        labelLine: {
          show: false
        },
        hoverOffset: 5,
        data: [{
            name: '<=1M',
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
            }
          },
          {
            name: '1-3M',
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
            name: '3-6M',
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
            name: '6M-1Y',
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
          },
          {
            name: '>=1Y',
            value: 1548,
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
