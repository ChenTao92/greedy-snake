var width = 10
var height = 10
var container = document.getElementById("container")
var start = document.getElementById("start")

for(var i = 0; i < width * height; i++) {
  var div = document.createElement("div")
  container.appendChild(div)
}

var h1 = document.getElementById("score")
h1.innerText = "score:0"

start.addEventListener("click", function(evt) {

  var snake = {
    positions: [{x: Math.floor(Math.random()*7), y: Math.floor(Math.random()*10)}],
    direction: "R",
    fruit: {x: Math.floor(Math.random()*10), y: Math.floor(Math.random()*10)},
  }

  function getSquareByPos(pos) {
    var index = pos.y * width + pos.x
    return document.querySelectorAll("#container div")[index]
  }

  function drawSnakeAndFruit() {
    var divs = document.querySelectorAll("#container div")
    for(var i = 0; i < divs.length; i++) {
      divs[i].className = ""//每次循环清除掉之前的记录
    }

    snake.positions.forEach(function(pos) {
      getSquareByPos(pos).className = "snake"
    })
    getSquareByPos(snake.positions[0]).className = "snakehead"

    getSquareByPos(snake.fruit).className = "fruit"
  }


  function getScore() {
    var score = "score:" +((snake.positions.length - 1) * 10)
    h1.innerText = score
  }

  function mainLoop() {
    var snakeHead = snake.positions[0]
    // 判断是否吃到果实 并 吃掉果实后增长蛇身长度
    if(snakeHead.x === snake.fruit.x && snakeHead.y === snake.fruit.y) {
      var lastBody = snake.positions[snake.positions.length - 1]
      var newBody = {}
      if(snake.direction === "L") {
        newBody.x = lastBody.x + 1
        newBody.y = lastBody.y
      }
      if(snake.direction === "R") {
        newBody.x = lastBody.x - 1
        newBody.y = lastBody.y
      }
      if(snake.direction === "U") {
        newBody.y = lastBody.y + 1
        newBody.x = lastBody.x
      }
      if(snake.direction === "D") {
        newBody.y = lastBody.y - 1
        newBody.x = lastBody.x
      }
      snake.positions.push(newBody)
      snake.fruit.x = Math.floor(Math.random() * width)
      snake.fruit.y = Math.floor(Math.random() * height)
    }


    var lastPosX = snake.positions[0].x
    var lastPosY = snake.positions[0].y

    if(snake.direction === "L") {
      snake.positions[0].x--
      snake.positions.slice(1).forEach(function(pos) {
        var a = pos.x
        var b = pos.y
        pos.x = lastPosX
        pos.y = lastPosY
        lastPosX = a
        lastPosY = b
      })
    }
    if(snake.direction === "R") {
      snake.positions[0].x++
      snake.positions.slice(1).forEach(function(pos) {
        var a = pos.x
        var b = pos.y
        pos.x = lastPosX
        pos.y = lastPosY
        lastPosX = a
        lastPosY = b
      })
    }
    if(snake.direction === "U") {
      snake.positions[0].y--
      snake.positions.slice(1).forEach(function(pos) {
        var a = pos.x
        var b = pos.y
        pos.x = lastPosX
        pos.y = lastPosY
        lastPosX = a
        lastPosY = b
      })
    }
    if(snake.direction === "D") {
      snake.positions[0].y++
      snake.positions.slice(1).forEach(function(pos) {
        var a = pos.x
        var b = pos.y
        pos.x = lastPosX
        pos.y = lastPosY
        lastPosX = a
        lastPosY = b
      })
    }

    // 判断是否触发死亡条件
    //判断是否撞墙
    var isDead = false
    if(snakeHead.x < 0 || snakeHead.x >= width) {
      isDead = true
    }
    if(snakeHead.y < 0 || snakeHead.y >= height) {
      isDead = true
    }
    //判断是否首尾相残
    snake.positions.slice(1).forEach(function(pos) {
      if(pos.x === snakeHead.x && pos.y === snakeHead.y) {
        isDead = true
      }
    })

    if(isDead) {
      clearInterval(interval)// jump out of mainLoop
      h1.innerText += " Game Over！"
      return
    } else {
      drawSnakeAndFruit()
      getScore()
    }
  }

  document.addEventListener("keydown", function(evt) {
    // up
    if(evt.keyCode === 38 || evt.keyCode === 87) {
      var newPosX = snake.positions[0].x
      var newPosY = snake.positions[0].y - 1
      var isValid = true
      snake.positions.slice(1).forEach(function(pos) {
        if(pos.x === newPosX && pos.y === newPosY) {
          isValid = false
        }
      })
      if(isValid) {
        snake.direction = "U"
      }
    }
    // down
    if(evt.keyCode === 40 || evt.keyCode === 83) {
      var newPosX = snake.positions[0].x
      var newPosY = snake.positions[0].y + 1
      var isValid = true
      snake.positions.slice(1).forEach(function(pos) {
        if(pos.x === newPosX && pos.y === newPosY) {
          isValid = false
        }
      })
      if(isValid) {
        snake.direction = "D"
      }
    }
    // left
    if(evt.keyCode === 37 || evt.keyCode === 65) {
      var newPosX = snake.positions[0].x - 1
      var newPosY = snake.positions[0].y
      var isValid = true
      snake.positions.slice(1).forEach(function(pos) {
        if(pos.x === newPosX && pos.y === newPosY) {
          isValid = false
        }
      })
      if(isValid) {
        snake.direction = "L"
      }
    }
    // right
    if(evt.keyCode === 39 || evt.keyCode ===68 ) {
      var newPosX = snake.positions[0].x + 1
      var newPosY = snake.positions[0].y
      var isValid = true
      snake.positions.slice(1).forEach(function(pos) {
        if(pos.x === newPosX && pos.y === newPosY) {
          isValid = false
        }
      })
      if(isValid) {
        snake.direction = "R"
      }
    }
  })

  getScore()
  var interval = setInterval(mainLoop, 200)

})
