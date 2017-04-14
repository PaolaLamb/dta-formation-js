import template from './fighter.html';
import css from './fighter.css';
import md5 from 'md5';

class controller {

    constructor(FightService) {
        this.FightService = FightService;
    }

    $onInit() {
        this.md5 = md5(this.fighter.email);
    }

    fight(special) {
        if (!special) this.FightService.waitingForTarget = true;
        else {
            switch (this.fighter.class) {
                case "healer":
                    this.FightService.heal(this.fighter);
                    break;
                case "tank":
                    this.FightService.agro(this.fighter);
                    break;
                case "dps":
                    this.FightService.globalAttack(this.fighter);
                    break;
                default:
                    this.FightService.globalAttack(this.fighter);
                    break;
            }
        }
    }

    suffer() {
        this.FightService.resolveAttack([this.fighter.email]);
    }

    active() {
        return this.FightService.attackers[0] === this.fighter.email;
    }

    noMana() {
        return this.fighter.mana < 5;
    }

    isDefender() {
        return !!this.FightService.getFighter(this.fighter.email, 1);
    }

    isTank() {
        let tank = false;
        if (this.FightService.opponentTank &&
            this.FightService.opponentTank !== this.fighter.email &&
            this.FightService.getFighter(this.fighter.email, 1))
            tank = true;
        return tank;
    }
}

export const FighterComponent = {
    bindings: {
        fighter: '<'
    },
    template,
    controller,
}