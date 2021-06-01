function init(){

  // Key codes
  const left = 37
  const right = 39
  const down = 40
  const up = 38

  // Get grid element
  const grid = document.querySelector('.grid')

  // Set size
  const width = 10
  const cellCount = width * width * 2
  const cells = []

  // Cell position
  let position

  // Intervals
  let drop


  // Tetraminoes

  let tetrimon = [3, 4, 5, 6]
  const sShape = [5, 6, 14, 15]
  const lShape = [4, 14, 24, 25]
  const iShape = [3, 4, 5, 6]
  const sqShape = [4, 5, 14, 15]
  const tShape = [3, 4, 5, 6]


  // Create grid
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerText = i
      cell.dataset.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  createGrid()

  // Drop block
  function dropBlock(){
    // Reset currentPosition
    tetrimon = [3, 4, 5, 6]
    // Add first block
    tetrimon.map(position => addBlock(position))
    console.log('tetrimon', tetrimon)
    // Create initial interval
    drop = setInterval(blockInterval, 1000) //change it back to 1000 later
  }

  // Function that handles the dropBlock interval logic
  function blockInterval(){
    for (let i = 0; i < tetrimon.length; i++) {
      // console.log('cell positions and width', cells[tetrimon[0]])
      if (tetrimon[i] + width >= cellCount || cells[tetrimon[i] + width].classList.contains('still-block')){
        // Block down doesn't exist
        
        // Convert to still block
        convertBlock(tetrimon[i])
      } else {
        // Truthy
        removeBlock(tetrimon[i])
        tetrimon[i] += width 
        addBlock(tetrimon[i])
      }
    }
  }

  // Convert block to still-block
  function convertBlock(position){
    // Stop interval
    clearInterval(drop)
    // Convert classes
    cells[position].classList.remove('block')
    cells[position].classList.add('still-block')
    // Drop another block, need to return to the starting tetrimon
    tetrimon = [3, 4, 5, 6]
    dropBlock()
  }

  // Add block
  function addBlock(position){
    cells[position].classList.add('block')
  }

  // Remove block
  function removeBlock(position){
    cells[position].classList.remove('block')
  }


  // Handle key down
  function handleKeydown(event){
    const key = event.keyCode
    for (let i = 0; i < tetrimon.length; i++){
      if (key === left && tetrimon[i] % width !== 0){
        console.log('position left', tetrimon[i])
        // Move left
        // Remove existing block
        removeBlock(tetrimon[i])
        // Decrement currentPosition
        tetrimon[i]--
        // Add new block
        addBlock(tetrimon[i])
      } else if (key === right && tetrimon[i] % width !== width - 1){
        console.log('right position', tetrimon[i])
        // Move right
        // Remove existing block
        removeBlock(tetrimon[i])
        // Increment current position
        tetrimon[i]++
        // Add new block
        addBlock(tetrimon[i])
      } else if (key === down){
        // Move down
  
      } else if (key === up){
        // Rotate
  
      }
    }
    

  }
  document.addEventListener('keydown', handleKeydown)
 

  //Draw the first block
  dropBlock()

}

window.addEventListener('DOMContentLoaded', init)