/*
 * @Author: XiaoJun
 * @Date: 2022-12-07 19:56:19
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-09 16:04:57
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/api/fsExtra/index.ts
 */
import { useHttp } from '@/service/httpService'
const { get, post } = useHttp()

// #region ********** login start **************/
interface loginParams {
  username: string
  password: string
}
/** login */
export const login = (params: loginParams) => {
  return post('/user/login', params)
}
// #endregion ******* login ~end~ **************/

// #region ********** 获取文章类型列表 start **************/
/** login */
export const getArticleCateList = () => {
  return get('/articleCate/allList')
}
// #endregion ******* 获取文章类型列表 ~end~ **************/
