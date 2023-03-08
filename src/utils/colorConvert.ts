// 取值范围为0-255之间的rgb值转换成0-1
export function rgb255To1(rgba: string): { r: number, g: number, b: number, a: number }
export function rgb255To1(r: number, g: number, b: number, a?: number): { r: number, g: number, b: number, a: number }
export function rgb255To1(...args: (string | number | undefined)[]): { r: number, g: number, b: number, a: number } {
  if (typeof args[0] == 'string') {
    let rgba = args[0].split(',').map(item => Number(item))
    return { r: rgba[0] / 255, g: rgba[1] / 255, b: rgba[2] / 255, a: rgba[3] }
  } else {
    return { r: (args as number[])[0] / 255, g: (args as number[])[1] / 255, b: (args as number[])[2] / 255, a: (args as number[])[3] }
  }
}


