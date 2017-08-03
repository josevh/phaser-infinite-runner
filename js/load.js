WebFontConfig = {
    // active: function() {
    //     game.time.events.add(Phaser.Timer.SECOND, loadState.createText, this);
    // },
    google: {
        families: ["VT323"]
    }
}

var bestScore;

var loadState = {

    preload: function () {
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        /*
        Load all game assets
        Place your load bar, some messages.
        In this case of loading, only text is placed...
        */

        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px VT323', fill: '#fff'});

        //Load your images, spritesheets, bitmaps...
        game.load.image('boiler-logo', 'assets/img/boilerplate-logo.png');   
        game.load.spritesheet('hero', './assets/sprites/hero-16x16.png', 16, 16, 27);
        game.load.spritesheet('ground', './assets/sprites/ground_1-16x16.png', 16, 16, 1);
        game.load.spritesheet('grass', './assets/sprites/grass-16x16.png', 32, 16, 2);
        game.load.spritesheet('crate', './assets/sprites/crate-12x12.png', 12, 12, 1);

        //Load your sounds, efx, music...
        //Example: game.load.audio('rockas', 'assets/snd/rockas.wav');

        //Load your data, JSON, Querys...
        //Example: game.load.json('version', 'http://phaser.io/version.json');
        
        game.stage.smoothed = false; // scale up, reduce blur


        bestScore = 0;
    },

    create: function () {
        game.stage.setBackgroundColor('#000');
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.state.start('menu');
    }
};
