import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SSOWeb from '@mtfe/sso-web'
import { EnvEnum, getEnv } from '@/common'
import './style.less'
const isTest = getEnv() === EnvEnum.Test

console.log('front env is test:', isTest)

if (!isTest) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  const ssoWeb = new (SSOWeb as any)({
    clientId: 'da53633d7f',
    accessEnv: 'test',
  }) as any

  ssoWeb.login().then((ssoid: any) => {
    if (ssoid && typeof ssoid === 'string') {
      ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      )
    } else {
      console.log('ssoid:', ssoid)
    }
  })
}
