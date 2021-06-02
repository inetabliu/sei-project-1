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

  
  
 
  const sShape = [5, 6, 14, 15]
  const lShape = [4, 14, 24, 25]
  const iShape = [3, 4, 5, 6]
  const sqShape = [4, 5, 14, 15]
  const tShape = [3, 4, 5, 6]
  const tetraminoes = [sShape, lShape, iShape, sqShape, tShape]
  console.log('my tetramino array', tetraminoes)
  const tetramino = tetraminoes[Math.floor(Math.random() * tetraminoes.length)]

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
    tetramino
    // Add first block
    tetramino.map(position => addBlock(position))
    // console.log('tetrimon', tetramino)
    // Create initial interval
    drop = setInterval(blockInterval, 1000) //change it back to 1000 later
  }

  // Function that handles the dropBlock interval logic
  function blockInterval(){
    let collision = false
    for (let i = 0; i < tetramino.length; i++) {
      // console.log('cell positions and width', cells[tetrimon[0]])

      // i = 0
      // tetrimon[i] = 193
      if (tetramino[i] + width >= cellCount || cells[tetramino[i] + width].classList.contains('still-block')){
        // Block down doesn't exist
        
        // Convert to still block
        collision = true
        break
      } 
    }

    if (collision) {
      tetramino.map(position => {
        convertBlock(position)
      })
      dropBlock()
    } else {
      for (let i = 0; i < tetramino.length; i++){
        // Truthy
        removeBlock(tetramino[i])
        tetramino[i] += width 
        addBlock(tetramino[i])
  
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
    let collision = false
    for (let i = 0; i < tetramino.length; i++){

      if (key === left){
        if (tetramino[i] % width !== 0 && !cells[tetramino[i] - 1].classList.contains('still-block')) {
          //No collision 

        } else {
          //Colission happened
          collision = true
        }
      }
      if (key === right){
        if (tetramino[i] % width !== width - 1 && !cells[tetramino[i] + 1].classList.contains('still-block')){
          //no collision
        } else {
          collision = true
        }

      }
      if (key === down) {
        console.log('if key down')
        if (tetramino[i] + width < cellCount && !cells[tetramino[i] + width].classList.contains('still-block')) { 
          //no collision
        } else {
          collision = true
        }
      }
    }
    if (!collision) {
      for (let i = 0; i < tetramino.length; i++) {
        // console.log('position left', tetramino[i])
        // Move left
        // Remove existing block
        removeBlock(tetramino[i])
        // Decrement currentPosition
        if (key === left) {
          tetramino[i]--
        }
        if (key === right) {
          tetramino[i]++
        }
        if (key === down) {
          tetramino[i] += width  
        }
   
      } 
      //add new block
      tetramino.forEach(position => {
        addBlock(position)
      })
    } 

    

  }
  document.addEventListener('keydown', handleKeydown)
 

  //Draw the first block
  dropBlock()

}

window.addEventListener('DOMContentLoaded', init)