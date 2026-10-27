import React from 'react';
import { ConfigProvider, App } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
export const libraryTheme = {
  token: { motion: false, colorPrimary: '#1677ff', fontSize: 14, borderRadius: 6, controlHeight: 32,
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif' },
};
export function LibraryProvider({ children }) {
  return <ConfigProvider locale={zhCN} theme={libraryTheme}><App>{children}</App></ConfigProvider>;
}
