import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ConfigProvider } from 'antd'

// import '@/libs/elink';

import './App.css'

import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import { ConfigList } from './pages/configList'
import { CrudConfig } from './pages/crudConfig'
import { UrlEnum } from './common/routes'
import { Home } from './pages/Home'
import { ConfigDiff } from './pages/configDiff'
import { BatchConfig } from './pages/batchConf'
import { OpLogs } from './pages/opLogs'
import { EditCliConfig } from './pages/editCliConfig'
import { PreviewRecord } from './pages/previewRecord'
import { ZsptData } from './pages/zsptData'
dayjs.locale('zh-cn')

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <Routes>
          <Route path="/" element={<Navigate to={UrlEnum.Home} />} />
          <Route path={UrlEnum.Home} element={<Home />} />
          <Route path={UrlEnum.PreviewRecord} element={<PreviewRecord />} />
          <Route path={UrlEnum.BatchConfig} element={<BatchConfig />} />
          <Route path={UrlEnum.LogList} element={<OpLogs />} />
          <Route path={UrlEnum.ConfigList} element={<ConfigList />} />
          <Route path={UrlEnum.ConfigDiff} element={<ConfigDiff />} />
          <Route path={UrlEnum.CrudConfig} element={<CrudConfig />} />
          <Route path={UrlEnum.EditCliConfig} element={<EditCliConfig />} />
          <Route path={UrlEnum.ZsptData} element={<ZsptData />} />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
