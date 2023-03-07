/*
 * @Author: XiaoJun
 * @Date: 2022-12-28 14:58:15
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-28 15:03:17
 * @Description: 类型的定义
 * @FilePath: /xj-vite-pinia/src/utils/useMyItem/interface/index.d.ts
 */
declare namespace UseMyItem {
  interface OthersPart {
    x: string
    y: string
    z: string
  }
  interface Item1 extends OthersPart {
    a1: string
    b1: string
    c1: string
    d1: string
    d1: string
  }
  interface Item2 extends OthersPart {
    a2: string
    b2: string
    c2: string
    d2: string
    d2: string
  }

  interface Item3 extends OthersPart {
    a3: string
    b3: string
    c3: string
    d3: string
    d3: string
  }

  interface ItemUltra {
    a: string
    b: string
    c: string
    d: string
    d: string
  }
}
