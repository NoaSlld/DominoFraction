class Joueur extends Player {

    jouer(game) {
        let pieces = document.querySelectorAll(".joueur .piece");
        let info = document.querySelector(".info");
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].style.border == "0.5px solid black") {
                if(game.firstTime == true 
                    || eval(game.valeurGauche) == eval(this.dominos[i].valGauche) 
                    || eval(game.valeurGauche) == eval(this.dominos[i].valDroite) 
                    || eval(game.valeurDroite) == eval(this.dominos[i].valGauche) 
                    || eval(game.valeurDroite) == eval(this.dominos[i].valDroite) ) {
                    if(game.firstTime == true) {
                        game.valeurGauche = this.dominos[i].valGauche;
                        game.valeurDroite = this.dominos[i].valDroite;
                        game.tableau(true, 0, this.dominos[i].valGauche, this.dominos[i].valDroite);
                        return game.retirer(i);
                    }

                    if(eval(game.valeurGauche) == eval(this.dominos[i].valGauche)) {
                        game.valeurGauche = this.dominos[i].valDroite;
                        game.tableau(true, 0, this.dominos[i].valGauche, this.dominos[i].valDroite);
                        return game.retirer(i);
                    }

                    if(eval(game.valeurGauche) == eval(this.dominos[i].valDroite) ) {
                        game.valeurGauche = this.dominos[i].valGauche;
                        game.tableau(true, 1, this.dominos[i].valGauche, this.dominos[i].valDroite);
                        return game.retirer(i);
                    }

                    if(eval(game.valeurDroite) == eval(this.dominos[i].valGauche)) {
                        game.valeurDroite = this.dominos[i].valDroite;
                        game.tableau(false, 1, this.dominos[i].valGauche, this.dominos[i].valDroite);
                        return game.retirer(i);
                    }

                    if(eval(game.valeurDroite) == eval(this.dominos[i].valDroite) ) {
                        game.valeurDroite = this.dominos[i].valGauche;
                        game.tableau(false, 0, this.dominos[i].valGauche, this.dominos[i].valDroite);
                        return game.retirer(i);
                    }
                } else {
                    info.innerHTML = "Piece invalide";
                    info.style.display = "block";
                    pieces[i].style.border = "0px"
                    setTimeout(() => { info.style.display = "none" }, 3000);
                    return;
                }
            }
        }
    }
}