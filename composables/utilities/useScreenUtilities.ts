import { useScreens } from 'vue-screen-utils'
export const useScreenUtilities = () => {
  const { mapCurrent } = useScreens({
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px'
  })

  const columns = mapCurrent({ lg: 1 }, 1)
  const expanded = mapCurrent({ lg: false }, true)
  const isXs = mapCurrent({ xs: true }, false)
  const isSm = mapCurrent({ sm: true }, false)
  const isMd = mapCurrent({ md: true }, false)
  const isLg = mapCurrent({ lg: true }, false)
  // const currentWidth = ref(window.innerWidth)
  return { columns, expanded, isXs, isSm, isMd, isLg }
}
