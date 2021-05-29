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
  
  const oldState = []
  
  // const state = new Array(width * height)
  // let elements
  let blockCurrentPosition = 4

  // Grid with x & y coordinates as id's on it.
  function createPlayfield(){
    for (let y = height - 1; y >= 0; y--) {
      for (let x = 0; x < width; x++) {
        const block = document.createElement('div')
        block.setAttribute('id', `${x}-${y}`)
        grid.appendChild(block)
        oldState.push(block)
        block.innerText = [`x ${x} - y ${y}`]
        state[x][y] = block
      }
    }

    console.log(state)
  }

  const blockTimer = setInterval(moveBlock, 1000)

  function moveBlock() {
    const blockNewPosition = blockCurrentPosition + width
    if (blockNewPosition > oldState.length) {
      clearInterval(blockTimer)
      return blockNewPosition
    }
    removeBlock(blockCurrentPosition)
    blockCurrentPosition = blockNewPosition
    addBlock(blockCurrentPosition)
    addBlock(blockNewPosition)
  }

  function addBlock(position) {
    oldState[position].classList.add('block')
  }

  function removeBlock(position) {
    oldState[position].classList.remove('block')
  }

  //move elements to the right
  function moveRight(event) {
    console.log(event.keyCode)
    const keyRight = event.keyCode
    removeBlock(blockCurrentPosition)
    if (keyRight === 39 && blockCurrentPosition % width !==  width - 1) {
      blockCurrentPosition++
    } 
  }

  //move elements to the left
  function moveLeft(event) {
    const keyLeft = event.keyCode
    removeBlock(blockCurrentPosition)
    if (keyLeft === 37 && blockCurrentPosition % width !== 0) {
      blockCurrentPosition--
    }
  }

  function hardDrop(event) {
    console.log(event.keyCode)
    const keyDown = event.keyCode
    if (keyDown === 40 && blockCurrentPosition + width <= width * width - 1) {
      console.log('down')
      blockCurrentPosition += width
    }
  }

  document.addEventListener('keydown', moveRight)
  document.addEventListener('keydown', moveLeft)
  document.addEventListener('keydown', hardDrop)

  createPlayfield()
}


window.addEventListener('DOMContentLoaded', init)





/// trash and used code 



// coloring the block using ID
// Coloring one block on the screen
// function renderBlock(y, x, color){
//   const myBlock = document.getElementById(`${x}-${y}`)
//   myBlock.style.backgroundColor = color
// }
// renderBlock(19, 4, 'red')