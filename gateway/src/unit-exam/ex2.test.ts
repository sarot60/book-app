import {
  updateStudentScore,
  removeStudentScoreBySubject,
  getStudentScoreBySubject,
} from './ex2'

const store = [
  {
    subject: 'math',
    students: [{ name: 'luffy', score: 10 }, { name: 'zoro', score: 15 }],
  },
  {
    subject: 'science',
    students: [{ name: 'luffy', score: 15 }, { name: 'zoro', score: 25 }],
  },
]

describe('updateStudentScore', () => {
  test('should be update new student correctly 1', () => {
    const result = updateStudentScore(store, {
      name: 'sanji',
      scores: {
        math: 22,
        science: 33,
      },
    })

    const expected = [
      {
        subject: 'math',
        students: [
          { name: 'luffy', score: 10 },
          { name: 'zoro', score: 15 },
          { name: 'sanji', score: 22 },
        ],
      },
      {
        subject: 'science',
        students: [
          { name: 'luffy', score: 15 },
          { name: 'zoro', score: 25 },
          { name: 'sanji', score: 33 },
        ],
      },
    ]

    expect(result).toEqual(expected)
  })

  test('should be update new subject correctly 2', () => {
    const result = updateStudentScore(store, {
      name: 'sanji',
      scores: {
        computer: 44,
      },
    })
    const expected = [
      {
        subject: 'math',
        students: [{ name: 'luffy', score: 10 }, { name: 'zoro', score: 15 }, { name: 'sanji', score: 22 }],
      },
      {
        subject: 'science',
        students: [{ name: 'luffy', score: 15 }, { name: 'zoro', score: 25 }, { name: 'sanji', score: 33 }],
      },
      {
        subject: 'computer',
        students: [{ name: 'sanji', score: 44 }],
      },
    ]

    expect(result).toEqual(expected)
  })

  test('should be update old student score correctly', () => {
    const result = updateStudentScore(store, {
      name: 'luffy',
      scores: {
        math: 40,
        science: 60,
      },
    })
    const expected = [
      {
        subject: 'math',
        students: [{ name: 'luffy', score: 40 }, { name: 'zoro', score: 15 }, { name: 'sanji', score: 22 }],
      },
      {
        subject: 'science',
        students: [{ name: 'luffy', score: 60 }, { name: 'zoro', score: 25 }, { name: 'sanji', score: 33 }],
      },
      {
        subject: 'computer',
        students: [{ name: 'sanji', score: 44 }],
      },
    ]

    expect(result).toEqual(expected)
  })
})

describe('removeStudentScoreBySubject', () => {
  test('should be remove correct', () => {
    const result = removeStudentScoreBySubject(store, { name: 'luffy', subject: 'math' })

    const expected = [
      {
        subject: 'math',
        students: [{ name: 'zoro', score: 15 }, { name: 'sanji', score: 22 }],
      },
      {
        subject: 'science',
        students: [{ name: 'luffy', score: 60 }, { name: 'zoro', score: 25 }, { name: 'sanji', score: 33 }],
      },
      {
        subject: 'computer',
        students: [{ name: 'sanji', score: 44 }],
      },
    ]

    expect(result).toEqual(expected)
  })
})

describe('getStudentScoreBySubject', () => {
  test('should be transform correctly', () => {
    const store = [
      {
        subject: 'math',
        students: [{ name: 'luffy', score: 10 }, { name: 'zoro', score: 15 }],
      },
      {
        subject: 'science',
        students: [{ name: 'luffy', score: 15 }, { name: 'zoro', score: 25 }],
      },
    ]
    const result = getStudentScoreBySubject(store, ['math', 'science'])
    const expected = [
      {
        name: 'luffy',
        math: 10,
        science: 15,
      },
      {
        name: 'zoro',
        math: 15,
        science: 25,
      },
    ]
    expect(result).toEqual(expected)
  })
  test('should be transform correctly with empty subject', () => {
    const store = [
      {
        subject: 'math',
        students: [{ name: 'luffy', score: 10 }, { name: 'zoro', score: 15 }],
      },
      {
        subject: 'computer',
        students: [{ name: 'luffy', score: 10 }],
      },
      {
        subject: 'science',
        students: [{ name: 'luffy', score: 15 }, { name: 'zoro', score: 25 }],
      },
    ]
    const result = getStudentScoreBySubject(store, ['math', 'computer'])
    const expected = [
      {
        name: 'luffy',
        math: 10,
        computer: 10,
      },
      {
        name: 'zoro',
        math: 15,
        computer: null,
      },
    ]
    expect(result).toEqual(expected)
  })
})