
var platforms;
var cursors;


var gameOver = false;

var ennemi;
var directionEnnemi = 1;

var pnj;
var pnjApp;
var playerApproach = false;

var inventaire;
var inventaireOuvert = false;

var iconSouls;

var iconSoul;
var iconSoulText;

var soulCollected = false;

var playerApproach = false;

var ennemiAggro = false;

var soul;
var soulCollected = false;

var tonneau1;
var tonneau2;
var tonneau3;


class pc_T2 extends Phaser.Scene{
    constructor(){
        super("pc_T2");
    }
    init(data){
    }
    preload ()
    {
        this.load.spritesheet('dude', 'assets/placeholder/php_deplacement.png', { frameWidth: 100, frameHeight: 150 });

        this.load.image('tiles','assets/placeholder/placeholder_tiled.png');
        this.load.tilemapTiledJSON('map2','assets/placeholder/pc_T2.json');

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

        this.load.spritesheet('inventaire', 'assets/placeholder/ph_inventaire.png', { frameWidth: 7680, frameHeight: 1080 });
    }

    create ()
    {

        const map= this.make.tilemap({ key: 'map2'});
        const tileset = map.addTilesetImage('placeholder_tiled', 'tiles');
        const bleu = map.createLayer('bleu', tileset, 0, 0);
        const vert = map.createLayer('vert', tileset, 0, 0);
        const orange = map.createLayer('orange', tileset, 0, 0);
        orange.setCollisionByExclusion(-1,true);
        bleu.setCollisionByExclusion(-1,true);
        
        
        player = this.physics.add.sprite(1300, 1800, 'dude');
        //player.setCollideWorldBounds(true);
        player.body.height = 100;
        player.body.setOffset(0, 50);   

        this.physics.add.collider(orange, player);
        this.physics.add.collider(bleu, player);
        const jaune = map.createLayer('jaune', tileset, 0, 0);

        this.cameras.main.setBounds(0, 0, 2500, 2000);
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1);
    
        //   soul = this.add.sprite(400, 300, 'soul');

        ennemi = this.physics.add.sprite(900, 801, 'ennemi');
        ennemi.body.height = 100;
        ennemi.body.setOffset(0, 50);   
        //ennemi.setCollideWorldBounds(true);
        this.physics.add.collider(orange, ennemi);
        this.physics.add.collider(bleu, ennemi);

        
        tonneau1 = this.physics.add.sprite(550, 1250, 'tonneau');
        this.physics.add.overlap(tonneau1, epee, hitTonneau);
        tonneau2 = this.physics.add.sprite(550, 1350, 'tonneau');
        tonneau3 = this.physics.add.sprite(550, 1450, 'tonneau');

        function hitTonneau(tonneau1, epee){
            tonneau1.destroy();
        }

        soul = this.physics.add.sprite(1200, 1100, 'soul');
        this.physics.add.overlap(soul, player, collectSoul);

        function collectSoul(soul, player){
            soulCollected=true;
            soul.destroy();
            souls += 1;
            soulsText.setText('âmes: ' + souls);
            //iconSoul = this.physics.add.sprite(1200,1100, 'iconSouls').setScale(0.3);
            soulText = this.physics.add.text((1200,1100, '+1', { fontSize: '20px', fill: '#FFF' }));
            //iconSoul.setVelocityY(-50);
            soulText.setVelocityY(-50);
            //setTimeout(function(){iconSoul.destroy()}, 1000);
            setTimeout(function(){soulText.destroy()}, 1000);
        }

        // ---------- UI ----------- //

        iconSouls = this.add.sprite(1790, 60, 'iconSouls').setScale(0.8).setScrollFactor(0);

        soulsText = this.add.text(1575, 60, 'âmes: 0', { fontSize: '35px', fill: '#FFF' }).setScrollFactor(0);

        // ---------- FIN UI ----------- //

        //----------------------------------------------------------------  ANIMATION  -------------------------------------------------------------------------//

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

        if (player.y>1900){
            this.scene.start("pc_T1");
        }

        //------------------------------------------------------------------- Déplacement ----------------------------------------------------------------//

        if (cursors.right.isDown && cursors.up.isDown && !cursors.left.isDown && !cursors.down.isDown){
            // Déplacements vers la diagonale haut doite                     
            player.setVelocityX(300);
            player.setVelocityY(-300);
            player.anims.play('phphd', true);
            direction = 'hd';
        }

        else if (cursors.left.isDown && cursors.up.isDown && !cursors.down.isDown && !cursors.right.isDown){
            // Déplacements vers la diagonale haut gauche                      
            player.setVelocityX(-300);
            player.setVelocityY(-300);
            player.anims.play('phphg', true);
            direction = 'hg';                      
        }

        else if (cursors.down.isDown && cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown){          
            // Déplacements vers la diagonale bas gauche                      
            player.setVelocityX(-300);
            player.setVelocityY(300);
            player.anims.play('phpbg', true);
            direction = 'bg';                       
        }

        else if (cursors.down.isDown && cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown){
        // Déplacements vers la diagonale bas droite                      
            player.setVelocityX(300);
            player.setVelocityY(300);
            player.anims.play('phpbd', true);
            direction = 'bd';                         
        }

        // -- Déplacements Horizontaux Verticaux --


        else if (cursors.right.isDown && !cursors.left.isDown && !cursors.down.isDown && !cursors.up.isDown){
            player.setVelocityX(400);
            player.setVelocityY(0);
            player.anims.play('phpdd', true);                        // Déplacement vers la droite
            direction = 'dd';
        }

        else if (cursors.left.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown){
            player.setVelocityX(-400);
            player.setVelocityY(0);
            player.anims.play('phpgg', true);                        // Déplacement vers la gauche
            direction = 'gg';
        }

        else if (cursors.down.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown){
            player.setVelocityY(400);
            player.setVelocityX(0);
            player.anims.play('phpbb', true);                        // Déplacement vers le bas
            direction = 'bb';
        }

        else if (cursors.up.isDown && !cursors.left.isDown && !cursors.down.isDown && !cursors.right.isDown){
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

        // ------------------------------------------------------- INVENTAIRE ------------------------------------------------------ //

        if (cursors.inventaireInput.isDown && inventaireOuvert == false){                 
            inventaire = this.physics.add.sprite(player.x, player.y, 'inventaire')
            inventaire.anims.play('inventaireAnim', true);
            inventaireOuvert = true;
        }
        if (cursors.inventaireInput.isDown && inventaireOuvert == true){                 
            inventaire.destroy();
        }

        // ------------------------------------------------------- FIN INVENTAIRE ------------------------------------------------------ //


        // ------------------------------------------------------- EVENEMENT ------------------------------------------------------ //

        /*if (player.y<1100 && playerApproach == false){
            playerApproach = true;
            pnj = this.add.sprite(1300, 700, 'pnj');
            pnj.anims.play('pnj_anim', true);
            pnjApp = this.add.sprite(1300, 700, 'pnjApp').setScale(1.5);
            pnjApp.anims.play('pnjApp_anim', true);
            setTimeout(function(){pnjApp.destroy()}, 500);
        }*/
        // ---------- Aggro ----------- //

        if (Math.pow(Math.pow(player.x-ennemi.x,2)+Math.pow(player.y-ennemi.y,2),1/2)>300){
            /*setTimeout(function(){ennemi.setVelocityX(250).setVelocityY(0)}, 500);
            setTimeout(function(){ennemi.setVelocityY(250).setVelocityX(0)}, 500);
            setTimeout(function(){ennemi.setVelocityX(-250).setVelocityY(0)}, 500);
            setTimeout(function(){ennemi.setVelocityY(-250).setVelocityX(0)}, 500);
            setTimeout(function(){rondeFinie1=true}, 4000);*/
            /*if (ennemi.y<800 && directionEnnemi==1){
                directionEnnemi=2
                ennemi.setVelocityX(250);
                ennemi.setVelocityY(0);
            }
            if (ennemi.x<1500 && directionEnnemi==2){
                directionEnnemi=3
                ennemi.setVelocityY(250);
                ennemi.setVelocityX(0);
            }
            if (ennemi.y<1400 && directionEnnemi==3){
                directionEnnemi=4
                ennemi.setVelocityX(-250);
                ennemi.setVelocityY(0);
            }
            if (ennemi.x<900 && directionEnnemi==4){
                directionEnnemi=1
                ennemi.setVelocityY(-250);
                ennemi.setVelocityX(0);
            }*/

        }
        else if (Math.pow((Math.pow(player.x-ennemi.x,2))+(Math.pow(player.y-ennemi.y,2)),1/2)<=300){
            ennemi.setVelocityX(player.x-ennemi.x);
            ennemi.setVelocityY(player.y-ennemi.y);
        }

        // ------------------------------ Souls ---------------------------------//

        if (Math.pow(Math.pow(player.x-soul.x,2)+Math.pow(player.y-soul.y,2),1/2)<300 && soulCollected == false){
            soul.anims.play('soul_anim', true);
            soul.setVelocityX(player.x-soul.x);
            soul.setVelocityY(player.y-soul.y);
        }
        else if (Math.pow(Math.pow(player.x-soul.x,2)+Math.pow(player.y-soul.y,2),1/2)>300 && soulCollected == false){
            soul.setVelocityX(0);
            soul.setVelocityY(0);
            soul.anims.play('soul_anim', true);
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

        

    }
}