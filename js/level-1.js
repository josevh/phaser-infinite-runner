var hero;
var ground;
var grass;
var crates;
var crate;

var spriteScale;

var spaceKey;
var swipe;
var jumpCount;

var counter;
var counterText;
var bestScoreText;
var gameOverText;

/* global game */

var level1State = {
    
    create: function() {
        jumpCount = 0;
        spriteScale = 4;
        counter = 0;

        gameOverText = game.add.text(game.world.centerX, game.world.centerY, 'Game Over', {
            font: "64px VT323",
            fill: "#ffffff",
            align: "center"
        });
        gameOverText.visible = false;
        gameOverText.anchor.setTo(0.5, 0.5);

        counterText = game.add.text(0, 0, 'Time: 0', {
            font: "48px VT323",
            fill: "#ffffff",
            align: "left"
        });
        
        bestScoreText = game.add.text(0, counterText.height, 'Best: ' + bestScore, {
            font: "48px VT323",
            fill: "#ffffff",
            align: "left"
        });
        bestScoreText.visible = bestScore > 0;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, w + 64, game.height);
        game.stage.backgroundColor = '#3598db';

        grass = game.add.tileSprite(
            0, game.world.height - (2 * spriteScale * 16),
            w, spriteScale * 16,
            'grass');
        ground = game.add.tileSprite(
            0, game.world.height - (spriteScale * 16),
            w, spriteScale * 16,
            'ground');
        hero = game.add.sprite(spriteScale * 16 * 2, game.world.height - (2 * spriteScale * 16), 'hero');

        crates = this.game.add.group();
        crates.enableBody = true;
        crates.createMultiple(12, 'crate');

        game.physics.enable([ground, hero], Phaser.Physics.ARCADE);

        grass.tileScale.y = spriteScale;
        grass.tileScale.x = spriteScale;

        ground.body.immovable = true;
        ground.body.allowGravity = false;
        ground.tileScale.y = spriteScale;
        ground.tileScale.x = spriteScale;

        hero.body.collideWorldBounds = true;
        hero.scale.setTo(spriteScale, spriteScale);
        hero.body.gravity.y = 2000;

        hero.animations.add('run', [6, 7, 8, 9, 10, 11], 20, true);
        hero.animations.play('run');


        //  Register the keys.
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //  Stop the following keys from propagating up to the browser
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        swipe = game.input.activePointer;
        
        spaceKey.onDown.add(this.unpause, this);
        spaceKey.onDown.add(this.playerJump, this);

        game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, game);
        this.placeCrate();
    },

    update: function() {
        game.physics.arcade.collide(ground, hero, this.playerHitGround, null, this);
        game.physics.arcade.collide(crate, hero, this.playerHitCrate, null, this);
        ground.tilePosition.x -= 2;
        grass.tilePosition.x -= 1;
    },
    render: function() {
        // game.debug.body(hero);
        // game.debug.body(ground);
    },
    placeCrate: function() {
        crate = crates.getFirstExists(false);
        crate.scale.setTo(spriteScale, spriteScale);
        crate.reset(
            w,
            game.world.height - (spriteScale * 16) - (12 * spriteScale));
        crate.body.velocity.x = -480;
        crate.body.kinematic = true;
        crate.body.immovable = true;
        crate.checkWorldBounds = true;
        crate.outOfBoundsKill = true;

        game.time.events.add(game.rnd.integerInRange(150, 3000), this.placeCrate, this);
    },
    playerHitCrate: function() {
        this.gameOver();
    },
    playerHitGround: function() {
        jumpCount = 0;
    },
    playerJump: function() {
        if (jumpCount < 2) {
            hero.body.velocity.y = -650;
            jumpCount++;
        }
    },
    updateCounter: function() { 
        counter++;
        counterText.setText('Time: ' + counter);
    },
    unpause: function() {
        if (game.paused === true) {
            game.state.start('level1');
            game.paused = false;
        }
    },
    gameOver: function() {
        if (counter > bestScore) {
            bestScore = counter;
        }
        gameOverText.visible = true;
        game.paused = true;
    }
};
