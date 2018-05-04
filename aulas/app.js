new Vue({
    el: '#app',
    data: {
        playerHP: 100,
        monsterHP: 100,
        gameIsRunning: false,
        turns: [],
        stamina:1,
        i:0,
        shakeP: true,
        shakeM: true,
        turn: true,
        animationP: "",
        animationM: "",
        attackP: 0,
        armorP: 0,
        healP: 0,
        attackMM: 0,
        armorMM: 0,
        healMM: 0,
        gold: 0,
        farm: false,
    },
    methods:{
        StartGame: function(){
            this.gameIsRunning=true;
            this.playerHP=100;
            this.monsterHP=100;
            this.turns=[];
            this.stamina=1;
            this.attackP=0;
            this.armorP=0;
            this.healP=0;
            this.attackMM=0;
            this.armorMM=0;
            this.healMM=0;
        },
        randomN: function(min,max){
            return Math.max(Math.floor(Math.random()*max)+1,min)
        },
        check: function(){
            if(this.gameIsRunning==true){
                if(this.monsterHP<=0){
                    alert("YOU WON!");
                    if(!this.farm){
                        this.nextMonster();
                        this.softRestart();
                    }else{
                        this.softRestart();
                    }
                    return;
                }
                if(this.playerHP<=0){
                    alert("YOU LOST!");
                    this.gameIsRunning=false;
                    return;
                }
            }
            
        },
        nextMonster: function(){
            this.gold+=100;
            this.attackMM+=5;
            this.armorMM+=5;
            this.healMM+=5;
        },
        softRestart: function(){
            this.playerHP=100;
            this.monsterHP=100;
            this.turns=[];
            this.turn=true;
        },
        staminacheck: function(){
            if(this.stamina<10){
                this.stamina++;
            }
        },
        attack: function(){
            if(this.turn){
                var dmg=this.randomN(4,10)+this.attackP;
                this.monsterHP-=dmg;
                this.turns.unshift({
                    isPlayer: true,
                    text: "Player hits Monster for: " + dmg,
                    id: this.i++
                });
                this.check();
                this.shakeP=!this.shakeP;
                this.turn=!this.turn;
                this.animationP="shake";
                this.staminacheck();
            }  
        },
        attackM: function(){
            var dmg=this.randomN(8,12);
            this.playerHP-=dmg;
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits Player for: " + dmg,
                id: this.i++
            });
            this.check();
            this.animationM="shake";
            this.shakeM=!this.shakeM;
            this.turn=!this.turn;
        },
        attackS: function(){
            if(this.turn){
                if(this.stamina>0){
                    var dmg=this.randomN(10,20)+this.attackP;
                    this.monsterHP-=dmg;
                    this.turns.unshift({
                        isPlayer: true,
                        text: "Player hits Special Attack on Monster for: " + dmg,
                        id: this.i++
                    });
                    this.check();
                    this.animationP="shake";
                    this.shakeP=!this.shakeP;
                    this.turn=!this.turn;
                    this.stamina--;
                }else{
                    this.turns.unshift({
                        isPlayer: true,
                        text: "low on stamina",
                        id: this.i++
                    });
                }
            }
        },
        attackSM: function(){
            var dmg=this.randomN(15,20);
            this.playerHP-=dmg;
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits Special Attack on Player for: " + dmg,
                id: this.i++
            });
            this.check();
            this.animationM="shake";
            this.shakeM=!this.shakeM;
            this.turn=!this.turn;
        },
        heal: function(){
            if(this.turn){
                var dmg=this.randomN(20,30);
                this.playerHP+=dmg;
                if(this.playerHP>100){
                    this.playerHP=100;
                }
                this.turns.unshift({
                    isPlayer: true,
                    text: "Player heals for: " + dmg,
                    id: this.i++
                });
                this.animationP="pulse";
                this.staminacheck();
                this.turn=!this.turn;
                this.shakeP=!this.shakeP;
            }
        },
        healM: function(){
            var dmg=this.randomN(15,20);
            this.monsterHP+=dmg;
            if(this.monsterHP>100){
                dmg=this.monsterHP-100;
                this.monsterHP=100;
            }
            this.turns.unshift({
                isPlayer: false,
                text: "Monster heals for: " + dmg,
                id: this.i++
            });
            this.animationM="pulse";
            this.shakeM=!this.shakeM;
            this.turn=!this.turn;
        },
        monster: function(){
            var op=this.randomN(1,8);
            if(op<=5){
                this.attackM();
            }else if(op<=7){
                if(this.monsterHP<80){
                    this.healM();
                }else{
                    this.monster();
                }
            }else if(op==8){
                this.attackSM();
            }
        },
        upAttack: function(){
            this.attackP++;
        },
        upArmor: function(){
            this.armorP++;
        },
        upHeal: function(){
            this.healP++;
        },
    },
    watch: {
        shakeP: function(valor) {
            var dados = this;
            setTimeout(function() {
                dados.shakeP = true
            }, 1)
        },
        shakeM: function(valor) {
            var dados = this;
            setTimeout(function() {
                dados.shakeM = true
            }, 1)
        },
        turn: function(valor) {
            var dados = this;
            setTimeout(function() {
                if(dados.turn==false){
                    dados.monster();
                }
            }, 1000)
        }
    }
});