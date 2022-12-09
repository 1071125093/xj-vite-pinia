/*
 * @Author: XiaoJun
 * @Date: 2022-12-09 09:45:22
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-09 16:03:04
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard35/hooks/useApiFox.ts
 */

import * as API from '@/api/fsExtra'
import axios from 'axios'
import { piniaSystem } from '@/store'

export default () => {
  /** 使用登录 */
  const useLogin = async () => {
    const { data } = await API.login({
      username: 'xiaoming',
      password: '123456',
    })
    piniaSystem.setToken(data.token)
  }
  return {
    useLogin,
  }
}
