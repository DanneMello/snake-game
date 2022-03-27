var Menu = {

    preload : function() {
        // Carregue todos os recursos necessários para o menu.
        game.load.image('menu', './assets/images/menu.png');
    },

    create: function () {

        // Adicionar tela de menu.
        // Ele atuará como um botão para iniciar o jogo.
        this.add.button(0, 0, 'menu', this.startGame, this);

    },

    startGame: function () {

        // Mude o estado para o jogo real.
        this.state.start('Game');

    }

};