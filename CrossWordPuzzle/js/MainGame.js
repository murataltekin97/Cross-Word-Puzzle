
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "gamediv",
        scale: { autoCenter: Phaser.Scale.CENTER_BOTH},
          
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload: preload,
            create: create        
        }
    };

    var game = new Phaser.Game(config);
    var A, I, T, K;
    var harfler = [];
    var kelime = "";
    var kelimeler = ["ATIK","ATKI","KITA","KATI","TAKI"];
    var already = [];
    var kelime1x = [];
    var kelime2y = [];
    var index;
    var basHarf="";
    var birlesim="";
    var atik=[];
    var atki=[];
    var kita = [];
    var kati =[];
    var taki =[];
    var spark;

    function preload ()
    {
        
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('sky', 'assets/skies/grid.png');
        this.load.image("box","assets/sprites/1bitblock0.png");

        this.load.atlas("harf","assets/animations/cube.png","assets/animations/cube.json");

        this.load.image("bubble","assets/particles/bubble256.png");
        this.load.image("littlebubble","assets/particles/bubble.png");
        this.load.image("sparkle","assets/particles/sparkle1.png");
    } 
    function create ()    
    {                  
        x = 50;
        y=120;
        this.add.image(400, 300, 'sky');
        this.add.image(400,450,"bubble");
        this.add.image(400,450,"bubble");
        this.add.image(335,405,"littlebubble");
        this.add.image(435,405,"littlebubble");
        this.add.image(335,495,"littlebubble");
        this.add.image(435,495,"littlebubble");
             
        var i;
        for(i=0 ; i<4; i++){

            this.add.image(x,120,"box");
            this.add.image(50,y,"box");
            kelime1x[i]=x; 
            kelime2y[i]=y; 
            x+= 70;
            y+=70;
        }
        y=50;
        for(i=0; i<4; i++){
            this.add.image(260,y,"box");
            y+=70;
        }
        x=190;

        for(i=0; i<4; i++){
            this.add.image(x,y-70,"box");
            x+=70;           
        }     
        y=50;

        for(i=0; i<4; i++){
            this.add.image(400,y,"box");
            y+=70;
        }    
     this.anims.create({key:"harfler" , frames: this.anims.generateFrameNames("harf"), repeat:20});
     this.add.sprite(700,70,"harf").setScale(1).play("harfler");

     A=this.add.text(320,380,"A",{font:'50px Arial', color: 'skyblue'});   
     I=this.add.text(320,470,"I",{font:'50px Arial', color: 'skyblue'});
     T=this.add.text(420,380,"T",{font:'50px Arial', color: 'skyblue'});
     K=this.add.text(420,470,"K",{font:'50px Arial', color: 'skyblue'});
     
     var spark= this.add.image(400,450,"sparkle");
     var gameover = this.add.text(280,420,"OYUN BİTTİ!",{font:'50px Arial', color: 'red'});
     spark.visible=false;
     gameover.visible=false;

/////////////////////////////// puzzledaki harfler
    atik[0]=this.add.text(30,kelime2y[0]-20,"",{font:'50px Arial', color: 'black' });
    atik[1] =this.add.text(30,kelime2y[1]-20,"",{font:'50px Arial', color: 'black' });
    atik[2] =this.add.text(30,kelime2y[2]-20,"",{font:'50px Arial', color: 'black' });
    atik[3] =this.add.text(30,kelime2y[3]-20,"",{font:'50px Arial', color: 'black' });

    atki[0]=this.add.text(30,kelime2y[0]-20,"",{font:'50px Arial', color: 'black' });
    atki[1] =this.add.text(100,kelime2y[0]-20,"",{font:'50px Arial', color: 'black' });
    atki[2] =this.add.text(170,kelime2y[0]-20,"",{font:'50px Arial', color: 'black' });
    atki[3] =this.add.text(240,kelime2y[0]-20,"",{font:'50px Arial', color: 'black' });

    kita[0]=this.add.text(240,kelime2y[0]-100,"",{font:'50px Arial', color: 'black' });
    kita[1] =this.add.text(240,kelime2y[0]-20,"",{font:'50px Arial', color: 'black' });
    kita[2] =this.add.text(240,kelime2y[2]-100,"",{font:'50px Arial', color: 'black' });
    kita[3] =this.add.text(240,kelime2y[3]-100,"",{font:'50px Arial', color: 'black' });

    kati[0]=this.add.text(170,kelime2y[3]-100,"",{font:'50px Arial', color: 'black' });
    kati[1] =this.add.text(240,kelime2y[3]-100,"",{font:'50px Arial', color: 'black' });
    kati[2] =this.add.text(320,kelime2y[3]-100,"",{font:'50px Arial', color: 'black' });
    kati[3] =this.add.text(390,kelime2y[3]-100,"",{font:'50px Arial', color: 'black' });

    taki[0]=this.add.text(380,kelime2y[0]-100,"",{font:'50px Arial', color: 'black' });
    taki[1] =this.add.text(380,kelime2y[1]-100,"",{font:'50px Arial', color: 'black' });
    taki[2] =this.add.text(380,kelime2y[2]-100,"",{font:'50px Arial', color: 'black' });
    taki[3] =this.add.text(390,kelime2y[3]-100,"",{font:'50px Arial', color: 'black' });

////////////////////

     var mainword = this.add.text(335,330,"",{font:'40px Arial', color: 'aqua' , backgroundColor:"purple"});
     harfler[0]=A;
     harfler[1]=I;
     harfler[2]=T;
     harfler[3]=K;

     harfler.forEach(element => {
         element.setInteractive();
         this.input.setDraggable(element);
         
     });
     this.input.on('gameobjectover',function(pointer,gameObject){
         gameObject.setTint(0x00ff00);
         if(basHarf != ""){
             if(!basHarf.includes(gameObject.text)){
                basHarf+= gameObject.text;
                mainword.setText(basHarf);
             }
                      
         }
         if(basHarf.length>4){
             mainword.setText("YANLIŞ!");
             basHarf="";
         }
    
     });
     this.input.on('gameobjectout',function(pointer,gameObject){
         
            gameObject.clearTint(0x00ff00);
     });

     this.input.on('dragstart',function(pointer,gameObject){
         if(basHarf==""){
            basHarf+= gameObject.text;
            mainword.setText(basHarf);
         }       
     });
     this.input.on('dragend',function(pointer,gameObject){
    
         var sparkk;
         gameObject.clearTint(0x00ff00);       
         gameObject.clearTint();
         var a,b,c,d;     
         mainword.setText(basHarf);
         if(basHarf.length>3){
             var x=0;
             var karar=0;
            kelimeler.forEach(element => {
             if(element== basHarf){
    
                 already.forEach(element2 => {
                     if(element2== basHarf){
                         mainword.setText("Bu kelime mevcut!");
                         karar=1;
                     }
                    
                 });
                 if(karar==0){
                    mainword.setText("DOĞRU!");
                    already.push(element);
                    x=1;    
                 }                                            

             }           
         });
         if(basHarf=="ATIK"){
            atik[0].setText("A");
              atik[1].setText("T");
              atik[2].setText("I");
              atik[3].setText("K");            
              basHarf=""; 
              
          }
          else if(basHarf=="ATKI"){
              atki[0].setText("A");
              atki[1].setText("T");
              atki[2].setText("K");
              atki[3].setText("I");             
              basHarf=""; 
          }
          else if (basHarf == "KITA"){
              kita[0].setText("K");
              kita[1].setText("I");
              kita[2].setText("T");
              kita[3].setText("A");       
             basHarf=""; 
          }
          else if (basHarf == "KATI"){
              kati[0].setText("K");
              kati[1].setText("A");
              kati[2].setText("T");
              kati[3].setText("I");       
              basHarf=""; 
          }
          else if (basHarf=="TAKI"){ 
            taki[0].setText("T");
            taki[1].setText("A");
            taki[2].setText("K");
            taki[3].setText("I");    
             basHarf=""; 
          }
         if(x==0 && karar==0){
            mainword.setText("YANLIŞ!");
            basHarf="";
         }

         }       
         else{
             basHarf="";
             mainword.setText("YANLIŞ!");
         }
         if(already.length==5){
             spark.visible=true;
            mainword.setText("");
            gameover.visible=true;
         }           

     });        
    
    }