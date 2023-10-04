import { Text as BaseText, TextProps } from '@rneui/base'
import { StyleSheet } from 'react-native'
import AppTheme from '../styles'

interface Typography extends TextProps {
  style?: object
}

const DisplayHeavy: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.displayHeavy, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const DisplayLight: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.displayLight, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const HeadlineHeavy: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.headlineHeavy, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const HeadlineLight: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.headlineLight, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const TitleHeavy: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.titleHeavy, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const TitleLight: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.titleLight, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const SubheaderHeavy: React.FC<Typography> = ({
  children,
  style,
  ...props
}) => {
  console.log(style)
  return (
    <BaseText style={{ ...styles.subheaderHeavy, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const SubheaderLight: React.FC<Typography> = ({
  children,
  style,
  ...props
}) => {
  return (
    <BaseText style={{ ...styles.subheaderLight, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const BodyHeavy: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.bodyHeavy, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const BodyLight: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.bodyLight, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const CaptionHeavy: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.captionHeavy, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const CaptionLight: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.captionLight, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const SmallHeavy: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.smallHeavy, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const SmallLight: React.FC<Typography> = ({ children, style, ...props }) => {
  return (
    <BaseText style={{ ...styles.smallLight, ...style }} {...props}>
      {children}
    </BaseText>
  )
}

const styles = StyleSheet.create({
  displayHeavy: {
    fontSize: 46,
    fontWeight: 'bold',
    color: AppTheme.colors.neutral_n500,
  },
  displayLight: { fontSize: 46, color: AppTheme.colors.neutral_n500 },
  headlineHeavy: {
    fontSize: 30,
    fontWeight: 'bold',
    color: AppTheme.colors.neutral_n500,
  },
  headlineLight: { fontSize: 30, color: AppTheme.colors.neutral_n500 },
  titleHeavy: {
    fontSize: 26,
    fontWeight: 'bold',
    color: AppTheme.colors.neutral_n500,
  },
  titleLight: { fontSize: 26, color: AppTheme.colors.neutral_n500 },
  subheaderHeavy: {
    fontSize: 22,
    fontWeight: 'bold',
    color: AppTheme.colors.neutral_n500,
  },
  subheaderLight: { fontSize: 22, color: AppTheme.colors.neutral_n500 },
  bodyHeavy: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppTheme.colors.neutral_n500,
  },
  bodyLight: { fontSize: 18, color: AppTheme.colors.neutral_n500 },
  captionHeavy: {
    fontSize: 14,
    fontWeight: 'bold',
    color: AppTheme.colors.neutral_n500,
  },
  captionLight: { fontSize: 14, color: AppTheme.colors.neutral_n500 },
  smallHeavy: {
    fontSize: 12,
    fontWeight: 'bold',
    color: AppTheme.colors.neutral_n500,
  },
  smallLight: { fontSize: 12, color: AppTheme.colors.neutral_n500 },
})

const Typography = {
  DisplayHeavy,
  DisplayLight,
  HeadlineHeavy,
  HeadlineLight,
  TitleHeavy,
  TitleLight,
  SubheaderHeavy,
  SubheaderLight,
  BodyHeavy,
  BodyLight,
  CaptionHeavy,
  CaptionLight,
  SmallHeavy,
  SmallLight,
}

export default Typography
