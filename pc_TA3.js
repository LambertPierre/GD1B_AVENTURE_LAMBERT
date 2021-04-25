
var ennemi;
var ennemiMort = false;
var ennemiStop = false;


class pc_TA3 extends Phaser.Scene{
    constructor(){
        super("pc_TA3");
    }
    init(data){
    }
    preload ()
    {
        this.load.spritesheet('dude', 'assets/placeholder/php_deplacement.png', { frameWidth: 100, frameHeight: 150 });

        this.load.image('tiles','assets/placeholder/placeholder_tiled.png');
        this.load.tilemapTiledJSON('map6','assets/placeholder/pc_TA3.json');

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

        this.load.spritesheet('souris', 'assets/placeholder/ph_souris.png', { frameWidth: 200, frameHeight: 200 });

        this.load.spritesheet('vie', 'assets/placeholder/ph_vie.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('vie1', 'assets/placeholder/ph_vie1.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('vie2', 'assets/placeholder/ph_vie2.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('vie3', 'assets/placeholder/ph_vie3.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('vie4', 'assets/placeholder/ph_vie4.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('vie5', 'assets/placeholder/ph_vie5.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('vie6', 'assets/placeholder/ph_vie6.png', { frameWidth: 200, frameHeight: 200 });

        this.load.spritesheet('boulet', 'assets/placeholder/ph_boulet.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('explosion', 'assets/placeholder/ph_explosion.png', { frameWidth: 400, frameHeight: 400 });

        this.load.spritesheet('barricade', 'assets/placeholder/ph_barricade.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('caisse', 'assets/placeholder/ph_caisse.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('barril', 'assets/placeholder/ph_barril.png', { frameWidth: 100, frameHeight: 100 });

        this.load.spritesheet('textPistolet', 'assets/placeholder/textes/pc_textPistolet.png', { frameWidth: 1920, frameHeight: 1080 });
    }

    create ()
    {

        const map= this.make.tilemap({ key: 'map6'});
        const tileset = map.addTilesetImage('placeholder_tiled', 'tiles');
        const bleu = map.createLayer('bleu', tileset, 0, 0);
        const vert = map.createLayer('vert', tileset, 0, 0);
        const orange = map.createLayer('orange', tileset, 0, 0);
        orange.setCollisionByExclusion(-1,true);
        bleu.setCollisionByExclusion(-1,true);


        player = this.physics.add.sprite(1100, 2300, 'dude');

        //player.setCollideWorldBounds(true);
        player.body.height = 100;
        player.body.setOffset(0, 50);   

        this.physics.add.collider(orange, player);
        this.physics.add.collider(bleu, player);
        const jaune = map.createLayer('jaune', tileset, 0, 0);

        this.cameras.main.setBounds(0, 0, 2500, 2500);
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1);

        // ----  Groups -------//

        boulets = this.physics.add.group();

        explosions = this.physics.add.group();

        megaExplosions = this.physics.add.group();

        epees = this.physics.add.group();

        ennemis = this.physics.add.group();

        caisses = this.physics.add.group({immovable:true});

        barricades = this.physics.add.group({immovable:true});

        tonneaux = this.physics.add.group({immovable:true});

        tonneauxPotion = this.physics.add.group({immovable:true});

        barrils = this.physics.add.group({immovable:true});

        potions = this.physics.add.group();

        souls = this.physics.add.group();

        //ennemis.setCollideWorldBounds(true);

        //                     ----------- ENNEMIS ------------
        /*
        this.physics.add.collider(orange, ennemis);
        this.physics.add.collider(bleu, ennemis);

        this.physics.add.overlap(ennemis, epees, epeeEnnemi);
        this.physics.add.overlap(ennemis, boulets, bouletEnnemi);
        this.physics.add.overlap(ennemis, explosions, explosionEnnemi);
        this.physics.add.overlap(ennemis, megaExplosions, megaExplosionEnnemi);

        this.physics.add.overlap(player, ennemis, hitEnnemi);

        function epeeEnnemi(ennemis, epees){
            if (ennemis.tint != 0x777777){
                ennemis.tint = 0x777777;

                ennemiStop = true;
                ennemi.setVelocityX(0);
                ennemi.setVelocityY(0);
                ennemi.alpha = 0.5;
                setTimeout(function(){ennemi.alpha = 1}, 2000);
                setTimeout(function(){ennemiStop=false}, 1000);
            }
            else{
            console.log(1);
            ennemiMort = true;
            ennemis.destroy();

            }
            
        }

        function bouletEnnemi(ennemis, boulets){
            boulets.destroy();
            explosion = explosions.create(boulets.x, boulets.y,'explosion').setScale(0.6);
            setTimeout(function(){explosion.destroy()}, 200);
        }

        function explosionEnnemi(ennemis, explosions){
            ennemiStop = true;
            ennemi.setVelocityX(0);
            ennemi.setVelocityY(0);
            ennemi.alpha = 0.5;
            setTimeout(function(){ennemi.alpha = 1}, 2000);
            setTimeout(function(){ennemiStop=false}, 1000);
        }

        function megaExplosionEnnemi(ennemis, megaExplosions){
            ennemiStop = true;
            ennemi.setVelocityX(0);
            ennemi.setVelocityY(0);
            ennemi.alpha = 0.5;
            setTimeout(function(){ennemi.alpha = 1}, 2000);
            setTimeout(function(){ennemiStop=false}, 1000);
        }

        function hitEnnemi(player, ennemis){
            if (invinsible == false){
                vie -= 1;
                invinsible = true;
                player.alpha = 0.5;
                setTimeout(function(){player.alpha = 1}, 2000);
                setTimeout(function(){invinsible = false}, 2000);

                ennemiStop = true;
                ennemi.setVelocityX(0);
                ennemi.setVelocityY(0);
                setTimeout(function(){ennemiStop=false}, 1000);
            }

        }

        ennemi = ennemis.create(900, 801, 'ennemi');
        ennemi.body.height = 100;
        ennemi.body.setOffset(0, 50);   
        */


        //                     ----------- TONNEAUX ------------
        
        this.physics.add.collider(ennemis,tonneaux);
        this.physics.add.collider(player,tonneaux);
        this.physics.add.overlap(tonneaux, epees, hitTonneaux);

        function hitTonneaux(tonneaux, epees){
            soul = souls.create(tonneaux.x, tonneaux.y, 'soul');
            tonneaux.destroy();

        }

        tonneau = tonneaux.create(1650, 1850, 'tonneau');
        tonneau = tonneaux.create(1250, 1550, 'tonneau');

        tonneau = tonneaux.create(1050, 250, 'tonneau');
        tonneau = tonneaux.create(1550, 550, 'tonneau');
        tonneau = tonneaux.create(2250, 250, 'tonneau');




        //                     ----------- CAISSES ------------

        this.physics.add.collider(player,caisses);
        this.physics.add.collider(ennemis,caisses);
        this.physics.add.overlap(caisses,boulets, bouletCaisse);
        this.physics.add.overlap(caisses,explosions, explosionCaisse);
        this.physics.add.overlap(caisses,megaExplosions, explosionCaisse);

        function bouletCaisse(caisses, boulets){
            boulets.destroy();
            explosion = explosions.create(boulets.x, boulets.y,'explosion').setScale(0.6);
            setTimeout(function(){explosion.destroy()}, 200);
        }
        function explosionCaisse(caisses, explosions){
            caisses.destroy();
        }




        //                     ----------- BARRICADES ------------

        this.physics.add.collider(ennemis,barricades);
        this.physics.add.collider(player,barricades);
        this.physics.add.overlap(barricades,megaExplosions, megaExplosionBarricade);

        function megaExplosionBarricade(barricades, megaExplosions){
            barricades.destroy();
        }




        //                     ----------- BARRILS ------------
        
        this.physics.add.collider(player,barrils);
        this.physics.add.collider(ennemis,barrils);
        this.physics.add.overlap(boulets, barrils, explosionBouletBarrils);
        this.physics.add.overlap(player, megaExplosions, playerMegaExplosion);

        function explosionBarrils(epees, explosions, megaExplosions, barrils){
            megaExplosion = megaExplosions.create(barrils.x, barrils.y,'explosion').setScale(1.3);
            barrils.destroy();
            setTimeout(function(){megaExplosion.destroy()}, 300);
        }
        function explosionBouletBarrils(boulets, barrils){
            boulets.destroy();
            megaExplosion = megaExplosions.create(barrils.x, barrils.y,'explosion').setScale(1.3);
            barrils.destroy();
            setTimeout(function(){megaExplosion.destroy()}, 300);
        }
        function playerMegaExplosion(player, megaExplosions){
            if (invinsible == false){
                vie -= 2;
                invinsible = true;
                player.alpha = 0.5;
                setTimeout(function(){player.alpha = 1}, 2000);
                setTimeout(function(){invinsible = false}, 2000);
            }

        }
        //                     -------- TONNEAUXPOTION --------

        this.physics.add.collider(ennemis,tonneauxPotion);
        this.physics.add.collider(player,tonneauxPotion);
        this.physics.add.overlap(tonneauxPotion, epees, hitTonneauxPotion);

        function hitTonneauxPotion(tonneauxPotion, epees){
            potion = potions.create(tonneauxPotion.x, tonneauxPotion.y, 'potion');
            tonneauxPotion.destroy();

        }

        tonneauPotion = tonneauxPotion.create(2250, 1050, 'tonneau');

        //                     ----------- POTIONS ------------

        this.physics.add.overlap(player, potions, collectPotion);

        function collectPotion(player, potions){
            potionCollected=true;
            setTimeout(function(){potionCollected=false}, 1000);
            potions.destroy();
            stockPotion += 1;
            potionsText.setText( '' + stockPotion);
        }


        //                     ----------- SOULS ------------

        this.physics.add.overlap(player, souls, collectSoul);

        function collectSoul(player, souls){
            soulCollected=true;
            setTimeout(function(){soulCollected=false}, 1000);
            souls.destroy();
            soulsStock += 1;
            soulsText.setText('âmes: ' + soulsStock);
        }


        // ---------- UI ----------- //

        iconSouls = this.add.sprite(1790, 60, 'iconSouls').setScale(0.8).setScrollFactor(0);

        soulsText = this.add.text(1575, 60, 'âmes: '+ soulsStock, { fontSize: '35px', fill: '#FFF' }).setScrollFactor(0);

        vieIcon = this.add.sprite(1730, 220, 'vie1').setScale(1).setScrollFactor(0);

        iconEpee  = this.add.sprite(130, 780, 'iconEpee').setScale(1).setScrollFactor(0);

        iconPistolet  = this.add.sprite(130, 580, 'iconPistolet').setScale(1).setScrollFactor(0);

        iconBarril  = this.add.sprite(130, 380, 'iconBarril').setScale(0.8).setScrollFactor(0);

        iconPotion = this.add.sprite(1750, 780, 'potion').setScale(2.1).setScrollFactor(0);

        potionsText = this.add.text(1740, 780, stockPotion, { fontSize: '80px', fill: '#FFF' }).setScrollFactor(0);
        // ---------- FIN UI ----------- //

        mouseCursor = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'souris').setScale(0.3).setScrollFactor(0);
        mouseCursorBarril = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'barril').setScrollFactor(0);
        mouseCursorBarril.alpha = 0;

        
        // ------------------------- Mannette --------------------------------- //

        if (this.input.gamepad.total === 0){
            this.input.gamepad.once('connected', function (pad, button, index) {
                paddle = pad;
                padConnected = true;
            }); 
        }
        else {
            paddle = this.input.gamepad.pad1;
        }


        cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.Z,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.Q,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            epeeInput:Phaser.Input.Keyboard.KeyCodes.SHIFT,
            pistoletInput:Phaser.Input.Keyboard.KeyCodes.SPACE,
            barrilInput:Phaser.Input.Keyboard.KeyCodes.E,
            potionInput:Phaser.Input.Keyboard.KeyCodes.A,
            dialogueInput:Phaser.Input.Keyboard.KeyCodes.F});
            
        if (pistoletCollected == false){
            collectPistolet = this.physics.add.sprite(1200, 1800, 'iconPistolet').setScale(0.5);
            this.physics.add.overlap(player,collectPistolet, collectPistoletd);
        
            function collectPistoletd(player, collectPistolet){
                pistoletCollected = true;
                collectPistolet.destroy();
        }
        }
        

    }
    
    update ()
    {
        if (gameOver)
        {
            return;
        }
        cursorPosition();
        cursorBarrilPosition();

        // -------- Switch de scènes ----------- //

        if (player.y>2400){
            position = "TA3-TA2";
            this.scene.start("pc_TA2");
            
        }

        //------------------------------------------------------------------- Déplacement ----------------------------------------------------------------//

        if (cursors.right.isDown && cursors.up.isDown && !cursors.left.isDown && !cursors.down.isDown && dialogueLance == false){
            // Déplacements vers la diagonale haut doite                     
            player.setVelocityX(300);
            player.setVelocityY(-300);
            player.anims.play('phphd', true);
            direction = 'hd';
        }

        else if (cursors.left.isDown && cursors.up.isDown && !cursors.down.isDown && !cursors.right.isDown && dialogueLance == false){
            // Déplacements vers la diagonale haut gauche                      
            player.setVelocityX(-300);
            player.setVelocityY(-300);
            player.anims.play('phphg', true);
            direction = 'hg';                      
        }

        else if (cursors.down.isDown && cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown && dialogueLance == false){          
            // Déplacements vers la diagonale bas gauche                      
            player.setVelocityX(-300);
            player.setVelocityY(300);
            player.anims.play('phpbg', true);
            direction = 'bg';                       
        }

        else if (cursors.down.isDown && cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && dialogueLance == false){
        // Déplacements vers la diagonale bas droite                      
            player.setVelocityX(300);
            player.setVelocityY(300);
            player.anims.play('phpbd', true);
            direction = 'bd';                         
        }

        // -- Déplacements Horizontaux Verticaux --


        else if (cursors.right.isDown && !cursors.left.isDown && !cursors.down.isDown && !cursors.up.isDown && dialogueLance == false){
            player.setVelocityX(400);
            player.setVelocityY(0);
            player.anims.play('phpdd', true);                        // Déplacement vers la droite
            direction = 'dd';
        }

        else if (cursors.left.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown && dialogueLance == false){
            player.setVelocityX(-400);
            player.setVelocityY(0);
            player.anims.play('phpgg', true);                        // Déplacement vers la gauche
            direction = 'gg';
        }

        else if (cursors.down.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown && dialogueLance == false){
            player.setVelocityY(400);
            player.setVelocityX(0);
            player.anims.play('phpbb', true);                        // Déplacement vers le bas
            direction = 'bb';
        }

        else if (cursors.up.isDown && !cursors.left.isDown && !cursors.down.isDown && !cursors.right.isDown && dialogueLance == false){
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

        // ------------------------------------------------- CONTROLE MANETTE ---------------------------------------------------//

        if (padConnected) {

            if(paddle.right && paddle.up){
                player.setVelocityX(300);
                player.setVelocityY(-300);
                player.anims.play('phphd', true);                         // Déplacements vers la diagonale haut doite
                direction = 'hd';
            }
            if(paddle.right && paddle.down){
                player.setVelocityX(300);
                player.setVelocityY(300);
                player.anims.play('phpbd', true);                         // Déplacements vers la diagonale bas droite 
                direction = 'bd';
            }
            if(paddle.left && paddle.up){
                player.setVelocityX(-300);
                player.setVelocityY(-300);
                player.anims.play('phphg', true);                        // Déplacements vers la diagonale haut gauche  
                direction = 'hg';
            }
            if(paddle.left && paddle.down){
                pplayer.setVelocityX(-300);
                player.setVelocityY(300);
                player.anims.play('phpbg', true);                        // Déplacements vers la diagonale bas gauche
                direction = 'bg'; 
            }
            if(paddle.right){
                player.setVelocityX(400);
                player.setVelocityY(0);
                player.anims.play('phpdd', true);                        // Déplacement vers la droite
                direction = 'dd';
            }
            if(paddle.left){
                player.setVelocityX(-400);
                player.setVelocityY(0);
                player.anims.play('phpgg', true);                        // Déplacement vers la gauche
                direction = 'gg';
            }
            if(paddle.up){
                player.setVelocityY(-400);
                player.setVelocityX(0);
                player.anims.play('phphh', true);                        // Déplacement vers le haut
                direction = 'hh';
            }
            if(paddle.down){
                player.setVelocityY(400);
                player.setVelocityX(0);
                player.anims.play('phpbb', true);                        // Déplacement vers le bas
                direction = 'bb';
            }
            else{
                player.setVelocityX(0);
                player.setVelocityY(0);
                player.anims.play('phpbb',false);
            }

            if (paddle.Y){
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
    

    
                // Mes deux autres pouvoirs ne sont pas compatible avec une manettes... mince ^^'
            }
        }

        


        // -------------------------------------------------------- VIE ----------------------------------------------------------- //

        if (vie == 6){
            vieIcon.destroy()
            vieIcon = this.add.sprite(1730, 220, 'vie1').setScale(1).setScrollFactor(0);
        }
        if (vie == 5){
            vieIcon.destroy()
            vieIcon = this.add.sprite(1730, 220, 'vie2').setScale(1).setScrollFactor(0);
        }
        if (vie == 4){
            vieIcon.destroy()
            vieIcon = this.add.sprite(1730, 220, 'vie3').setScale(1).setScrollFactor(0);
        }
        if (vie == 3){
            vieIcon.destroy()
            vieIcon = this.add.sprite(1730, 220, 'vie4').setScale(1).setScrollFactor(0);
        }
        if (vie == 2){
            vieIcon.destroy()
            vieIcon = this.add.sprite(1730, 220, 'vie5').setScale(1).setScrollFactor(0);
        }
        if (vie == 1){
            vieIcon.destroy()
            vieIcon = this.add.sprite(1730, 220, 'vie6').setScale(1).setScrollFactor(0);
        }
        if (vie <=0 ){
            gameOver = true;
            mortText = this.physics.add.text((player.x,player.y, 'Vous vous êtes déincarné', { fontSize: '48px', fill: '#FFF' }));
        }

        if (cursors.potionInput.isDown && potionCD == true && stockPotion > 0 && vie < 6 && dialogueLance == false){

                vie += 1;
                stockPotion -= 1;
                potionsText.setText(stockPotion);
                potionCD = false
                setTimeout(function(){potionCD = true}, 1000);
            
        }

        // ------------------------------------------------------ FIN VIE --------------------------------------------------------- //




        // ------------------------------------------------------ ICONS ---------------------------------------------------------- //

        if (epeeCollected == false || epeeCD == false ){
            iconEpee.alpha = 0.5;
        }
        if ( epeeCD == true ){
            iconEpee.alpha = 1;
        }

        if (pistoletCollected == false || pistoletCD == false ){
            iconPistolet.alpha = 0.5;
        }
        if ( pistoletCD == true  && pistoletCollected == true){
            iconPistolet.alpha = 1;
        } 

        if (barrilCollected == false || barrilCD == false ){
            iconBarril.alpha = 0.5;
        }
        if ( barrilCD == true  && barrilCollected == true){
            iconBarril.alpha = 1;
        }

        if (potionsStock = 0 || potionCD == false ){
            iconPotion.alpha = 0.5;
        }
        if ( potionCD == true ){
            iconPotion.alpha = 1;
        }

        // ------------------------------------------------------ FIN ICONS ------------------------------------------------------ //


        // ------------------------------------------------------ POUVOIRS -------------------------------------------------------- //

        //                     ----------- EPEE ------------

        if (cursors.epeeInput.isDown && epeeCD==true && epeeCollected == true && dialogueLance == false){
            if (direction=='hd'){
                epee = epees.create(player.x+100,player.y-100, 'epee').setRotation(0.735);
                epee.body.height = 250;
                epee.body.width = 250;
                epee.body.setOffset(25, -25);
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='hg'){
                epee = epees.create(player.x-100,player.y-100, 'epee').setRotation(-0.735);
                epee.body.height = 250;
                epee.body.width = 250;
                epee.body.setOffset(25, -25);
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='bd'){
                epee = epees.create(player.x+100,player.y+100, 'epee').setRotation(2.305);
                epee.body.height = 250;
                epee.body.width = 250;
                epee.body.setOffset(25, -25);
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='bg'){
                epee = epees.create(player.x-100,player.y+100, 'epee').setRotation(-2.305);
                epee.body.height = 250;
                epee.body.width = 250;
                epee.body.setOffset(25, -25);
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='dd'){
                epee = epees.create(player.x+150,player.y, 'epee').setRotation(1.57);
                epee.body.height = 300;
                epee.body.width = 200;
                epee.body.setOffset(50, -50);   
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='gg'){
                epee = epees.create(player.x-150,player.y, 'epee').setRotation(-1.57);
                epee.body.height = 300;
                epee.body.width = 200;
                epee.body.setOffset(50, -50);  
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='bb'){
                epee = epees.create(player.x,player.y+150, 'epee').setRotation(-3.14);
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }
            if (direction=='hh'){
                epee = epees.create(player.x,player.y-150, 'epee');
                epeeCD=false;
                setTimeout(function(){epeeCD=true}, 1000);
                setTimeout(function(){epee.destroy()}, 300);
            }

        }

        //                     -----------  PISTOLET ------------

        if (cursors.pistoletInput.isDown && pistoletCD == true && pistoletCollected == true && dialogueLance == false){

            pistoletCD = false;
            boulet = boulets.create(player.x, player.y, 'boulet');
            this.physics.moveTo(boulet, game.input.mousePointer.x + player.x - (1920/2), game.input.mousePointer.y + player.y - (1080/2), 1000);
            setTimeout(function(){pistoletCD = true}, 3000);
        }
        /*if (boulet.x<0 || boulet.x>2500 || boulet.y<0 || boulet.x>2000 ){
            boulet.destroy();
        }*/
        
        
        //                     ----------- BARRILS ------------

        if (cursors.barrilInput.isDown && barrilCD == true && barrilCollected == true && barrilActived == false && dialogueLance == false){

            mouseCursor.alpha = 0;
            mouseCursorBarril.alpha = 0.5;
            setTimeout(function(){barrilActived = true;}, 300);
        }
        if (cursors.barrilInput.isDown && barrilCD == true && barrilCollected == true && barrilActived == true && dialogueLance == false){

            barrilActived = false;
            barrilCD = false
            setTimeout(function(){barrilCD = true}, 3000);
            barril = barrils.create(game.input.mousePointer.x + player.x - (1920/2), game.input.mousePointer.y + player.y - (1080/2), 'barril');
            mouseCursorBarril.alpha = 0;
            mouseCursor.alpha = 1;

        }
            
        function cursorPosition(){
            mouseCursor.x = game.input.mousePointer.x; + player.x - (1920/2);
            mouseCursor.y = game.input.mousePointer.y; + player.y - (1080/2);
        }
        function cursorBarrilPosition(){
            mouseCursorBarril.x = game.input.mousePointer.x; + player.x - (1920/2);
            mouseCursorBarril.y = game.input.mousePointer.y; + player.y - (1080/2);
        }

        if (pistoletCollected == true && dialoguePistolet == false && textPistoletLance == false){
            dialogueLance = true;
            textPistoletLance = true;
            textPistolet = this.add.sprite(960, 490, 'textPistolet').setScrollFactor(0);
        }
        if (cursors.dialogueInput.isDown && dialogueLance == true && textPistoletLance == true){
            dialogueLance = false;
            textPistolet.destroy();
            textPistoletLance = false;
            dialoguePistolet = true;
        }
    }
}