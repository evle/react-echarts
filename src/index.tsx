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
  onEvent?: any;
  getInstance?: any;
}

function ReactEcharts(ReactEchartsOpts: IReactEchartsOpts) {
  const {
    options = {},
    theme = 'light',
    echartOpts = {},
    style = { height: '100%', width: '100%' },
    getInstance,
  } = ReactEchartsOpts;
  const echartElement = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const getEchartInstance = () => {
    if (!echartElement.current) {
      throw new Error('Cannot get echarts instance');
    }

    let instance = echarts.getInstanceByDom(echartElement.current);

    if (!instance) {
      instance = echarts.init(
        echartElement.current as HTMLDivElement,
        theme,
        echartOpts
      );

      getInstance(instance);
    }

    return instance;
  };

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
