class Game {
    dominos;
    players;
    generator;
    // pioche;
    valeurGauche = '';
    valeurDroite = '';
    
    nbrPieceAGauche = 0
    nbrPieceADroite = 0
    distanceAGauche = 41
    distanceADroite = 51
    hauteurAGauche = 38
    hauteurADroite = 62
    
    firstTime;
    currentPlayer;
    
    
    constructor(generator) {
        this.dominos = []
        this.players = [new Joueur(0), new Bot(1), new Bot(2), new Bot(3)]
        this.generator = generator;
        this.firstTime = true;
        // pioche = []
    }
    
    charger() {
        document.querySelector(".passer").addEventListener("click", () => {
            document.querySelector(".info").innerHTML = "Tour passé !";
            document.querySelector(".info").style.display = "block";
            this.currentPlayer = this.players[(this.currentPlayer.id + 1) % 4]
            document.querySelector(".passer").style.display = "none";
            setTimeout(this.jouer() , 2500);
            return;
        });
        
        this.dominos = this.generator.generate(this.dominos)
        this.distribuerPieces();
    }
    
    shuffleNumber() {
        let pobj = []
        for (let i = 0; i < 28;) {
            let n = Math.floor(Math.random() * 28);
            let rep = 0;
            for (let r = 0; r < pobj.length; r++) {
                if (n == pobj[r]) {
                    rep = 1;
                }
            }
            if (rep == 0) {
                pobj[i] = n;
                i++;
            }
        }
        return pobj
    }
    
    distribuerPieces() {
        //Permet de supprimer la piece vide au début
        let ori = document.querySelectorAll(".piece");
        ori[0].remove();
        let locopy, numdecopy = 0;
        let pobj = this.shuffleNumber()
        while(numdecopy < 28) {
            if (numdecopy < 7) {
                locopy = document.querySelector(".joueur");
                this.players[0].dominos.push(this.dominos[pobj[numdecopy]])
                this.afficherDomino(".joueur", this.dominos, pobj, numdecopy)
            } else if (numdecopy < 14) {
                locopy = document.querySelector(".bot0");
                this.players[1].dominos.push(this.dominos[pobj[numdecopy]])
                this.afficherDomino(".bot0", this.dominos, pobj, numdecopy)
            }
            else if (numdecopy < 21) {
                locopy = document.querySelector(".bot1");
                this.players[2].dominos.push(this.dominos[pobj[numdecopy]])
                this.afficherDomino(".bot1", this.dominos, pobj, numdecopy)
            }
            else {
                locopy = document.querySelector(".bot2")
                this.players[3].dominos.push(this.dominos[pobj[numdecopy]])
                this.afficherDomino(".bot2", this.dominos, pobj, numdecopy)
            }
            numdecopy++;
        }
        return this.quiJoue();
    }
    
    afficherDomino(query, dominos, pobj, numdecopy) {
        const dominoesDiv = document.querySelectorAll(`${query}`);
        const div1 = document.createElement("div");
        div1.classList.add("piece");
        const topDiv = document.createElement("div");
        topDiv.classList.add("top");
        topDiv.innerText = `${dominos[pobj[numdecopy]].valGauche}`;
        const bottomDiv = document.createElement("div");
        bottomDiv.classList.add("bottom");
        bottomDiv.innerText = `${dominos[pobj[numdecopy]].valDroite}`;
        div1.appendChild(topDiv);
        div1.appendChild(bottomDiv);
        dominoesDiv[0].appendChild(div1);
    }
    
    quiJoue() {
        let info = document.querySelector(".info");
        document.querySelector(".infoBis").style.display = "block";
        info.innerHTML = "Commencez <br>par double cliquer ou glisser ";
        info.style.display = "block";
        setTimeout(() => {
            info.style.display = "none";
            this.currentPlayer = this.players[0]
            return this.jouer(this.currentPlayer);
        }, 2500);
        return;
    }
    
    isGameBlocked() {
        let n = 0;
        for(let i = 0; i < this.players.length; i++){
            for(let j=0; j < this.players[i].dominos.length; j++){
                if ( this.firstTime 
                    || eval(this.valeurGauche) == eval(this.players[i].dominos[j].valGauche) 
                    || eval(this.valeurDroite) == eval(this.players[i].dominos[j].valDroite) 
                    || eval(this.valeurGauche) == eval(this.players[i].dominos[j].valDroite) 
                    || eval(this.valeurDroite) == eval(this.players[i].dominos[j].valGauche)) {
                    n += 1;
                    break;
                }
            }
        }
        return n;
    }
    
    isGameEnded() {
        for(let i=0 ; i < this.players.length; i++) {
            if(this.players[i].dominos.length == 0) {
                return this.players[i].id;
            }
        }
        return -1;
    }
    
    gameEnded() {
        console.log("TODO - JEU FINI");
    }
    
    jouer() {
        document.querySelector(".infoBis").style.display = "block";
        document.querySelector(".passer").style.display = "block";
        let info = document.querySelector(".info");
        let gan = this.isGameEnded();
        if (gan >= 0) {
            switch (gan) {
                case 0:
                    info.innerHTML = "Vous avez gagné";
                    info.style.display = "block";
                    return this.gameEnded();
                case 1:
                    info.innerHTML = "Joueur 2 a gagné";
                    console.log('Joueur 2 a gagné');
                    info.style.display = "block";
                    return this.gameEnded();
                case 2:
                    info.innerHTML = "Joueur 3 a gagné";
                    console.log('Joueur 3 a gagné');
                    info.style.display = "block";
                    return this.gameEnded();
                case 3:
                    info.innerHTML = "Joueur 4 a gagné";
                    console.log('Joueur 4 a gagné');
                    info.style.display = "block";
                    return this.gameEnded();
            }
        }
        
        if (this.isGameBlocked() == 0) {
            info.innerHTML = "Jeu bloqué";
            info.style.display = "block";
            document.querySelector(".infoBis").style.display = "block";
            return this.gameEnded();
        }

        if(this.currentPlayer instanceof Joueur) {
            info.innerHTML = "A toi de jouer <br>glisse ou double clique sur le domino";
        } else {
            info.innerHTML = "Tour du joueur " + this.currentPlayer.id;
        }
        
        // let nus = (this.qui == 3) ? "Q?" : (this.qui == 0) ? "2" : (this.qui == 1) ? "3" : "4";
        // if (nus === "Q?") {
        //     info.innerHTML = "A toi de jouer <br>glisse ou double clique sur le domino";
        // } else {
        //     info.innerHTML = "Tour du joueur " + nus;
        // }
        info.style.display = "block";

        let isJoueur = this.currentPlayer instanceof Joueur;
        switch (isJoueur) {
            case true:
                setTimeout( this.AddeventJoueur(this.currentPlayer), 1000);
                break;
            default:
                setTimeout(()=>{info.style.display = "none"},1000);
                setTimeout(this.currentPlayer.jouer(this), 3000);
                break;
        }
    }
    
    retirer(posi) {
        // TODO
        var pieces = document.querySelectorAll(".joueur .piece");
        this.currentPlayer.dominos.splice(posi, 1);
        pieces[posi].remove();
        this.currentPlayer = this.players[1]
        return this.jouer(this.currentPlayer);
    }
    
    AddeventJoueur(player) {
        let laGame = this;
        let info = document.querySelector(".info");
        setTimeout(()=>{info.style.display = "none"},1000);
        document.querySelector(".infoBis").style.display = "none";
        let pieces = document.querySelectorAll(".joueur .piece");

        for (let i = 0; i < player.dominos.length ; i++) {
            pieces[i].draggable = "true";
            pieces[i].style.border = "0px solid black";
            pieces[i].addEventListener("dblclick", function () {
                pieces[i].style.border = "0.5px solid black";
                player.jouer(laGame);
            });
        }
    }

    tableau(aGauche, rotation, valGauche, valDroite) {
        let partieGauche = document.querySelectorAll(".emg");
        let partieDroite = document.querySelectorAll(".emd");
        if (this.firstTime) {
            this.creerDominoTableauMilieu(valGauche,valDroite)
            this.firstTime = false;
        } else {
    
            if (valGauche == valDroite) {
                rotation = 2;
            }
            if (aGauche == true) {
                if (this.distanceAGauche >= 3) {
                    if (rotation == 0) {
                        partieGauche[this.nbrPieceAGauche].style.transform = "rotate(90deg)";
                        partieGauche[this.nbrPieceAGauche].style.left = String(this.distanceAGauche) + "%";
                        this.distanceAGauche -= 6;
                    } if (rotation == 1) {
                        partieGauche[this.nbrPieceAGauche].style.transform = "rotate(270deg)";
                        partieGauche[this.nbrPieceAGauche].style.left = String(this.distanceAGauche) + "%";
                        this.distanceAGauche -= 6;
                    } if (rotation == 2) {
                        this.distanceAGauche += 1;
                        partieGauche[this.nbrPieceAGauche].style.transform = "rotate(0deg)";
                        partieGauche[this.nbrPieceAGauche].style.left = String(this.distanceAGauche) + "%";
                        this.distanceAGauche -= 6;
                    }
                } else {
                    if (rotation == 2 && this.hauteurAGauche != 38) {
                        partieGauche[this.nbrPieceAGauche].style.transform = "rotate(90deg)";
                        partieGauche[this.nbrPieceAGauche].style.top = String(this.hauteurAGauche) + "%";
                        partieGauche[this.nbrPieceAGauche].style.left = "3.5%";
                        this.hauteurAGauche -= 6;
                    } else {
                        if (rotation == 2) {
                            rotation = 0;
                        }
                    }
                    if (rotation == 0) {
                        partieGauche[this.nbrPieceAGauche].style.transform = "rotate(180deg)";
                        partieGauche[this.nbrPieceAGauche].style.top = String(this.hauteurAGauche) + "%"
                        partieGauche[this.nbrPieceAGauche].style.left = "3.5%";
                        this.hauteurAGauche -= 6;
                    } if (rotation == 1) {
                        partieGauche[this.nbrPieceAGauche].style.transform = "rotate(0deg)";
                        partieGauche[this.nbrPieceAGauche].style.top = String(this.hauteurAGauche) + "%";
                        partieGauche[this.nbrPieceAGauche].style.left = "3.5%";
                        this.hauteurAGauche -= 6;
                    }
                }
                this.nbrPieceAGauche += 1;
                this.creerDominoTableau(1,valGauche,valDroite)
            } else {
                if (this.distanceADroite <= 93) {
                    if (rotation == 0) {
                        partieDroite[this.nbrPieceADroite].style.transform = "rotate(270deg)";
                        partieDroite[this.nbrPieceADroite].style.left = String(this.distanceADroite) + "%";
                        this.distanceADroite += 6;
                    } if (rotation == 1) {
                        partieDroite[this.nbrPieceADroite].style.transform = "rotate(90deg)";
                        partieDroite[this.nbrPieceADroite].style.left = String(this.distanceADroite) + "%";
                        this.distanceADroite += 6;
                    } if (rotation == 2) {
                        this.distanceADroite -= 1;
                        partieDroite[this.nbrPieceADroite].style.transform = "rotate(0deg)";
                        partieDroite[this.nbrPieceADroite].style.left = String(this.distanceADroite) + "%";
                        this.distanceADroite += 6;
                    }
                } else {
                    if (rotation == 2 && this.hauteurADroite != 62) {
                        partieDroite[this.nbrPieceADroite].style.transform = "rotate(90deg)";
                        partieDroite[this.nbrPieceADroite].style.top = String(this.hauteurADroite) + "%";
                        partieDroite[this.nbrPieceADroite].style.left = "93%";
                        this.hauteurADroite -= 6;
                    } else {
                        if (rotation == 2) {
                            rotation = 0;
                        }
                    }
                    if (rotation == 0) {
                        partieDroite[this.nbrPieceADroite].style.transform = "rotate(-1deg)";
                        partieDroite[this.nbrPieceADroite].style.top = String(this.hauteurADroite) + "%"
                        partieDroite[this.nbrPieceADroite].style.left = "93%";
                        this.hauteurADroite += 6;
                    } if (rotation == 1) {
                        partieDroite[this.nbrPieceADroite].style.transform = "rotate(184deg)";
                        partieDroite[this.nbrPieceADroite].style.top = String(this.hauteurADroite) + "%";
                        partieDroite[this.nbrPieceADroite].style.left = "93%";
                        this.hauteurADroite += 6;
                    }
                }
                this.nbrPieceADroite += 1;
                this.creerDominoTableau(2,valGauche,valDroite)
            }
        }
    }

    creerDominoTableau(p, valGauche, valDroite) {
        let partie = (p == 1) ? "emg" : "emd";
        const dominoesDiv = document.querySelectorAll('.tableau');
        const div1 = document.createElement("div");
        div1.classList.add("piece");
        div1.classList.add(`${partie}`);
        const topDiv = document.createElement("div");
        topDiv.classList.add("top");
        topDiv.innerText = `${valGauche}`;
        const bottomDiv = document.createElement("div");
        bottomDiv.classList.add("bottom");
        bottomDiv.innerText = `${valDroite}`;
        div1.appendChild(topDiv);
        div1.appendChild(bottomDiv);
        dominoesDiv[0].appendChild(div1);
    }
    
    creerDominoTableauMilieu(valGauche, valDroite) {
        const dominoesDiv = document.querySelectorAll('.tableau');
        const div1 = document.createElement("div");
        div1.classList.add("piece");
        div1.classList.add("emc");
        const topDiv = document.createElement("div");
        topDiv.classList.add("top");
        topDiv.innerText = `${valGauche}`;
        const bottomDiv = document.createElement("div");
        bottomDiv.classList.add("bottom");
        bottomDiv.innerText = `${valDroite}`;
        div1.appendChild(topDiv);
        div1.appendChild(bottomDiv);
        dominoesDiv[0].appendChild(div1);
    }
}
