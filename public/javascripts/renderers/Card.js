const CWIDTH = 80;
const CHEIGHT = 120;

class Card {
    constructor(id,name, hp, attacked, x, y) {
        this.id=id;
        this.name = name;
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.enabled = true;
        this.attacked = attacked;
        this.selected = false;
    }
    draw() {
        if (this.selected) {
            fill(100, 200, 100);
        } else if (this.attacked) {
            fill(200, 100, 100)
        } else {
            fill(100, 100, 100);
        }
        strokeWeight(3);
        if (this.enabled) {
            stroke(200, 0, 0);
        } else {
            stroke(0, 0, 0);
        }
        rect(this.x, this.y, CWIDTH, CHEIGHT, 2, 2, 2, 2);
        fill(0, 0, 0);
        stroke(0, 0, 0);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        text(this.name, this.x + CWIDTH / 2, this.y + CHEIGHT / 2);
        textAlign(LEFT, CENTER);
        text("HP: " + this.hp, this.x + 10, this.y + 90);

    }
    getId() { return this.id;}
    
    hasAttacked() { return this.attacked; }
    setAttack(hasAttacked) { this.attacked = hasAttacked }
    
    getHp() { return this.hp; }
    setHp(hp) { this.hp = hp }
    
    enable() { this.enabled = true }
    disable() { this.enabled = false }
    
    isSelected() { return this.selected; }

    clicked(x, y) {
        if (this.enabled) {
            if (this.x <= x && (this.x + CWIDTH) >= x &&
                this.y <= y && (this.y + CHEIGHT) >= y) {
                this.selected = !this.selected;
                return true;
            }
        }
        return false;
    }

}