class Joueur extends Player {

    // TODO - retirer & tableau not implemented
    jouer(game) {
        let pieces = document.querySelectorAll(".joueur .piece");
        let info = document.querySelector(".info");
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].style.border == "0.5px solid black") {
                if(game.firstTime == true 
                    || eval(game.valGauche) == eval(this.dominos[i].valGauche) 
                    || eval(game.valGauche) == eval(this.dominos[i].valDroite) 
                    || eval(game.valDroite) == eval(this.dominos[i].valGauche) 
                    || eval(game.valDroite) == eval(this.dominos[i].valDroite) ) 
                    {
                    if(game.firstTime == true) {
                        game.valGauche = this.dominos[i].valGauche;
                        game.valDroite = this.dominos[i].valDroite;
                        tableau(1, 0, this.dominos[i].valGauche, this.dominos[i].valDroite, '');
                        return retirer(i);
                    }

                    if(eval(game.valGauche) == eval(this.dominos[i].valGauche)) {
                        game.valGauche = this.dominos[i].valDroite;
                        tableau(1, 0, this.dominos[i].valGauche, this.dominos[i].valDroite, '');
                        return retirer(i);
                    }

                    if(eval(game.valGauche) == eval(this.dominos[i].valDroite) ) {
                        game.valGauche = this.dominos[i].valGauche;
                        tableau(1, 1, this.dominos[i].valGauche, this.dominos[i].valDroite, '');
                        return retirer(i);
                    }

                    if(eval(game.valDroite) == eval(this.dominos[i].valGauche)) {
                        game.valDroite = this.dominos[i].valDroite;
                        tableau(2, 0, this.dominos[i].valGauche, this.dominos[i].valDroite, '');
                        return retirer(i);
                    }

                    if(eval(game.valDroite) == eval(this.dominos[i].valDroite) ) {
                        game.valDroite = this.dominos[i].valGauche;
                        tableau(2, 1, this.dominos[i].valGauche, this.dominos[i].valDroite, '');
                        return retirer(i);
                    }

                } else {
                    info.innerHTML = "Piece invalide";
                    info.style.display = "block";
                    pieces[i].style.border = "0px"
                    setTimeout(() => { al.style.display = "none" }, 3000);
                    return;
                }
            }
        }
    }
}