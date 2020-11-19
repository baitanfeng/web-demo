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
        show: false,
      },
      series: [{
          name: '客户',
          type: 'funnel',
          minSize: 1,
          maxSize: '80%',
          sort: 'ascending',
          gap: 1,
          funnelAlign: 'right',
          label: {
            show: true,
            formatter: ' {orange|{c}}家',
            color: 'black',
            rich: {
              orange: {
                color: 'orange',
              }
            }
          },
          labelLine: {
            length: 110,
            lineStyle: {
              color: 'lightgrey',
            }
          },
          itemStyle: {
            opacity: 0,
          },
          top: 20,
          bottom: 20,
          right: '50%',
          data: [{
              value: 31,
              name: '战略客户',
            },
            {
              value: 272,
              name: '基石客户',
            },
            {
              value: 666,
              name: '价值客户',
            },
            {
              value: 1936,
              name: '普通客户',
            },
            {
              value: 3588,
              name: '其他客户',
            },
          ],
        },
        {
          name: '客户',
          type: 'funnel',
          minSize: 1,
          maxSize: '80%',
          sort: 'ascending',
          gap: 1,
          label: {
            show: false
          },
          itemStyle: {
            color: 'transparent',
            borderColor: 'white',
            borderWidth: 20,
          },
          top: 20,
          bottom: 20,
          data: [{
              value: 20,
              name: '战略客户',
            },
            {
              value: 40,
              name: '基石客户',
            },
            {
              value: 60,
              name: '价值客户',
            },
            {
              value: 80,
              name: '普通客户',
            },
            {
              value: 100,
              name: '其他客户',
            },
          ],
        },
        {
          name: '客户',
          type: 'funnel',
          minSize: 1,
          maxSize: '80%',
          sort: 'ascending',
          gap: 1,
          label: {
            show: true,
            position: 'left',
            color: 'black',
          },
          labelLine: {
            show: false,
            length: 30,
          },
          top: 20,
          bottom: 20,
          data: [{
              value: 20,
              name: '战略客户',
              itemStyle: {
                color: 'red'
              },
            },
            {
              value: 40,
              name: '基石客户',
              itemStyle: {
                color: 'orange'
              },
            },
            {
              value: 60,
              name: '价值客户',
              itemStyle: {
                color: 'yellow'
              },
            },
            {
              value: 80,
              name: '普通客户',
              itemStyle: {
                color: 'blue'
              },
            },
            {
              value: 100,
              name: '其他客户',
              itemStyle: {
                color: 'green'
              },
            },
          ],
        },
      ],
    };

    myChart.setOption(option);
  },
};
</script>

<style>
.echarts {
  width: 100vw;
  height: 228px;
}
</style>
