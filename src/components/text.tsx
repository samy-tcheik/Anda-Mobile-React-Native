import { Text as BaseText, TextProps } from '@rneui/base'
import { StyleSheet } from 'react-native'
import AppTheme from '../styles'

const DisplayHeavy: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.displayHeavy} {...props}>
      {children}
    </BaseText>
  )
}

const DisplayLight: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.displayLight} {...props}>
      {children}
    </BaseText>
  )
}

const HeadlineHeavy: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.headlineHeavy} {...props}>
      {children}
    </BaseText>
  )
}

const HeadlineLight: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.headlineLight} {...props}>
      {children}
    </BaseText>
  )
}

const TitleHeavy: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.titleHeavy} {...props}>
      {children}
    </BaseText>
  )
}

const TitleLight: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.titleLight} {...props}>
      {children}
    </BaseText>
  )
}

const SubheaderHeavy: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.subheaderHeavy} {...props}>
      {children}
    </BaseText>
  )
}

const SubheaderLight: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.subheaderLight} {...props}>
      {children}
    </BaseText>
  )
}

const BodyHeavy: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.bodyHeavy} {...props}>
      {children}
    </BaseText>
  )
}

const BodyLight: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.bodyLight} {...props}>
      {children}
    </BaseText>
  )
}

const CaptionHeavy: React.FC<TextProps> = ({ children, ...props }) => {
  return <BaseText style={styles.captionHeavy}>{children}</BaseText>
}

const CaptionLight: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.captionLight} {...props}>
      {children}
    </BaseText>
  )
}

const SmallHeavy: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.smallHeavy} {...props}>
      {children}
    </BaseText>
  )
}

const SmallLight: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <BaseText style={styles.smallLight} {...props}>
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
