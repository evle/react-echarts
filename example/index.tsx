import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactEchart from '../dist';
import { useRef } from 'react';

const App = () => {
  const option = React.useMemo(() => {
    return {
      aa: 1,
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
  }, []);

  const style = React.useMemo(() => {
    return { height: 300, width: '100%' };
  }, []);

  const onClick = e => {
    console.log(e);
  };

  const ref = useRef();

  React.useEffect(() => {
    console.log('ref current', ref.current);
    ref.current!.on('click', e => {
      console.log(e);
    });
  }, []);

  return (
    <ReactEchart
      getRef={ref}
      options={option}
      style={style}
      getInstance={instance => {
        ref.current = instance;
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
