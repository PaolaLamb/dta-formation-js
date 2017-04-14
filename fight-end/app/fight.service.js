import { random } from 'lodash';

export class FightService {
    constructor (PeerService, $rootScope) {
        this.PeerService = PeerService;
        this.$rootScope = $rootScope;
        
        this.classes = ['healer', 'tank', 'dps'];
        this.teams = [];
        
        this.round = 0;
        this.waitingForTarget = false;
        //this.nextRound();
    }

    setFirstTeam(team){
        this.teams[0] = team;
    }

    setSecondTeam(team){
        this.teams[1] = team;
    }

    nextRound() {
        this.updateMana();
        this.round++;
        this.attackers = this.getFighters().map(f => f.email);
        this.opponentTank = this.tank;
        this.tank = null;
        if (this.round % 2 === 1) {
            this.autoPlay();
        }   
        if (this.PeerService.conn) {
            this.PeerService.send({
                type: "gameState",
                teams: this.teams,
                round: this.round,
                attackers: this.attackers
            });
        }  
    }

    onDataReceived(data) {
        this.$rootScope.$apply(() => {
            this.teams = data.teams;
            this.round = data.round;
            this.attackers = data.attackers;
        });
    }    

    getDamage(email) {
        const fighter = this.getFighter(email);
        return fighter ? random(...fighter.attack) : 0;
    }

    getFighter(email, side = 0) { // att 0 to look in attacker team, 1 to look in def 
        return this.getFighters(side).find(f => f.email === email);
    }

    getFighters(side = 0) {
        return this.teams[(this.round + side) % 2]
            .fighters
            .filter(f => f.life > 0);
    }

    globalAttack(fighter) {
        if (fighter.mana < 5) return;
        fighter.mana -= 5;
        this.resolveAttack(this.getFighters(1).map(f => f.email), false);
    }

    heal(fighter) {
        if (fighter.mana < 5) return;
        fighter.mana -= 5;
        this.resolveAttack(this.getFighters(0).map(f => f.email), true);
    }

    agro(fighter) {
        if (fighter.mana < 5) return;
        fighter.mana -= 5;
        this.tank = fighter.email;
        this.resolveAttack([]);
    }

    resolveAttack(targets, isHealing) {
        const activeAttacker = this.attackers.shift();
        let damages = 0;
        if (isHealing) {
            damages = -this.getDamage(activeAttacker);
            targets.forEach(email => {
                let fighter = this.getFighter(email, 0);
                fighter.life = Math.min(fighter.life - damages, fighter.maxLife);
            });
            this.waitingForTarget = false;
            if (this.attackers.length === 0) this.nextRound();
        } else {
            damages = this.getDamage(activeAttacker);
            targets.forEach(email => {
                let fighter = this.getFighter(email, 1);
                fighter.life = Math.max(fighter.life - damages, 0);
                if(fighter.email === this.opponentTank && fighter.life === 0)
                    this.opponentTank = null;
            });
            this.waitingForTarget = false;
            if (this.attackers.length === 0) this.nextRound();
        }
    }

    updateMana() {
        this.teams.forEach(team =>
            team.fighters.forEach(f =>
                f.mana = Math.min(f.maxMana, f.mana + 1)
            )
        )
    }

    generateStats() {
        this.teams.forEach(team => team.fighters.forEach(fighter => {
            switch (fighter.class) {
                case "healer":
                    fighter.maxLife = Math.floor(Math.random() * 5) + 20;
                    fighter.life = fighter.maxLife;
                    fighter.maxMana = Math.floor(Math.random() * 15) + 15;
                    fighter.mana = fighter.maxMana;
                    let attackH = Math.floor(Math.random() * 5) + 5;
                    fighter.attack = [Math.floor(attackH * 0.75), Math.floor(attackH * 1.25)];
                    break;
                case "tank":
                    fighter.maxLife = Math.floor(Math.random() * 50) + 50;
                    fighter.life = fighter.maxLife;
                    fighter.maxMana = Math.floor(Math.random() * 5) + 5;
                    fighter.mana = fighter.maxMana;
                    let attackT = Math.floor(Math.random() * 5) + 10;
                    fighter.attack = [Math.floor(attackT * 0.75), Math.floor(attackT * 1.25)];
                    break;
                case "dps":
                    fighter.maxLife = Math.floor(Math.random() * 5) + 20;
                    fighter.life = fighter.maxLife;
                    fighter.maxMana = Math.floor(Math.random() * 15) + 15;
                    fighter.mana = fighter.maxMana;
                    let attackD = Math.floor(Math.random() * 10) + 15;
                    fighter.attack = [Math.floor(attackD * 0.75), Math.floor(attackD * 1.25)];
                    break;
                case "boss":
                    fighter.maxLife = Math.floor(Math.random() * 5) + 200;
                    fighter.life = fighter.maxLife;
                    fighter.maxMana = Math.floor(Math.random() * 15) + 150;
                    fighter.mana = fighter.maxMana;
                    let attackB = Math.floor(Math.random() * 10) + 5;
                    fighter.attack = [Math.floor(attackB * 0.75), Math.floor(attackB * 1.25)];
                    break;
            }
        }));
    }

    getOpponentTank(){
        return this.getFighter(this.opponentTank, 1);
    }

    getRandomFighter() {
        if (this.opponentTank){
            return getOpponentTank();
        }
        let opponents = this.getFighters(1);
        return opponents[Math.floor(Math.random() * opponents.length)];
    }

    getWeakestFighter(){
        if (this.opponentTank){
            return getOpponentTank();
        }
        return this.getFighters(1).reduce((acc, fighter) => {
                    return (fighter.life < acc.life) ? fighter : acc;
                }, { life: 100 })
    }

    attackFighter(boss, isRandom) {
        if (boss.mana >= 5) {
            console.log('BOOM !!');
            this.globalAttack(boss);
        }
        else {
            console.log('Prends ça !');
            if (isRandom) {
                this.resolveAttack([this.getRandomFighter().email]);
            }
            else {
                this.resolveAttack([this.getWeakestFighter().email]);
            }
        }
    }

    nuageToxique(boss, damage) {
        if (!this.thresholds)
            this.thresholds = [0.75, 0.5, 0.25].map(a => a * boss.maxLife);
        if (this.thresholds.length > 0 && boss.life <= this.thresholds[0]) {
            this.getFighters(1).map(fighter => fighter.life = Math.max( fighter.life - damage, 0));
            console.log('Nuage toxique !');
            this.thresholds.shift();
        }
    }

    autoAction(boss) {
        if (boss.life > 0.75 * boss.maxLife) {
            console.log('Prends ça !')
            this.resolveAttack([this.getRandomFighter().email]);
        }
        else if (boss.life > 0.5 * boss.maxLife) {
            boss.attack = [2, 5];
            this.nuageToxique(boss, 1);
            this.attackFighter(boss, true);
        }
        else if (boss.life > 0.25 * boss.maxLife) {
            boss.attack = [2, 6];
            this.nuageToxique(boss, 2);
            this.attackFighter(boss, false);
        }
        else {
            boss.attack = [3, 7];
            this.nuageToxique(boss, 3);
            this.attackFighter(boss, false);
        }
    }
    
    autoPlay() {
            while(this.attackers.length > 0 && this.round % 2 === 1){
                this.autoAction(this.getFighter(this.attackers[0]))
            };
        }
}