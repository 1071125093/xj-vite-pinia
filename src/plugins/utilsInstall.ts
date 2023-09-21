import { resolve, isAbsolute, dirname } from 'path'
import { mkdirSync, writeFileSync } from 'fs'
import axios from 'axios'

interface OptionType {
  run?: boolean
  path?: string
  include?: string[]
  exclude?: string[]
}
interface asyncUtil {
  id: number
  name: string
  codeType: number
  tags: string
  souceCode: string
}
// 配置信息
let targetOption: OptionType = {
  run: true,
  path: ''
}

/**
 * @description: 安装工具函数
 * @param {OptionType} options{
                                run:boolean = true 是否启用 ,
                                path: string = src/utils/,生成文件位置
                                include:string[] = undefined 筛选包含的函数
                                exclude:string[] = undefined 筛选排除的函数
                                }
 * @return {*}
 */
export default function zingUtilsInstall(options?: OptionType) {
  // 合并默认配置和传入配置
  options && (targetOption = Object.assign(targetOption, options))

  return {
    name: 'vite-plugin-zing-utils-install',
    buildStart() {
      if (targetOption.run) {
        // 此处不适用async 防止阻塞，让其异步执行即可
        axios
          .get('https://zingui-node.aihuoshi.net/zingui/utils/getAllUtils?codeType=1')
          .then((res) => {
            let code = ''
            let targetData = res.data?.data || []
            // 筛选包含
            if (targetOption.include) {
              targetData = targetData.filter((util: asyncUtil) => targetOption.include?.includes(util.name))
            }
            // 筛选排除
            if (targetOption.exclude) {
              targetData = targetData.filter((util: asyncUtil) => !targetOption.exclude?.includes(util.name))
            }
            targetData?.forEach((util: asyncUtil) => (code += util.souceCode))
            mkUtilsFile(code)
          })
          .catch((error: any) => {
            console.log('error :>> ', error)
          })
      }
    }
  }
}
//创建Utils文件

function mkUtilsFile(tsMessage: string) {
  // 有传入的路径，就在传入的路径进行创建 否则使用默认路径
  const utilsPath = targetOption.path ? resolve(normalizePath(targetOption.path), 'zingUtils.ts') : resolve(__dirname, 'src/utils/zingUtils.ts')
  // 创建中间目录（如果不存在）
  try {
    mkdirSync(dirname(utilsPath), { recursive: true }) // 使用 recursive 选项自动创建中间目录
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
  // 现在可以创建文件并写入内容
  writeFileSync(utilsPath, tsMessage)
}

// 对绝对和相对路径进行判断
function normalizePath(inputPath: string, baseDirectory: string = process.cwd()) {
  // 如果输入路径已经是绝对路径，则直接返回
  if (isAbsolute(inputPath)) {
    return inputPath
  }

  // 否则，将输入路径解析为绝对路径，并以 baseDirectory 作为基础目录
  return resolve(baseDirectory, inputPath)
}
