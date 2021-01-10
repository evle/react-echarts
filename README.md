# react echarts

feature:

- typescript support
- echarts v5.0 support
- build with react hooks

## Get started

```javascript
const App = () => {
  const option = React.useMemo(() => {
    return {
      title: {
        text: 'chart title',
      },
      tooltip: {},
      legend: {
        data: ['sales'],
      },
      xAxis: {
        data: ['apple', 'Banana', 'Cherry', 'Grape', 'Peach', 'Strawberry'],
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
  }, []);

  const style = React.useMemo(() => {
    return { height: 300, width: '100%' };
  }, []);

  return <ReactEchart options={option} style={style}/>
};
```
