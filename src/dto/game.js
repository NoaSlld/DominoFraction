class Game {
    dominos;
    players;
    generator;
    // pioche;
    valeurGauche = '';
    valeurDroite = '';
    
    qui = 0
    qle = 0
    qld = 0
    led = 43
    ldd = 49
    tole = 45
    told = 55
    
    firstTime = true;
    
    
    constructor(generator) {
        this.dominos = []
        this.players = [
            new Joueur(),
            new Bot(),
            new Bot(),
            new Bot()]
            this.generator = generator
            // pioche = []
        }
        
        charger() {
            document.querySelector(".passer").addEventListener("click", () => {
                document.querySelector(".info").innerHTML = "Tour passé !";
                document.querySelector(".info").style.display = "block";
                qui = 0;
                document.querySelector(".passer").style.display = "none";
                setTimeout(jouer, 2500);
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
            const middleDiv = document.createElement("div");
            middleDiv.classList.add("middle");
            middleDiv.innerText = ":";
            const bottomDiv = document.createElement("div");
            bottomDiv.classList.add("bottom");
            bottomDiv.innerText = `${dominos[pobj[numdecopy]].valDroite}`;
            div1.appendChild(topDiv);
            div1.appendChild(middleDiv);
            div1.appendChild(bottomDiv);
            dominoesDiv[0].appendChild(div1);
        }
        
        quiJoue() {
            // TODO
        }
        
        isGameBlocked() {
            // TODO
        }
        
        isGameEnded() {
            // TODO
        }
        
        gameEnded() {
            console.log("TODO - JEU FINI");
        }
        
        jouer() {
            // TODO
        }
        
        retirer() {
            // TODO
        }
        
        appeljeu() {
            // TODO
        }
        
        AddeventJoueur() {
            // TODO
        }
        
        tableau() {
            // TODO
        }
        
        clonerPieceTableau(p) {
            // TODO - Maybe delete
        }
        
        creerDominoTableau(p,val1,val2) {
            // TODO
        }
        
        creerDominoTableauMilieu(val1,val2) {
            // TODO
        }
    }
