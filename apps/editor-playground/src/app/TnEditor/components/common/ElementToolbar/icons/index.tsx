import { ElementTypeEnum } from '../../../../constants';
import {
  TextIcon,
  HeadingIcon,
  ListBulletIcon,
  CodeIcon,
  CheckboxIcon,
} from '@radix-ui/react-icons';
export const ElementFloatIcon: Record<ElementTypeEnum, React.ReactNode> = {
  [ElementTypeEnum.P]: <TextIcon />,
  [ElementTypeEnum.Heading]: <HeadingIcon />,
  [ElementTypeEnum.Ul]: <ListBulletIcon />,
  [ElementTypeEnum.Code]: <CodeIcon />,
  [ElementTypeEnum.TODO]: <CheckboxIcon />,
};
