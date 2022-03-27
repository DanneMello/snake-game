var Game_Over = {

    preload : function() {
        // Aqui carregamos todos os recursos necessários para o nível.
        // No nosso caso, são a bolinha para a cobra e o coelho como presa.
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {

        // Botão Criar para iniciar um jogo semelhante ao menu principal.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Informações da última pontuação.
        game.add.text(235, 350, "PONTUAÇÃO", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#FF0000", align: "center" });

    },

    startGame: function () {

        // Mude o estado para o jogo real.
        this.state.start('Game');

    }

};