class Bot extends Player {

    jouer(game) {
        document.querySelector(".infoBis").style.display = "block";
        var pieces = document.querySelectorAll(".bot" + String((this.id - 1)) + " .piece");
        
        for (var i = 0; i <= this.dominos.length; i++) {
            if (i == this.dominos.length) {
                game.currentPlayer = game.players[(this.id + 1) % 4]
                return game.jouer();
            }

            if(eval(game.valeurGauche) == eval(this.dominos[i].valGauche)){
                game.valeurGauche = this.dominos[i].valDroite;
                game.tableau(true, 0, this.dominos[i].valGauche, this.dominos[i].valDroite);
                pieces[i].remove();
                this.dominos.splice(i, 1);
                game.currentPlayer = game.players[(this.id + 1) % 4]
                return game.jouer();
            }
            if(eval(game.valGauche) == eval(this.dominos[i].valDroite)){
                game.valeurGauche = this.dominos[i].valGauche;
                game.tableau(true, 1, this.dominos[i].valGauche, this[i].valDroite);
                pieces[i].remove();
                this.dominos.splice(i, 1);
                game.currentPlayer = game.players[(this.id + 1) % 4]
                return game.jouer();
            }
            if(eval(game.valeurDroite) == eval(this.dominos[i].valGauche)){
                game.valeurDroite = this.dominos[i].valDroite;
                game.tableau(false, 1, this.dominos[i].valGauche, this.dominos[i].valDroite, '');
                pieces[i].remove();
                this.dominos.splice(i, 1);
                game.currentPlayer = game.players[(this.id + 1) % 4]
                return game.jouer();
            }
            if(eval(game.valeurDroite) == eval(this.dominos[i].valDroite)){
                game.valeurDroite = this.dominos[i].valGauche;
                game.tableau(false, 0, this.dominos[i].valGauche, this.dominos[i].valDroite, '');
                pieces[i].remove();
                this.dominos.splice(i, 1);
                game.currentPlayer = game.players[(this.id + 1) % 4]
                return game.jouer();
            }
        }
    }   
}