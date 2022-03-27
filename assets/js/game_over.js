var Game_Over = {

    // Aqui carregamos todos os recursos necessários para o nível.
    // No nosso caso, são a bolinha para a cobra e o coelho como presa.
    preload : function() {
        game.load.image('gameover', './assets/images/game_over.jpeg');
    },

    // Botão Criar para iniciar um jogo semelhante ao menu principal.
    create : function() {
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Informações da última pontuação.
        game.add.text(235, 350, "PONTUAÇÃO", { font: "bold 16px sans-serif", fill: "#272906", align: "center"});
        game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#a24921", align: "center" });
    },

    // Mude o estado para o jogo real.
    startGame: function () {
        this.state.start('Game');
    }
};