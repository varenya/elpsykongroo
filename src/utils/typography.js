import Typography from 'typography'
import Lincoln from 'typography-theme-lincoln'

Lincoln.overrideThemeStyles = () => {
  return {
    a: {
      backgroundImage: `none`,
    },
  }
}

const typography = new Typography(Lincoln)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
