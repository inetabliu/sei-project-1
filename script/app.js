function init() {
  //Grid with it's heights and width
  const grid = document.querySelector('.grid')
  const width = 10
  const height = 20 

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
    console.log('starting position', position)
    const newY = position.y - 1
    if (newY < 0) {
      clearInterval(blockTimer)
      return
    }
  
    removeBlock(position)
    position.y = newY
    addBlock(position)
    console.log('end position', position)
  }

  function addBlock(pos) {
    state[pos.x][pos.y].classList.add('block')
  }

  function removeBlock(pos) {
    state[pos.x][pos.y].classList.remove('block')
  }

  //move elements to the right
  // function moveRight(event) {
  //   console.log(event.keyCode)
  //   const keyRight = event.keyCode
  //   removeBlock(blockCurrentPosition)
  //   if (keyRight === 39 && blockCurrentPosition % width !==  width - 1) {
  //     blockCurrentPosition++
  //   } 
  // }

  //move elements to the left
  // function moveLeft(event) {
  //   const keyLeft = event.keyCode
  //   removeBlock(blockCurrentPosition)
  //   if (keyLeft === 37 && blockCurrentPosition % width !== 0) {
  //     blockCurrentPosition--
  //   }
  // }

  // function hardDrop(event) {
  //   console.log(event.keyCode)
  //   const keyDown = event.keyCode
  //   if (keyDown === 40 && blockCurrentPosition + width <= width * width - 1) {
  //     console.log('down')
  //     blockCurrentPosition += width
  //   }
  // }

  // document.addEventListener('keydown', moveRight)
  // document.addEventListener('keydown', moveLeft)
  // document.addEventListener('keydown', hardDrop)

  createPlayfield()
}

window.addEventListener('DOMContentLoaded', init)
