var hero;
var ground;
var spriteScale;

var spaceKey;
var swipe;

/* global game */

var level1State = {

    preload: function() {
        game.load.spritesheet('hero', './assets/sprites/hero-16x16.png', 16, 16, 27);
        game.load.spritesheet('ground', './assets/sprites/ground_1-16x16.png', 16, 16, 1);
        game.load.spritesheet('grass', './assets/sprites/grass-16x16.png', 32, 16, 2);
        game.stage.smoothed = false; // scale up, reduce blur
    },

    create: function() {
        spriteScale = 4;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.physics.arcade.gravity.y = 600;

        game.world.setBounds(0, 0, 3500, game.height);
        game.stage.backgroundColor = '#3598db';

        grass = game.add.tileSprite(
            0, game.world.height - (2 * spriteScale * 16),
            w, spriteScale * 16,
            'grass');


        ground = game.add.tileSprite(
            0, game.world.height - (spriteScale * 16),
            w, spriteScale * 16,
            'ground');
        hero = game.add.sprite(w / 2 - spriteScale * 16 / 2, game.world.height - (2 * spriteScale * 16), 'hero');

        game.physics.enable([ground, hero], Phaser.Physics.ARCADE);

        grass.tileScale.y = spriteScale;
        grass.tileScale.x = spriteScale;

        ground.body.immovable = true;
        ground.body.allowGravity = false;
        ground.tileScale.y = spriteScale;
        ground.tileScale.x = spriteScale;

        hero.body.collideWorldBounds = true;
        hero.scale.setTo(spriteScale, spriteScale);
        hero.body.gravity.y = 600;

        hero.animations.add('run', [6, 7, 8, 9, 10, 11], 20, true);
        hero.animations.play('run');

        //  Register the keys.
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //  Stop the following keys from propagating up to the browser
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        swipe = game.input.activePointer;
    },

    update: function() {
        game.physics.arcade.collide(ground, hero);
        ground.tilePosition.x -= 2;
        grass.tilePosition.x -= 1;
        //grass.frame = Math.floor(Math.random() * 2); 

        // if (cursors.left.isDown) { }
        // else if (cursors.right.isDown) { }
        if (spaceKey.isDown ||
            (swipe.isDown && (swipe.positionDown.y > swipe.position.y))) {
            if (hero.body.touching.down) {
                hero.body.velocity.y = -300;

            }
        }
        // else if (cursors.down.isDown) { }

    },
    render: function() {
        // game.debug.body(hero);
        // game.debug.body(ground);
    }
};
