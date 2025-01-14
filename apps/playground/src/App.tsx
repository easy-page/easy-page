import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
// import '@/libs/elink';
import './App.css'
import { Main } from './pages/planAndActList'
import { UrlEnum } from './common/routes'
import { RootContainer, MccKeysEnum, UsedContainerMccKeys } from './common'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { PlansCrud } from './pages/plansCrud'
import { ActsCrud } from './pages/actsCrud'
import { PlanDetail } from './pages/planDetails'
import { ActApplyResult } from './pages/actApplyResult'
import { ActConfirmGoods } from './pages/actConfirmGoods'
import './style.less'
import { BatchConfirmSubsidy } from './pages/batchConfirmSubsidy'
import { KaConfirmResult } from './pages/kaConfirmResult'

dayjs.locale('zh-cn')

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <RootContainer mccKeys={UsedContainerMccKeys}>
          <Routes>
            <Route path="/" element={<Navigate to={UrlEnum.PlanAndAct} />} />
            <Route path={UrlEnum.PlanAndAct} element={<Main></Main>}></Route>
            <Route path={UrlEnum.CrudAct} element={<ActsCrud />}></Route>
            <Route path={UrlEnum.CrudPlan} element={<PlansCrud />}></Route>
            <Route path={UrlEnum.PlanDetail} element={<PlanDetail />}></Route>
            <Route
              path={UrlEnum.BatchConfirmSubsidy}
              element={<BatchConfirmSubsidy />}
            ></Route>
            <Route
              path={UrlEnum.ActApplyResult}
              element={<ActApplyResult />}
            ></Route>
            <Route
              path={UrlEnum.ActConfirmGoods}
              element={<ActConfirmGoods />}
            ></Route>
            <Route
              path={UrlEnum.KaConfirmResult}
              element={<KaConfirmResult />}
            ></Route>
          </Routes>
        </RootContainer>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
