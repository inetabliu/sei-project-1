function init() {
  //Grid with it's heights and width
  const grid = document.querySelector('.grid')
  const width = 10
  const height = 20 
  const blocks = []

  
  // Grid with x & y coordinates as id's on it.
  function createPlayfield(){
    for (let y = height - 1; y >= 0; y--) {
      for (let x = 0; x < width; x++) {
        const block = document.createElement('div')
        block.setAttribute('id', `${x}-${y}`)
        grid.appendChild(block)
        blocks.push(block)
        block.innerText = [`y ${y} - x ${x}`]
      }  
    }
    console.log('my blocks->', blocks)
  }
  // Coloring one block on the screen
  function renderBlock(y, x, color){
    const myBlock = document.getElementById(`${x}-${y}`)
    myBlock.style.backgroundColor = color
  }

  createPlayfield()
  renderBlock(19, 4, 'red')
}
window.addEventListener('DOMContentLoaded', init)