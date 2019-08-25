const format = require('date-fns/format')

function group (list) {
  let currentId
  const result = []
  list.forEach(item => {
    if (item.id !== currentId) {
      const atheleteObj = {
        id: item.id,
        fullName: item.fullname,
        ssnr: item.ssnr,
        birthyear: item.birthyear,
        gender: item.gender,
        country: item.country,
        thorId: item.thorid,
        confirmedByUser: item.confirmedbyuser,
        membership: []
      }
      result.push(atheleteObj)
      currentId = item.id
    }

    const currentAthlete = result[result.length - 1]
    if (item.clubid || item.legacyteam) {
      const fromDate = new Date(item.fromdate)
      const toDate = new Date(item.todate)

      const club = {
        id: item.clubid,
        fullName: item.clubname,
        legacyTeam: item.legacyteam,
        from: item.fromdate ? format(fromDate, 'yyyy-MM-dd') : null,
        to: item.todate ? format(toDate, 'yyyy-MM-dd') : null,
        current: !item.todate
      }
      currentAthlete.membership.push(club)
    }
  })
  return result
}

module.exports = group