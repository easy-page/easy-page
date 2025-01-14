import {
  canEditGoodInfo,
  CanEditGoodInfoOption,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'

export const csCanEditGoodInfo = nodeUtil.extends(
  canEditGoodInfo({
    options: [
      CanEditGoodInfoOption.ProductName,
      CanEditGoodInfoOption.ProductWeight,
    ],
  }),
  {
    postprocess: () => {
      return ({ value }) => {
        return {
          'applyControl.canModifyProduct': value,
        }
      }
    },
  }
)
// .appendChildren([
//   // nodeUtil.createNode(
//   //   CanEditGoodInfoOption.ProductPrice,
//   //   {
//   //     name: '商品价格',
//   //   },
//   //   {
//   //     checkBox: {
//   //       disabled: true,
//   //     },
//   //   }
//   // ),
//   nodeUtil.createNode(
//     CanEditGoodInfoOption.ProductName,
//     {
//       name: '商品名称',
//     },
//   ),
//   nodeUtil.createNode(
//     CanEditGoodInfoOption.ProductWeight,
//     {
//       name: '商品重量',
//     },
//     {
//       checkBox: {
//         disabled: true,
//       },
//     }
//   ),
//   // nodeUtil.createNode(
//   //   CanEditGoodInfoOption.ProductMinOrderCount,
//   //   {
//   //     name: '',
//   //   },
//   //   {
//   //     checkBox: {
//   //       disabled: true,
//   //       customLabel: () => {
//   //         return (
//   //           <div className="flex flex-row items-center">
//   //             商品起购件数
//   //             <Tooltip
//   //               title={'不限制商家将商品起购件数改小，但改大将导致活动下线。'}
//   //             >
//   //               <QuestionCircleOutlined />
//   //             </Tooltip>
//   //           </div>
//   //         )
//   //       },
//   //     },
//   //   }
//   // ),
// ])
