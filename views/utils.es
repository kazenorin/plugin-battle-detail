
const {__r, getStore} = window

export function getShipName(ship) {
  if (Number.isInteger(ship)) {
    ship = getStore(['const', '$ships', ship])
  }
  if (ship == null) {
    return null
  }
  let name = __r(ship.api_name)
  let yomi = ship.api_yomi
  if (['elite', 'flagship'].includes(yomi)) {
    name += yomi
  }
  return name
}

export function getItemName(item) {
  if (Number.isInteger(item)) {
    item = getStore(['const', '$equips', item])
  }
  if (item == null) {
    return null
  }
  let name = __r(item.api_name)
  return name
}

export async function sleep(ms) {
  await new Promise((resolve, _reject) => {
    setTimeout(() => resolve(), ms > 0 ? ms : 0)
  })
}
