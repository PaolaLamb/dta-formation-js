import { random } from 'lodash';

export class FightService {
    constructor() {
        window.f = this;
        this.teams = [{
                name: 'ByteClub',
                fighters: [{
                        email: 'tmoyse@gmail.com',
                        class: "healer",
                        life: 10,
                        mana: 10,
                        attack: [3, 5],
                    },
                    {
                        email: 'delapouite@gmail.com',
                        class: "tank",
                        life: 10,
                        mana: 10,
                        attack: [3, 5],
                    },
                    {
                        email: 'naholyr@gmail.com',
                        class: "dps",
                        life: 10,
                        mana: 10,
                        attack: [3, 5],
                    }
                ]
            },
            {
                name: 'P. de code',
                fighters: [{
                    email: 'finalboss@esn.fr',
                    class: "boss",
                    life: 100,
                    mana: 0,
                    attack: [1, 8],
                }]
            },
        ];

        this.round = 0;
        this.waitingForTarget = false;
        this.generateStats();
        this.nextRound();
    }

    nextRound() {
        this.updateMana();
        this.round++;
        this.attackers = this.getFighters().map(f => f.email);
        this.opponentTank = this.tank;
        this.tank = null;
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
                    fighter.maxMana = Math.floor(Math.random() * 10) + 5;
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
                default:
                    fighter.maxLife = fighter.life;
                    fighter.maxMana = 10;
            }
        }));
    }





}