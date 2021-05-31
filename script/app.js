function init() {
  //Grid with it's heights and width
  const grid = document.querySelector('.grid')
  const width = 10
  const height = 20
  const arrowRight = 39
  const arrowLeft = 37
  // const arrowDown = 40
  const startButton = document.getElementById('start')
  let playing
  // State is a 2D array that can be accessed as state[x][y]
  const state = []
  for (let i = 0; i < width; i++) {
    // This feels complicated and probably needs rewriting
    state.push([])
  }

  //! Tetrimons
  function Position(x, y, isBottom, isLeft, isRight) {
    this.x = x
    this.y = y
    this.isBottom = isBottom
    this.isLeft = isLeft
    this.isRight = isRight
  }
  
  const tetrimonO = [
    new Position(5, 19, false, false, true),
    new Position(5, 18, true, false, true),
    new Position(4 , 19, false, true, false),
    new Position(4, 18, true, true, false)
  ]


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
  }
  //will start the game
  function startGame() {
    console.log('button is clicking')
    playing = setInterval(moveBlock, 200)
    
  }

  //returns an array of all blocks on row y 
  // function getRow(y) {
  //   const row = []
  //   for (let x = 0; x < width; x++) {
  //     row.push(state[x][y])
  //   }
  //   return row
  // }

  // Clear a full row
  // function clearRow(y) {
  //   console.log(`clear row ${y}`)
  //   getRow(y).map(el => el.classList.remove('block'))
  //   for (let i = y + 1; i < height; i++) {
  //     getRow(i).map(el => {
  //       if (el.classList.contains('block')) {
  //         const coordinates = el.id.split('-').map(n => parseInt(n))
  //         console.log('coordinates', coordinates)
  //         const pos = {
  //           x: coordinates[0],
  //           y: coordinates[1]
  //         } 
  //         removeBlock(pos)
  //         pos.y = pos.y - 1
  //         addBlock(pos)
  //       }
  //     })
  //   }
  // }
  // New block being spawn
  // function spawnBlock() {
  //   for ( let y = 0; y < height; y++) {
  //     const fullRow = getRow(y).every(el => el.classList.contains('block'))
  //     if (fullRow) {
  //       clearRow(y)
  //     } 
  //   }
  //   const gameOver = getRow(height - 1).some(el => el.classList.contains('block'))
  //   if (gameOver) {
  //     clearInterval(playing)  
  //     console.log('game over->')
  //   } else {
  //     // Reset the position
  //     position.x = startX
  //     position.y = startY
  //     // Add a new block
  //     addBlock(position)
  //   }
  // }

  // Moving block down the grid
  function moveBlock() {
    // const bottomPositions = tetrimonO.filter(position => position.isBottom)
    // const newY = bottomPositions[0].y - 1
    tetrimonO.map(position => {
      console.log('position y->', position.y)
      console.log('position x->', position.x)
      removeBlock(position)
      position.y = position.y - 1
    }).map(position => {
      addBlock(position)
    })
    
    clearInterval(playing)
  }

  function addBlock(pos) {
    state[pos.x][pos.y].classList.add('block')
  }

  function removeBlock(pos) {
    state[pos.x][pos.y].classList.remove('block')
  }

  //move elements to the right
  // function moveRight(event) {
  //   const key = event.keyCode

  //   if (key === arrowRight) {
  //     const newX = position.x + 1

  //     if (newX >= width) {
  //       console.log('I can not go any more right')
  //     } else if (state[newX][position.y].classList.contains('block')) {
  //       console.log('I can not go any more right')
  //     } else {
  //       removeBlock(position)
  //       position.x = newX
  //       addBlock(position)
  //     }
  //   }
  // }

  //move elements to the left
  // function moveLeft(event) {
  //   const key = event.keyCode

  //   if (key === arrowLeft) {
  //     const newX = position.x - 1

  //     if (newX < 0) {
  //       console.log('I can not go any more left')
  //     } else if (state[newX][position.y].classList.contains('block')) {
  //       console.log('I can not go any more left')
  //     } else {
  //       removeBlock(position)
  //       position.x = newX
  //       addBlock(position)
  //     }
      
  //   }
  // }

  // document.addEventListener('keydown', moveRight)
  // document.addEventListener('keydown', moveLeft)
  // document.addEventListener('keydown', hardDrop)
  startButton.addEventListener('click', startGame)

  createPlayfield()
  tetrimonO.map(position => addBlock(position)) // draw first tetrimon
  // start game
    
  console.log('my state', state)
}

window.addEventListener('DOMContentLoaded', init)