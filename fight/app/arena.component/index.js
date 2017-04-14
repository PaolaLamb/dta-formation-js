import template from "./arena.html";
import css from "./arena.css"

class controller {
    $onInit() {
        this.team1 = {
            mode: 'gentils',
            fighters: ['paolalambroni@gmail.com', 'dark.pl@hotmail.fr', 'lionel.collidor2016@campus-eni.fr', 'lehardy.david@live.fr']
        };
        this.team2 = {
            mode: 'mechants',
            fighters: ['gigarelt@gmail.com', 'tmoyse@gmail.com', 'renard.cyrille@gmail.com', 'alouest_44@yahoo.fr']
        };
        this.damages = 0;


    }

    setDamages(damages) {
        this.targets = [];
        this.damages = damages;
        if (attack.zone) {
            this.targets = this.team2.fighters.map(fi => fi.email)
        }
    }

    attackEnd() {
        this.damages = 0;
        this.team1.mode = this.team1.mode === 'gentils' ? 'mechants' : 'gentils';
        this.team2.mode = this.team2.mode === 'gentils' ? 'mechants' : 'gentils';
    }

    spellDamages() {

    }


}

export const ArenaComponent = {
    bindings: {},
    controller,
    template
}