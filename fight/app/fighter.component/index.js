import template from "./fighter.html";
import css from "./fighter.css"
import md5 from "md5";


class controller {
    $onInit() {
        this.damages = 0;
        this.md5 = md5(this.email);
        this.life = 20 + Math.floor(Math.random() * 30);
        this.maxLife = this.life;
        this.attack = 5 + Math.floor(Math.random() * 10);
        this.mana = 5 + Math.floor(Math.random() * 10);
        this.maxMana = this.mana;
    }

    fight() {
        this.onFight({
            $event: this.attack
        });
    }

    suffer() {
        this.life = Math.max(this.life - this.damages, 0);
        this.afterInjured({});
    }

    castingSpell() {
        this.mana -= Math.floor(Math.random() * 4) + 1;
        this.fireSpell({
            $event: 5 + Math.floor(Math.random() * 10)
        });
    }



}

export const FighterComponent = {
    bindings: {
        email: '<',
        onFight: '&',
        damages: '<',
        mode: '<',
        afterInjured: '&',
        fireSpell: "&"
    },
    template,
    controller,
}