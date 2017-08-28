const touchParams = {
  startPos: null,
  endPos: null
}

export function touchStart (e) {
  let {pageX: x, pageY: y} = e.touches[0]
  touchParams.startPos = {
    x, 
    y
  }
  return {
    eventName: 'touchStart',
    x, 
    y
  }
}

export function touchEnd (e) {
  let {pageX: x, pageY: y} = e.changedTouches[0]
  let changedPos = {
    x: x - touchParams.startPos.x,
    y: y - touchParams.startPos.y
  }
  if (changedPos.y < -100) {
    return {
      eventName: 'up',
      x: changedPos.x,
      y: changedPos.y
    }
  } else if (changedPos.y > 100) {
    return {
      eventName: 'down',
      x: changedPos.x,
      y: changedPos.y
    }
  } else {
    return {
      x: changedPos.x,
      y: changedPos.y
    }
  }
}