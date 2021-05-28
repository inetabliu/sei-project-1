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

  const blockTimer = setInterval(moveBlock, 1000)

  function moveBlock() {
    const blockNewPosition = blockCurrentPosition + width
    if (blockNewPosition > state.length) {
      clearInterval(blockTimer)
      return 
    }
    removeBlock(blockCurrentPosition)
    blockCurrentPosition = blockNewPosition
    addBlock(blockCurrentPosition)
  }
  function addBlock(position) {
    state[position].classList.add('block')
  }

  function removeBlock(position) {
    state[position].classList.remove('block')
  }

  







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