import { Icon as BaseIcon, IconProps } from '@rneui/base'

const Icon: React.FC<IconProps> = (props) => {
  return <BaseIcon type="material-community" size={25} {...props} />
}

export default Icon
