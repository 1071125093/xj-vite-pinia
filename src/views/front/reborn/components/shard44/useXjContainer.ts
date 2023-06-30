import xjContainer from './components/theContainer.vue'
import { cloneDeep } from 'lodash-es'

interface DefaultProps {
  initWidth?: number | string
  initHeight?: number | string
  theComponent?: any
  value: any
}

export const useXjContainer = (defaultProps: DefaultProps) => {
  const innerContainer = cloneDeep(xjContainer)
  const innerProps: DefaultProps = {
    initHeight: 400,
    initWidth: 400
  }
  Object.assign(innerProps, defaultProps)
  try {
    for (const key in innerProps) {
      innerContainer.props[key].default = innerProps[key as keyof DefaultProps] ?? innerContainer.props[key].default
    }
  } catch (error) {
    console.log('哎呀我炸了')
  }
  innerContainer.props.key = Math.random()

  return innerContainer
}
