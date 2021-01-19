# example

## 使用dataset  

series: 只写有什么类型的series
dataset:{source[]} source里的第一列是x轴 其他是数据 

```javascript
   return {
      title: {
        text: '销量排行',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
        },
      ],
      dataset: {
        source: [
          ['衬衫', 5],
          ['羊毛衫', 20],
          ['雪纺衫', 36],
          ['裤子', 10],
          ['高跟鞋', 10],
          ['袜子', 20],
        ],
      },
    };
```





