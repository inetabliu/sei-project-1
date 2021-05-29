function init() {
  //Grid with it's heights and width
  const grid = document.querySelector('.grid')
  const width = 10
  const height = 20 
  const state = []
  
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
        state.push(block)
        block.innerText = [`x ${x} - y ${y}`]
      }  
    }
    console.log('my blocks->', state)
  }

  const blockTimer = setInterval(moveBlock, 500)

  function moveBlock() {
    const blockNewPosition = blockCurrentPosition + width
    if (blockNewPosition > state.length) {
      clearInterval(blockTimer)
      return blockNewPosition
    }
    removeBlock(blockCurrentPosition)
    blockCurrentPosition = blockNewPosition
    addBlock(blockCurrentPosition)
    addBlock(blockNewPosition)
  }
  function addBlock(position) {
    state[position].classList.add('block')
  }

  function removeBlock(position) {
    state[position].classList.remove('block')
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
    } //else if ('logic for making the block speed up on the down')
  }

  function hardDrop(event) {
    console.log(event.keyCode)
    const keyDown = event.keyCode
    if (keyDown === 40 && blockCurrentPosition + width <= width * width - 1) {
      console.log('down')
      blockCurrentPosition += width
    }
  }
  console.log('my state length->', state.length)
  document.addEventListener('keydown', moveRight)
  document.addEventListener('keydown', moveLeft)
  document.addEventListener('keydown', hardDrop)

  createPlayfield()
  console.log('my state length->', state.length)
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