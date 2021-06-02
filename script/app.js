function init(){

  // Key codes
  const left = 37
  const right = 39
  const down = 40
  const up = 38 // for rotation

  // Get grid element
  const grid = document.querySelector('.grid')

  // Set size
  // 10 X 20 Grid
  const width = 10
  const cellCount = width * width * 2
  const cells = []

  //Start button 
  const startButton = document.getElementById('start')

  // Cell position
  let position

  // Intervals
  let drop


  // Tetraminoes
  const sShape = [5, 6, 14, 15]
  const lShape = [4, 14, 24, 25]
  const iShape = [3, 4, 5, 6]
  const sqShape = [4, 5, 14, 15]
  const tShape = [4, 5, 6, 15]
  const shapes = [sShape, lShape, iShape, sqShape, tShape]
  
  //Random shape selector
  const tetramino = shapes[Math.floor(Math.random() * shapes.length)]

  // Create grid function 
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
    checkRow()
    const isGameOver = gameOver()
    if (isGameOver) {
      return
    }

    // Reset currentPosition
    const newShape = shapes[Math.floor(Math.random() * shapes.length)]
    for (let i = 0; i < newShape.length; i++) {
      tetramino[i] = newShape[i]
    }
    
    // Add first block
    tetramino.map(position => addBlock(position))

    // Create initial interval
    drop = setInterval(blockInterval, 1000)
  }

  // Function that handles the dropBlock interval logic
  function blockInterval(){
    let collision = false

    for (let i = 0; i < tetramino.length; i++) {
      if (tetramino[i] + width >= cellCount || cells[tetramino[i] + width].classList.contains('still-block')){
        // Block down doesn't exist
        // Convert to still-block class
        collision = true
      }
    }
    //Execute this code when collision is true
    if (collision) {
      tetramino.map(position => {
        convertBlock(position)
      })
      dropBlock()
    } else {
      for (let i = 0; i < tetramino.length; i++){
        removeBlock(tetramino[i])
      } 

      for (let i = 0; i < tetramino.length; i++) {
        tetramino[i] += width
      }
      
      for (let i = 0; i < tetramino.length; i++) {
        addBlock(tetramino[i])
      }
    }   
  }

  // Convert block to still-block class
  function convertBlock(position){
    clearInterval(drop)
    cells[position].classList.remove('block')
    cells[position].classList.add('still-block')
  }

  // Add BLOCK
  function addBlock(position){
    cells[position].classList.add('block')
  }

  // Remove BLOCK
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
          //No collision happens

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



  //Clear full row

  function checkRow() {
    console.log('its working')
    for (let i = 0; i < cells.length; i += width){
      const fullRow = cells.slice(i, i + width).every(cell => {
        return cell.classList.contains('still-block')
        
      })
      console.log('is full row', fullRow)
    
      console.log('my index', i)
    }
    
  }
  
  

  //Game over function to check if top row is full
  function gameOver() {
    return cells.slice(0,10).some(cell => {
      return cell.classList.contains('still-block')
    })
  }

  //Drop first block
  function startGame() {
    cells.map(cell => {
      cell.classList.remove('still-block')
    })
    dropBlock()
  }

  startButton.addEventListener('click', startGame)
  document.addEventListener('keydown', handleKeydown)
  
}

window.addEventListener('DOMContentLoaded', init)