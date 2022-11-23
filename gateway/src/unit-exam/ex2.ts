interface IStudent {
  name: string
  score: number
}

interface IStore {
  subject: string
  students: IStudent[]
}

interface IStudentUpdateScore {
  name: string
  scores: Record<string, number>
}

interface IRemoveStudentScore {
  name: string
  subject: string
}
interface IStudentScore {
  [key: string]: any
}

export const updateStudentScore = (store: IStore[], update: IStudentUpdateScore): IStore[] => {
  Object.keys(update.scores).forEach(subject => {
    let iStore: number = store.findIndex(s => s.subject === subject)
    if (iStore >= 0) {
      let iStudent: number = store[iStore].students.findIndex(sts => sts.name === update.name)
      if (iStudent >= 0) {
        store[iStore].students[iStudent].score = update.scores[subject]
      } else {
        store[iStore].students.push({ name: update.name, score: update.scores[subject] })
      }
    } else {
      store.push({ subject: subject, students: [{ name: update.name, score: update.scores[subject] }] })
    }
  })
  return store
}

export const removeStudentScoreBySubject = (store: IStore[], record: IRemoveStudentScore): IStore[] => {
  let iStore: number = store.findIndex(s => s.subject === record.subject)
  if (iStore >= 0) {
    let iStudent: number = store[iStore].students.findIndex(sts => sts.name === record.name)
    if (iStudent >= 0) store[iStore].students.splice(iStudent, 1)
  }
  return store
}

export const getStudentScoreBySubject = (store: IStore[], subjects: string[]): IStudentScore[] => {
  const ret: Record<string, any>[] = [];
  subjects.forEach(subject => {
    store.find(s => s.subject == subject).students.forEach(sts => {
      let iStudent: number = ret.findIndex(rs => rs.name === sts.name)
      if (iStudent >= 0) {
        ret[iStudent][subject] = sts.score
      } else {
        ret.push({ name: sts.name, [subject]: sts.score })
      }
    })
    ret.map(r => { if (!(subject in r)) return r[subject] = null })
  })
  return ret
}