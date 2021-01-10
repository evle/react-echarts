import React, {
  useRef,
  useEffect,
  CSSProperties,
  memo,
  useCallback,
} from 'react';
import useWindowSize from './Hooks/useWindowSize';
import * as echarts from 'echarts';

type Theme = 'light' | 'dark';

export interface IEchartOpts {
  devicePixelRatio?: number;
  renderer?: string;
  width?: number | string;
  height?: number | string;
}

export interface IReactEchartsOpts {
  options: echarts.EChartOption;
  theme?: Theme;
  style?: CSSProperties;
  echartOpts?: IEchartOpts;
}

function ReactEcharts(ReactEchartsOpts: IReactEchartsOpts) {
  const {
    options = {},
    theme = 'light',
    echartOpts = {},
    style = { height: '100%', width: '100%' },
  } = ReactEchartsOpts;
  const echartElement = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const getEchartInstance = useCallback(() => {
    return (
      (echartElement.current &&
        echarts.getInstanceByDom(echartElement.current)) ||
      echarts.init(echartElement.current as HTMLDivElement, theme, echartOpts)
    );
  }, [theme, echartOpts]);

  const render = useCallback(() => {
    const echartInstance = getEchartInstance();
    echartInstance.setOption(options);
  }, [options, getEchartInstance]);

  useEffect(() => {
    const echartInstance = getEchartInstance();
    echartInstance.resize();
  }, [windowSize.height, windowSize.width, getEchartInstance]);

  useEffect(() => {
    render();
  }, [options, render]);

  useEffect(() => {
    const el = echartElement.current;
    return () => {
      el && echarts.dispose(el);
    };
  }, []);

  return <div ref={echartElement} style={style} />;
}

export default memo(ReactEcharts);
