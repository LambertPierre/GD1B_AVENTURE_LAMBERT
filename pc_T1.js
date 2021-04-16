var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var speed = 10;

var soulCollected = false;

var playerApproach = false;

class pc_T1 extends Phaser.Scene{
    constructor(){
        super("pc_T1");
    }
    init(data){
    }
    preload ()
    {
        this.load.spritesheet('dude', 'assets/placeholder/php_deplacement.png', { frameWidth: 100, frameHeight: 150 });

        this.load.image('tiles','assets/placeholder/placeholder_tiled.png');
        this.load.tilemapTiledJSON('map1','assets/placeholder/pc_T1.json');

        this.load.spritesheet('soul', 'assets/items/soul_sprite.png', { frameWidth: 80, frameHeight: 100 });

        this.load.spritesheet('pnj', 'assets/items/pnj_sprite.png', { frameWidth: 200, frameHeight: 300 });
        this.load.spritesheet('pnjApp', 'assets/items/pnj_apparition_sprite.png', { frameWidth: 300, frameHeight: 400 });
    }

    create ()
    {

        const map= this.make.tilemap({ key: 'map1', tileWidth:100, tileHeight:100});
        const tileset = map.addTilesetImage('placeholder_tiled', 'tiles');
        const vert = map.createStaticLayer('vert', tileset, 0, 0);
        const orange = map.createStaticLayer('orange', tileset, 0, 0);
        orange.setCollisionByExclusion(-1,true);
        
        
        player = this.physics.add.sprite(700, 700, 'dude');
        player.setCollideWorldBounds(true);
        player.body.height = 100;
        player.body.setOffset(0, 50);   

        this.physics.add.collider(player, orange);
        const zone = map.createStaticLayer('zone', tileset, 0, 0);
        const jaune = map.createStaticLayer('jaune', tileset, 0, 0);

        this.cameras.main.setBounds(0, 0, 1500, 1500);
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1.3);
    
        //   soul = this.add.sprite(400, 300, 'soul');

        function changementZone(player, zone){
            if (player.y<100){
                this.scene.start("pc_T2");
     
             }
        }


        //----------------------------------------------------------------  ANIMATION  -------------------------------------------------------------------------//
        this.anims.create({
            key: 'phpbb',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phpbd',
            frames: this.anims.generateFrameNumbers('dude', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phpdd',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phphd',
            frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phphh',
            frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phphg',
            frames: this.anims.generateFrameNumbers('dude', { start: 10, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phpgg',
            frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phpbg',
            frames: this.anims.generateFrameNumbers('dude', { start: 14, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
        //----------------------------------------------------------------------//

        this.anims.create({
            key: 'soul_anim',
            frames: this.anims.generateFrameNumbers('soul', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'pnj_anim',
            frames: this.anims.generateFrameNumbers('pnj', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'pnjApp_anim',
            frames: this.anims.generateFrameNumbers('pnjApp', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        });

        //--------------------------------------------------------------  FIN ANIMATION  ------------------------------------------------------------------------//

        //  Input Events
        //cursors = this.input.keyboard.createCursorKeys();
        cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.Z,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.Q,
            right:Phaser.Input.Keyboard.KeyCodes.D});


    }
    
    update ()
    {
        if (gameOver)
        {
            return;
        }
        /*if (soulCollected == false)
        {
            soul.anims.play('soul_anim', true);
        }

        if (player.x>500 && playerApproach == false){
            playerApproach = true;
            pnj = this.add.sprite(400, 700, 'pnj');
            pnj.anims.play('pnj_anim', true);
            pnjApp = this.add.sprite(400, 700, 'pnjApp').setScale(1.5);
            pnjApp.anims.play('pnjApp_anim', true);
            setTimeout(function(){pnjApp.destroy()}, 500);

        }*/
        //------------------------------------------------------------------- Déplacement ----------------------------------------------------------------//

        if (cursors.right.isDown && cursors.up.isDown && !cursors.left.isDown && !cursors.down.isDown){
            player.x += speed/Math.sqrt(2);           // Déplacements vers la diagonale haut doite                     
            player.y -= speed/Math.sqrt(2); 
            player.anims.play('phphd', true);
        }

        else if (cursors.left.isDown && cursors.up.isDown && !cursors.down.isDown && !cursors.right.isDown){
            player.x -= speed/Math.sqrt(2);           // Déplacements vers la diagonale haut gauche                      
            player.y -= speed/Math.sqrt(2); 
            player.anims.play('phphg', true);                      
        }

        else if (cursors.down.isDown && cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown){
            player.x -= speed/Math.sqrt(2);           // Déplacements vers la diagonale bas gauche                      
            player.y += speed/Math.sqrt(2);
            player.anims.play('phpbg', true);                       
        }

        else if (cursors.down.isDown && cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown){
            player.x += speed/Math.sqrt(2);           // Déplacements vers la diagonale bas droite                      
            player.y += speed/Math.sqrt(2);
            player.anims.play('phpbd', true);                         
        }

        // -- Déplacements Horizontaux Verticaux --


        else if (cursors.right.isDown && !cursors.left.isDown && !cursors.down.isDown && !cursors.up.isDown){
            player.x += speed;
            player.anims.play('phpdd', true);                        // Déplacement vers la droite
        }

        else if (cursors.left.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown){
            player.x -= speed;
            player.anims.play('phpgg', true);                        // Déplacement vers la gauche
        }

        else if (cursors.down.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown){
            player.y += speed;
            player.anims.play('phpbb', true);                        // Déplacement vers le bas
        }

        else if (cursors.up.isDown && !cursors.left.isDown && !cursors.down.isDown && !cursors.right.isDown){
            player.y -= speed;
            player.anims.play('phphh', true);                        // Déplacement vers le haut
        }
        else{
            player.anims.play('phpbb',false);
        }

        if (player.y<100){
           this.scene.start("pc_T2");

        }

        

    }
}