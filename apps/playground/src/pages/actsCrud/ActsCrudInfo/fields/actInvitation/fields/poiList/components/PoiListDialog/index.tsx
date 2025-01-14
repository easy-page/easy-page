import { getTablePageinationConfig } from '@/common';
import { loadPoiListToModel, poiListModel } from '@/common/models';
import { Button, Modal, Table } from 'antd';
import { observer } from 'mobx-react';
import { PoiListFilter } from '../../filter';
import { useEffect } from 'react';
export type PoiListDialogProps = {
  actId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const PoiListDialog = observer(
  ({ actId, open, setOpen }: PoiListDialogProps) => {
    const { data, loading, pageNo, pageSize, total } = poiListModel.getList();
    useEffect(() => {
      loadPoiListToModel(actId);
    }, [actId, pageNo, pageSize]);
    return (
      <Modal
        destroyOnClose={false}
        open={open}
        className="min-w-[900px] h-[600px]  overflow-hidden"
        styles={{
          content: { height: '100%', display: 'flex', flexDirection: 'column' },
          body: { flex: 1, overflow: 'hidden' },
        }}
        onCancel={() => setOpen(false)}
        closable
        footer={
          <div className="flex flex-row justify-end">
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              关闭
            </Button>
          </div>
        }
        onClose={() => setOpen(false)}
        title="查看商家名单"
      >
        <PoiListFilter actId={actId} />
        <Table
          dataSource={data}
          className="mt-4"
          loading={loading}
          pagination={getTablePageinationConfig({
            pageNo,
            pagination: {
              pageSize,
            },
            total,
            model: poiListModel,
          })}
          scroll={{
            y: 280,
          }}
          columns={[
            {
              title: '序号',
              render: (_, __, idx) => `${idx + 1}`,
            },
            {
              dataIndex: 'poiId',
              title: '门店 ID',
            },
            {
              dataIndex: 'poiBrandId',
              title: '业务品牌 ID',
            },
          ]}
        />
      </Modal>
    );
  },
);
