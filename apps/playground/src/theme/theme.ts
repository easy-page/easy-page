import { ThemeConfig, theme } from "antd";

export const DarkThemeConfig: ThemeConfig = {
  algorithm: [theme.darkAlgorithm],
  token: {
    colorPrimary: '#15cde6',
    colorSuccess: '#56ff01',
    colorInfo: '#01ffe1',
    colorTextBase: '#ffffff',
    colorBgBase: '#000000',
  }
}

export enum COLORS {
  BorderLeft = "#15B1C7"
}