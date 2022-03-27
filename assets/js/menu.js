var Menu = {

    // Carregue todos os recursos necessários para o menu.
    preload : function() {
        game.load.image('menu', './assets/images/start_game.jpeg');
    },

    // Adicionar tela de menu.
    // Ele atuará como um botão para iniciar o jogo.
    create: function () {
        this.add.button(0, 0, 'menu', this.startGame, this);
    },

    // Mude o estado para o jogo real.
    startGame: function () {
        this.state.start('Game');
    }
};