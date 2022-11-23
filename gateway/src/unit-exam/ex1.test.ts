import Utils from './ex1'

describe('Intern Testing', () => {
  it('หาตัวเลขที่มากที่สุด', () => {
    expect(Utils.findMax(3, 6, 9, 10, 1, 4, 8, 5, 7, 2)).toEqual(10)
    expect(Utils.findMax(30, 60, 90, 100, 10, 40, 80, 50, 70, 20)).toEqual(100)
  })

  it('หาตัวเลขที่น้อยที่สุด', () => {
    expect(Utils.findMin(3, 6, 9, 10, 1, 4, 8, 5, 7, 2)).toEqual(1)
    expect(Utils.findMin(30, 60, 90, 100, 10, 40, 80, 50, 70, 20)).toEqual(10)
  })

  it('เปลี่ยนรูปแบบข้อมูลให้ตรงตามโจทย์', () => {
    const data = [
      {
        name: 'ball',
        role: 'developer',
      },
      {
        name: 'mint',
        role: 'developer',
      },
      {
        name: 'tongz',
        role: 'developer',
      },
      {
        name: 'gee',
        role: 'designer',
      },
      {
        name: 'pat',
        role: 'designer',
      },
      {
        name: 'mod',
        role: 'ux',
      },
      {
        name: 'mew',
        role: 'content',
      },
      {
        name: 'jack',
        role: 'content',
      },
    ]
    const expectData: Record<string, any> = {
      content: [
        {
          nickname: 'mew',
        },
        {
          nickname: 'jack',
        },
      ],
      developer: [
        {
          nickname: 'ball',
        },
        {
          nickname: 'mint',
        },
        {
          nickname: 'tongz',
        },
      ],
      designer: [
        {
          nickname: 'gee',
        },
        {
          nickname: 'pat',
        },
      ],
      ux: [
        {
          nickname: 'mod',
        },
      ],
    }

    expect(Utils.reformatData(data)).toEqual(expectData)
  })
})