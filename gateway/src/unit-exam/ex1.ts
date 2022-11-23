export class Utils {
  public static findMax(...args: number[]): number {
    // const max: number = [...args].reduce((max, num) => num > max ? num : max, args[0])

    let [sec1, sec2] = [args[0], args[args.length - 1]]
    for (let i = 0; i < (args.length / 2); i++) {
      sec1 = sec1 > args[i] ? sec1 : args[i]
      sec2 = sec2 > args[args[(args.length - 1) - i]] ? sec2 : args[(args.length - 1) - i]
    }
    return sec1 > sec2 ? sec1 : sec2
  }

  public static findMin(...args: number[]): number {
    // const min: number = [...args].reduce((min, num) => num < min ? num : min, args[0])

    let [sec1, sec2] = [args[0], args[args.length - 1]]
    for (let i = 0; i < (args.length / 2); i++) {
      sec1 = sec1 < args[i] ? sec1 : args[i]
      sec2 = sec2 < args[args[(args.length - 1) - i]] ? sec2 : args[(args.length - 1) - i]
    }
    return sec1 < sec2 ? sec1 : sec2
  }

  public static reformatData(x: any): Record<string, any> {
    const ret: Record<string, Record<string, string>[]> = {}
    x.forEach((d: any) => {
      if (!(ret[d.role])) {
        ret[d.role] = [{ nickname: d.name }]
      } else {
        ret[d.role].push({ nickname: d.name })
      }
    })
    return ret
  }
}

export default Utils