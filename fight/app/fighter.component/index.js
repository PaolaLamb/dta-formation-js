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
        this.mana = Math.floor(Math.random() * 10);
        this.maxMana = this.mana;
    }

    $onChanges(changes) {
        if (this.targets) {
            this.suffer();
        }
    }

    fight(zone) {
        if (zone) this.mana -= 5;
        this.onFight({
            $event: this.attack,
            zone
        });
    }

    suffer() {
        this.life = Math.max(this.life - this.damages, 0);
        this.afterInjured({});
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