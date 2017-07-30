var hero;
var ground;
var crates;

var spriteScale;

var spaceKey;
var swipe;

/* global game */

var level1State = {

    create: function() {
        spriteScale = 4;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.physics.arcade.gravity.y = 600;
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
        hero = game.add.sprite(w / 2 - spriteScale * 16 / 2, game.world.height - (2 * spriteScale * 16), 'hero');

        grass.tileScale.y = spriteScale;
        grass.tileScale.x = spriteScale;
        
        

        crates = this.game.add.group();
        crates.enableBody = true;
        crates.createMultiple(12, 'crate');
        crates.setAll('checkWorldBounds', true);
        crates.setAll('outOfBoundsKill', true);
        
        var crate = crates.getFirstExists(false);
        crate.scale.setTo(spriteScale, spriteScale);2
        crate.reset(w - spriteScale * 12, game.world.height - (spriteScale * 16) - (12 * spriteScale));
        
        
        game.physics.enable([ground, hero, crate], Phaser.Physics.ARCADE);

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

        this.generatePath();
    },

    update: function() {
        game.physics.arcade.collide(ground, hero);
        game.physics.arcade.collide(crates, hero);
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
    },
    generatePath: function() {

    }
};
