class Game {
    dominos;
    players;
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


    constructor() {
        dominos = []
        players = [
            new Joueur(),
            new Bot(),
            new Bot(),
            new Bot()]
        // pioche = []
    }

    charger() {
        // TODO
        document.querySelector(".passer").addEventListener("click", () => {
            document.querySelector(".info").innerHTML = "Tour passé !";
            document.querySelector(".info").style.display = "block";
            qui = 0;
            document.querySelector(".passer").style.display = "none";
            setTimeout(jouer, 2500);
            return;
        });
        //document.querySelector(".droite").addEventListener("drop",()=>{});
    
        generatefirst7dominos()
        for( i ; i <= 21;){
            createAndPushOneDomino()
        }
        Distribuerpieces();
        console.log(dominos);
    }

    distribuerPieces() {
        // TODO
    }

    createDomino(nb){
        // TODO
    }

    createAndPushOneDomino() {
        // TODO
    }

    generatefirst7dominos() {
        // TODO
    }

    verifIfDominoExist(dominoToAdd, dominos) {
        // TODO
    }

    afficherDomino(query, pobj, numdecopy) {
        // TODO
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
