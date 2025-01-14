import { ActivitySteps } from './Steps'
import { Modal } from 'antd'
import './index.less'

export const showProgressDialog = ({ activityId }: { activityId: number }) => {
  Modal.confirm({
    centered: true,
    title: '',
    icon: <></>,
    className: 'min-w-[1200px] progress-confirm-dialog',

    styles: {
      content: {
        width: '100%',
      },
      body: { height: '100%' },
    },
    cancelButtonProps: { hidden: true },
    content: <ActivitySteps activityId={activityId}></ActivitySteps>,
  })
}
