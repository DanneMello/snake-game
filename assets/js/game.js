var cobra, coelho, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, 
    speedTextValue, textStyle_Key, textStyle_Value;

// Som dos eventos
const dieSound = new Audio('./assets/sound/DieSound_CC0_by_EugeneLoza.ogg');
const eatSound = new Audio('./assets/sound/eatSound.mp3');

var Game = {
    preload: function () {
        game.load.image('cobra', './assets/images/cabeca.png');
        game.load.image('coelho', './assets/images/coelho.png');
        game.load.image('corpo', './assets/images/corpo.png');
    },
    create: function () {
        cobra = [];
        coelho = {};
        squareSize = 15;
        score = 0;
        speed = 0;
        updateDelay = 0;
        direction = 'right';
        new_direction = null;
        addNew = false;
        cursors = game.input.keyboard.createCursorKeys();
        game.stage.backgroundColor = '#008400';

        //cobra[0] = game.add.sprite(150+i*squareSize, 150, 'cobra');        
        for (var i = 0; i < 10; i++) {
            // Os parâmetros são (coordenada X, coordenada Y, imagem)
            cobra[i] = game.add.sprite(150 + i * squareSize, 150, 'corpo');
        }

        this.generateCoelho();

        textStyle_Key = {
            font: "bold 14px sans-serif",
            fill: "#272906",
            align: "center"
        };
        textStyle_Value = {
            font: "bold 18px sans-serif",
            fill: "#a24921",
            align: "center"
        };

        game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);

        game.add.text(500, 20, "SPEED", textStyle_Key);
        speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value);
    },

    update: function () {
        if (cursors.right.isDown && direction != 'left') {
            new_direction = 'right';
        } else if (cursors.left.isDown && direction != 'right') {
            new_direction = 'left';
        } else if (cursors.up.isDown && direction != 'down') {
            new_direction = 'up';
        } else if (cursors.down.isDown && direction != 'up') {
            new_direction = 'down';
        }

        speed = Math.min(10, Math.floor(score / 5));
        speedTextValue.text = '' + speed;
        updateDelay++;

        if (updateDelay % (10 - speed) == 0) {
            var firstCell = cobra[cobra.length - 1],
                lastCell = cobra.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            if (new_direction) {
                direction = new_direction;
                new_direction = null;
            }

            if (direction == 'right') {
                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            } else if (direction == 'left') {
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            } else if (direction == 'up') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            } else if (direction == 'down') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

            // Coloca a última célula na frente da pilha.
            cobra.push(lastCell);

            // Marca como a primeira célula.
            firstCell = lastCell;

            if (addNew) {
                cobra.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'corpo'));
                addNew = false;
            }

            this.coelhoCollision();
            this.selfCollision(firstCell);
            this.wallCollision(firstCell);
        }
    },

    generateCoelho: function () {
        var randomX = Math.floor(Math.random() * 40) * squareSize,
            randomY = Math.floor(Math.random() * 30) * squareSize;

        coelho = game.add.sprite(randomX, randomY, 'coelho');
    },

    coelhoCollision: function () {
        for (var i = 0; i < cobra.length; i++) {
            if (cobra[i].x == coelho.x && cobra[i].y == coelho.y) {
                addNew = true;
                coelho.destroy();
                this.generateCoelho();
                score++;
                eatSound.play();
                scoreTextValue.text = score.toString();
            }
        }
    },

    selfCollision: function (head) {
        for (var i = 0; i < cobra.length - 1; i++) {
            if (head.x == cobra[i].x && head.y == cobra[i].y) {
                game.state.start('Game_Over');
                dieSound.play();
            }
        }
    },

    wallCollision: function (head) {
        if (head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0) {
            game.state.start('Game_Over');
        }
    }
};