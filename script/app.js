function init() {
  //Grid with it's heights and width
  const grid = document.querySelector('.grid')
  const width = 10
  const height = 20
  const arrowRight = 39
  const arrowLeft = 37

  // State is a 2D array that can be accessed as state[x][y]
  const state = []
  for (let i = 0; i < width; i++) {
    // This feels complicated and probably needs rewriting
    state.push([])
  }

  // const state = new Array(width * height)
  // let elements
  const position = {
    x: 4,
    y: 19
  }

  // Grid with x & y coordinates as id's on it.
  function createPlayfield(){
    for (let y = height - 1; y >= 0; y--) {
      for (let x = 0; x < width; x++) {
        const block = document.createElement('div')
        block.setAttribute('id', `${x}-${y}`)
        grid.appendChild(block)
        block.innerText = [`x ${x} - y ${y}`]
        state[x][y] = block
      }
    }

    console.log(state)
  }

  const blockTimer = setInterval(moveBlock, 1000)

  function moveBlock() {
    const newY = position.y - 1
    if (newY < 0) {
      clearInterval(blockTimer)
      return
    }
  
    removeBlock(position)
    position.y = newY
    addBlock(position)
  }

  function addBlock(pos) {
    state[pos.x][pos.y].classList.add('block')
  }

  function removeBlock(pos) {
    state[pos.x][pos.y].classList.remove('block')
  }

  //move elements to the right
  function moveRight(event) {
    const key = event.keyCode

    if (key === arrowRight) {
      const newX = position.x + 1

      if (newX >= width) {
        console.log('I can not go any more right')
        return
      }

      removeBlock(position)
      position.x = newX
      addBlock(position)
    }
  }

  //move elements to the left
  function moveLeft(event) {
    const key = event.keyCode

    if (key === arrowLeft) {
      const newX = position.x - 1

      if (newX < 0) {
        console.log('I can not go any more left')
        return
      }

      removeBlock(position)
      position.x = newX
      addBlock(position)
    }
  }

  document.addEventListener('keydown', moveRight)
  document.addEventListener('keydown', moveLeft)

  createPlayfield()
}

window.addEventListener('DOMContentLoaded', init)
