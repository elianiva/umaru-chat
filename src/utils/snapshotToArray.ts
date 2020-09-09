export const snapshotToArray = (snapshot): any => {
  let result: any[] = []
  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val()
    item.key = childSnapshot.key
    result.push(item)
  })
  return result
}
