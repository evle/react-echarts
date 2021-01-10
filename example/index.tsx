import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactEchart from '../.';

const App = () => {
  const [state, setState] = React.useState('第一个 ECharts 实例');
  const ref = React.useRef(0);
  const [s, ss] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      // alert(ref.current);
    }, 3000);
  }, []);

  const option = React.useMemo(() => {
    console.log('config rerender');
    return {
      title: {
        text: state,
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
  }, [state]);

  const style = React.useMemo(() => {
    return { height: 300, width: '100%' };
  }, []);

  return (
    <div style={{ backgroundColor: 'pink' }}>
      <button
        onClick={() => {
          setState(state + '1');
        }}
      >
        + 2
      </button>
      <button
        onClick={() => {
          ss(!s);
        }}
      >
        + ccc
      </button>
      {s ? <ReactEchart options={option} /> : null}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
