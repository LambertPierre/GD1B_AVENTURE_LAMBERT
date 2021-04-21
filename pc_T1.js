var player;
var epee;
var cursors;
var gameOver = false;

var straf= false;
var direction = 'bb';

var epeeCD = true;

var iconSouls;
var souls = 0;
var soulsText;

var playerApproach = false;

var tonneau1;
var tonneau2;
var tonneau3;

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

        this.load.spritesheet('epee', 'assets/placeholder/epee.png', { frameWidth: 300, frameHeight: 200 });
        this.load.spritesheet('ennemi', 'assets/placeholder/phe_deplacement.png', { frameWidth: 100, frameHeight: 150 });
        this.load.spritesheet('tonneau', 'assets/placeholder/ph_tonneau.png', { frameWidth: 100, frameHeight: 100 });

        this.load.spritesheet('iconSouls', 'assets/placeholder/ph_iconSouls.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('iconEpee', 'assets/placeholder/ph_iconEpee.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('iconPistolet', 'assets/placeholder/ph_iconPistolet.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('iconBarril', 'assets/placeholder/ph_iconBarril.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('potion', 'assets/placeholder/ph_potion.png', { frameWidth: 100, frameHeight: 100 });

        this.load.spritesheet('inventaire', 'assets/placeholder/ph_inventaire.png', { frameWidth: 1920, frameHeight: 1080 });
    }

    create ()
    {

        const map= this.make.tilemap({ key: 'map1', tileWidth:100, tileHeight:100});
        const tileset = map.addTilesetImage('placeholder_tiled', 'tiles');
        const vert = map.createLayer('vert', tileset, 0, 0);
        const orange = map.createLayer('orange', tileset, 0, 0);
        orange.setCollisionByExclusion(-1,true);
        
        
        player = this.physics.add.sprite(700, 700, 'dude');
        player.setCollideWorldBounds(true);
        player.body.height = 100;
        player.body.setOffset(0, 50);   

        this.physics.add.collider(player, orange);
        const zone = map.createLayer('zone', tileset, 0, 0);
        const jaune = map.createLayer('jaune', tileset, 0, 0);

        this.cameras.main.setBounds(0, 0, 1500, 1500);
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1.3);
    
        //   soul = this.add.sprite(400, 300, 'soul');

        function changementZone(player, zone){
            if (player.y<100){
                this.scene.start("pc_T2");
     
             }
        }

        tonneau1 = this.physics.add.sprite(1350, 650, 'tonneau');
        this.physics.add.overlap(tonneau1, epee, hitTonneau);
        /*tonneau2 = this.physics.add.sprite(1350, 750, 'tonneau');
        tonneau3 = this.physics.add.sprite(1350, 850, 'tonneau');*/

        function hitTonneau(tonneau1, epee){
            tonneau1.destroy();
        }

        // ---------- UI ----------- //

        iconSouls = this.add.sprite(1600, 170, 'iconSouls').setScale(0.6).setScrollFactor(0);

        soulsText = this.add.text(1430, 165, 'âmes: 0', { fontSize: '28px', fill: '#FFF', /*font: '"brush-tipTexe TRIAL"'*/ }).setScrollFactor(0);

        // ---------- FIN UI ----------- //



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
        //-------------------------------- Ennemi --------------------------------------//

        this.anims.create({
            key: 'phebb',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phebd',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phedd',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phehd',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 6, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phehh',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 8, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phehg',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 10, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phegg',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 12, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'phebg',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 14, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        //-------------------------------- FIN Ennemi --------------------------------------//

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

        this.anims.create({
            key: 'inventaireAnim',
            frames: this.anims.generateFrameNumbers('inventaire', { start: 0, end: 3 }),
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
            right:Phaser.Input.Keyboard.KeyCodes.D,
            epeeInput:Phaser.Input.Keyboard.KeyCodes.SHIFT,
            inventaireInput:Phaser.Input.Keyboard.KeyCodes.E});


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
        /*if (cursors.up.isDown && cursors.left.isDown){
            player.setVelocityX(-150);
            player.setVelocityY(-150);
            player.anims.play('phphg', true);
        }
        else if (cursors.up.isUp && cursors.left.isUp){
            player.setVelocityX(0);
            player.setVelocityY(0);
        }
        else if (cursors.up.isDown && cursors.right.isDown){
            player.setVelocityX(150);
            player.setVelocityY(-150);
            player.anims.play('phphd', true);
        }
        else if (cursors.up.isUp && cursors.right.isUp){
            player.setVelocityX(0);
            player.setVelocityY(0);
        }
        else if (cursors.right.isDown){
            player.setVelocityX(300);
            player.anims.play('phpdd', true);
        }
        else if (cursors.left.isDown){
            player.setVelocityX(-300);
            player.anims.play('phpgg', true);
        }
        else if (cursors.right.isUp && cursors.left.isUp){
            player.setVelocityX(0);
        }
        else if (cursors.up.isDown){
            player.setVelocityY(-300);
            player.anims.play('phphh', true);
        }
        else if (cursors.down.isDown){
            player.setVelocityY(300);
            player.anims.play('phpbb', true);
        }
        else if (cursors.up.isUp && cursors.down.isUp){
            player.setVelocityY(0);
        }*/

        
        
        if (cursors.right.isDown && cursors.up.isDown && !cursors.left.isDown && !cursors.down.isDown){
            /*player.x += speed/Math.sqrt(2);           // Déplacements vers la diagonale haut doite                     
            player.y -= speed/Math.sqrt(2); */
            player.setVelocityX(300);
            player.setVelocityY(-300);
            player.anims.play('phphd', true);
            direction = 'hd';
        }

        else if (cursors.left.isDown && cursors.up.isDown && !cursors.down.isDown && !cursors.right.isDown){
            /*player.x -= speed/Math.sqrt(2);           // Déplacements vers la diagonale haut gauche                      
            player.y -= speed/Math.sqrt(2); */
            player.setVelocityX(-300);
            player.setVelocityY(-300);
            player.anims.play('phphg', true);
            direction = 'hg';                      
        }

        else if (cursors.down.isDown && cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown){
            /*player.x -= speed/Math.sqrt(2);           // Déplacements vers la diagonale bas gauche                      
            player.y += speed/Math.sqrt(2);*/
            player.setVelocityX(-300);
            player.setVelocityY(300);
            player.anims.play('phpbg', true);
            direction = 'bg';                       
        }

        else if (cursors.down.isDown && cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown){
            /*player.x += speed/Math.sqrt(2);           // Déplacements vers la diagonale bas droite                      
            player.y += speed/Math.sqrt(2);*/
            player.setVelocityX(300);
            player.setVelocityY(300);
            player.anims.play('phpbd', true);
            direction = 'bd';                         
        }

        // -- Déplacements Horizontaux Verticaux --


        else if (cursors.right.isDown && !cursors.left.isDown && !cursors.down.isDown && !cursors.up.isDown){
            /*player.x += speed;*/
            player.setVelocityX(400);
            player.setVelocityY(0);
            player.anims.play('phpdd', true);                        // Déplacement vers la droite
            direction = 'dd';
        }

        else if (cursors.left.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown){
            /*player.x -= speed;*/
            player.setVelocityX(-400);
            player.setVelocityY(0);
            player.anims.play('phpgg', true);                        // Déplacement vers la gauche
            direction = 'gg';
        }

        else if (cursors.down.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown){
            /*player.y += speed;*/
            player.setVelocityY(400);
            player.setVelocityX(0);
            player.anims.play('phpbb', true);                        // Déplacement vers le bas
            direction = 'bb';
        }

        else if (cursors.up.isDown && !cursors.left.isDown && !cursors.down.isDown && !cursors.right.isDown){
            /*player.y -= speed;*/
            player.setVelocityY(-400);
            player.setVelocityX(0);
            player.anims.play('phphh', true);                        // Déplacement vers le haut
            direction = 'hh';
        }
        else{
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('phpbb',false);
        }

        // ------------------------------------------------------ POUVOIRS -------------------------------------------------------- //

        if (cursors.epeeInput.isDown && epeeCD==true){
            if (direction=='hd'){
                epee = this.physics.add.sprite(player.x+100,player.y-100, 'epee').setRotation(0.735);
                epee.body.height = 250;
                epee.body.width = 250;
                epee.body.setOffset(25, -25);
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='hg'){
                epee = this.physics.add.sprite(player.x-100,player.y-100, 'epee').setRotation(-0.735);
                epee.body.height = 250;
                epee.body.width = 250;
                epee.body.setOffset(25, -25);
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='bd'){
                epee = this.physics.add.sprite(player.x+100,player.y+100, 'epee').setRotation(2.305);
                epee.body.height = 250;
                epee.body.width = 250;
                epee.body.setOffset(25, -25);
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='bg'){
                epee = this.physics.add.sprite(player.x-100,player.y+100, 'epee').setRotation(-2.305);
                epee.body.height = 250;
                epee.body.width = 250;
                epee.body.setOffset(25, -25);
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='dd'){
                epee = this.physics.add.sprite(player.x+150,player.y, 'epee').setRotation(1.57);
                epee.body.height = 300;
                epee.body.width = 200;
                epee.body.setOffset(50, -50);   
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='gg'){
                epee = this.physics.add.sprite(player.x-150,player.y, 'epee').setRotation(-1.57);
                epee.body.height = 300;
                epee.body.width = 200;
                epee.body.setOffset(50, -50);  
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='bb'){
                epee = this.physics.add.sprite(player.x,player.y+150, 'epee').setRotation(-3.14);
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='hh'){
                epee = this.physics.add.sprite(player.x,player.y-150, 'epee');
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }

        }

        if (player.y<100){
           this.scene.start("pc_T2");

        }

        

    }
}