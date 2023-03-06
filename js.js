let dominos = [];
joueur = [];
bot = new Array(4);

let qui = 0, v11 = '', v22 = '', qle = 0, qld = 0, led = 43, ldd = 49, tole = 45, told = 55, localdrop = 0, sese = 0, firstTime = true;
function charger() {
    bot[0] = [];
    bot[1] = [];
    bot[2] = [];
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
document.addEventListener("DOMContentLoaded", charger);


var i = 1;
var aux = 0;
var nb = 5;

function reduce(number,denomin){
    var gcd = function gcd(a,b){
        return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(number,denomin);
    return [number/gcd, denomin/gcd];
}

function createDomino(nb){
    let [fraction1, fraction2] = dominos[nb].val2.split('*');
    let [numerator1, denominator1] = fraction1.split('/');
    let [numerator2, denominator2] = fraction2.split('/');
    prodNum = numerator1 * numerator2
    prodDenum = denominator1 * denominator2
    return reduce(prodNum,prodDenum)[0] + "/" + reduce(prodNum,prodDenum)[1]
}

function createAndPushOneDomino(){
  g = Math.floor(Math.random() * 5 ) + 1;
  h = Math.floor(Math.random() * 5 ) + 1;
  let [fraction1, fraction2] = dominos[aux].val2.split('*');
  let [numerator1, denominator1] = fraction1.split('/');
  let [numerator2, denominator2] = fraction2.split('/');
  
  if (i <= 6) {

    dominos.push({
        val1: createDomino(nb),
        val2: reduce(numerator1*h,denominator1)[0] + "/" + reduce(numerator1*h,denominator1)[1] + " * " + reduce(numerator2,denominator2*h)[0] + "/" + reduce(numerator2,denominator2*h)[1]
    }); 
  }
  if (i > 6 && i <= 11) {
    if(i == 7) {
        aux = 0;
        nb = 4;
    }
 
    dominos.push({
        val1: createDomino(nb),
        val2: reduce(numerator1*g,denominator1*h)[0] + "/" + reduce(numerator1*g,denominator1*h)[1] + " * " + reduce(numerator2*h,denominator2*g)[0] + "/" + reduce(numerator2*h,denominator2*g)[1]
    }); 
   }

   if (i > 11 && i <= 15) {
    if(i == 12) {
        aux = 0;
        nb = 3;
    }
    dominos.push({
        val1: createDomino(nb),
        val2: reduce(numerator1*g,denominator1)[0] + "/" + reduce(numerator1*g,denominator1)[1] + " * " + reduce(numerator2,denominator2*g)[0] + "/" + reduce(numerator2,denominator2*g)[1]
    }); 
   }

   if (i > 15 && i <= 18) {
    if(i == 16) {
        aux = 0;
        nb = 2;
    }

    dominos.push({
        val1: createDomino(nb),
        val2: reduce(numerator1*h,denominator1*g)[0] + "/" + reduce(numerator1*h,denominator1*g)[1] + " * " + reduce(numerator2*g,denominator2*h)[0] + "/" + reduce(numerator2*g,denominator2*h)[1]
    }); 
   }
   if (i > 18 && i <= 20) {
    if(i == 19) {
        aux = 0;
        nb = 1;
    }
    dominos.push({
        val1: createDomino(nb),
        val2: reduce(numerator1*h,denominator1*g)[0] + "/" + reduce(numerator1*h,denominator1*g)[1] + " * " + reduce(numerator2*g,denominator2*h)[0] + "/" + reduce(numerator2*g,denominator2*h)[1]
    }); 
   }
   if (i > 20 && i <= 21) {
    if(i == 21) {
        aux = 0;
        nb = 0;
    }
    dominos.push({
        val1: createDomino(nb),
        val2: reduce(numerator1*h,denominator1*g)[0] + "/" + reduce(numerator1*h,denominator1*g)[1] + " * " + reduce(numerator2*g,denominator2*h)[0] + "/" + reduce(numerator2*g,denominator2*h)[1]
    }); 
   }

  aux++
  i++;
  }


function generatefirst7dominos(){
    sixNum = Math.floor(Math.random() * 9 ) + 2;
    sixDenum = Math.floor(Math.random() * 9 ) + 2;
    if (sixDenum ==  sixNum || sixDenum == 1 ){
        generatefirst7dominos();
        dominos = [];
    } 
    sixNumBis = Math.floor(Math.random() * 9 ) + 2;
    if ((sixDenumBis = Math.floor(Math.random() * 9 ) + 2) ==  sixNumBis || sixDenumBis == 1 ){
        generatefirst7dominos();
        dominos = [];
    } 
    prodNum = sixNum * sixNumBis
    prodDenum = sixDenum * sixDenumBis
  
    for (let aux = 0 ; aux < 6 ; aux++){
        dominos.push({
            val1: reduce(prodNum,prodDenum)[0] + "/" + reduce(prodNum,prodDenum)[1],
            val2: (Math.floor(Math.random() * 9 ) + 2) + "/" + (Math.floor(Math.random() * 9 ) + 2) + " * " + (Math.floor(Math.random() * 9 ) + 2)  + "/" + (Math.floor(Math.random() * 9 ) + 2) 
        });
    }
    dominos.push({
        val1: reduce(prodNum,prodDenum)[0] + "/" + reduce(prodNum,prodDenum)[1],
        val2: sixNum + "/" + sixDenum + " * " + sixNumBis + "/" + sixDenumBis
    });
}

function verifIfDominoExist(dominoToAdd, dominos){
  dominos.forEach(domino => {
    if(domino.val1 === dominoToAdd.val1){
      return true;
    }
  })
  return false;
}




function Distribuerpieces() {
    var pobj = [];
    var ori = document.querySelector(".piece");
    ori.remove();
    var locopy, numdecopy = 0;
    for (var i = 0; i < 28;) {
        var n = Math.floor(Math.random() * 28);
        var rep = 0;
        for (var r = 0; r < pobj.length; r++) {
            if (n == pobj[r]) {
                rep = 1;
            }
        }
        if (rep == 0) {
            pobj[i] = n;
            i++;
        }
    }
    while (numdecopy < 28) {
        if (numdecopy < 7) {
            locopy = document.querySelector(".joueur");
            dominos[pobj[numdecopy]].psi = numdecopy;
            joueur.push(dominos[pobj[numdecopy]]);
            afficherDomino(".joueur",pobj,numdecopy)
        }
        if (numdecopy > 6 && numdecopy <= 13) {
            locopy = document.querySelector(".bot0");
            dominos[pobj[numdecopy]].psi = numdecopy;
            bot[0].push(dominos[pobj[numdecopy]]);
            afficherDomino(".bot0",pobj,numdecopy)
        }
        if (numdecopy > 13 && numdecopy <= 20) {
            locopy = document.querySelector(".bot1");
            dominos[pobj[numdecopy]].psi = numdecopy;
            bot[1].push(dominos[pobj[numdecopy]]);
            afficherDomino(".bot1",pobj,numdecopy)
        }
        if (numdecopy > 20) {
            locopy = document.querySelector(".bot2");
            dominos[pobj[numdecopy]].psi = numdecopy;
            bot[2].push(dominos[pobj[numdecopy]]);
            afficherDomino(".bot2",pobj,numdecopy)
        }
        numdecopy++;
    }
    return QuiJoue();
}

function afficherDomino(query, pobj, numdecopy) {
    const dominoesDiv = document.querySelectorAll(`${query}`);
    const div1 = document.createElement("div");
    div1.classList.add("piece");
    const topDiv = document.createElement("div");
    topDiv.classList.add("top");
    topDiv.innerText = `${dominos[pobj[numdecopy]].val1}`;
    const middleDiv = document.createElement("div");
    middleDiv.classList.add("middle");
    middleDiv.innerText = ":";
    const bottomDiv = document.createElement("div");
    bottomDiv.classList.add("bottom");
    bottomDiv.innerText = `${dominos[pobj[numdecopy]].val2}`;
    div1.appendChild(topDiv);
    div1.appendChild(middleDiv);
    div1.appendChild(bottomDiv);
    dominoesDiv[0].appendChild(div1);
}

function QuiJoue() {
    var al = document.querySelector(".info");
    // for (var i = 0; i < 7; i++) {
        // if (true) {
            document.querySelector(".infoBis").style.display = "block";
            al.innerHTML = "Commencez <br>par double cliquer ou glisser ";
            al.style.display = "block";
            sese = i;
            setTimeout(() => {
                al.style.display = "none";
                qui = 3;
                return jouer();
            }, 2500);
            return;
        // }
    // }
    // for (var q = 0; q < 3; q++) {
    //     for (var i = 0; i < 7; i++) {
    //         if (bot[q][i].val2 == 6 && bot[q][i].val1 == 6) {
    //             var nus = (q == 0) ? "2" : (q == 1) ? "3" : "4";
    //             document.querySelector(".infoBis").style.display = "block";
    //             al.innerHTML = "Joueur " + nus + " commence";
    //             al.style.display = "block";
    //             sese = i;
    //             qui = q;
    //             setTimeout(() => {
    //                 al.style.display = "none";
    //                 return jouer();
    //             }, 2500);
    //             return;
    //         }
    //     }
    // }
}
function JeuBlock() {
    var n = 0;
    for (var i = 0; i < joueur.length; i++) {
        // Faire les eval des valeurs des pièces les plus à gauche & droite sur le plateau
        if ( firstTime || eval(v11) == eval(joueur[i].val1) || eval(v22) == eval(joueur[i].val2) 
            || eval(v11) == eval(joueur[i].val2) || eval(v22) == eval(joueur[i].val1)) {
        // if(eval(v11) == eval(joueur[i].val2) || eval(v22) == eval(joueur[i].val1) || firstTime) {
        // if (v11 == joueur[i].val1 || v22 == joueur[i].val2 || v11 == joueur[i].val2 || v22 == joueur[i].val1) {
            n += 1;
            break;
        }
    }
    for (var q = 0; q < 3; q++) {
        for (var i = 0; i < bot[q].length; i++) {
            if (eval(v11) == eval(bot[q][i].val1) || eval(v22) == eval(bot[q][i].val2)
                || eval(v11) == eval(bot[q][i].val2) || eval(v22) == eval(bot[q][i].val1)) {
            // if(eval(v11) == eval(bot[q][i].val2) || eval(v22) == eval(bot[q][i].val2)) {
            // if (v11 == bot[q][i].val1 || v22 == bot[q][i].val2
            //     || v11 == bot[q][i].val2 || v22 == bot[q][i].val1) {
                n += 1;
                break;
            }
        }
    }
    return n;
}

function FinDuJeu() {
    console.log("TODO - JEU FINI");
    // document.querySelector("footer").style.display = "block";
    // document.querySelectorAll("button")[2].style.display = "block";
    // document.querySelectorAll("button")[2].addEventListener("click", () => {
    //     setTimeout(() => {
    //         return document.location.reload(true);
    //     }, 500);
    // });
}

function gagner() {
    if (joueur.length == 0) {
        return 3;
    }
    if (bot[0].length == 0) {
        return 0;
    }
    if (bot[1].length == 0) {
        return 1;
    }
    if (bot[2].length == 0) {
        return 2;
    }
    return -1;

}

function jouer() {
    console.log('v11', v11);
    console.log('v22', v22);
    console.log('qld', qld);
    console.log('qle', qle);
    console.log('------------------------');
    document.querySelector(".infoBis").style.display = "block";
    document.querySelector(".passer").style.display = "block";
    var al = document.querySelector(".info");
    var gan = gagner();
    if (gan >= 0) {
        switch (gan) {
            case 3:
                al.innerHTML = "Vous avez gagné";
                al.style.display = "block";
                return FinDuJeu();
            default:
                var nus = (gan == 0) ? "2" : (gan == 1) ? "3" : "4";
                al.innerHTML = "Joueur " + nus + " a gagné";
                al.style.display = "block";
                return FinDuJeu();
        }
    }
    if (JeuBlock() == 0) {
        al.innerHTML = "Jeu bloqué";
        al.style.display = "block";
        document.querySelector(".infoBis").style.display = "block";
        return FinDuJeu();
    }
    // if(sese<0){
    var nus = (qui == 3) ? "Q?" : (qui == 0) ? "2" : (qui == 1) ? "3" : "4";
    if (nus === "Q?") {
        al.innerHTML = "A toi de jouer <br>glisse ou double clique sur le domino";
    } else {
        al.innerHTML = "Tour du joueur " + nus;
    }
    al.style.display = "block";
// }
    switch (qui) {
        case 3:
          setTimeout( AddeventJoueur,1000);
            break;
        default:
            setTimeout(()=>{al.style.display = "none"},1000);
            setTimeout(botjeu, 3000);
            break;
    }
}

function botjeu() {
    document.querySelector(".infoBis").style.display = "block";
    var el = document.querySelectorAll(".bot" + String(qui) + " .piece");
    // if (sese >= 0) {
    //     tableau(1, 0, bot[qui][sese].val1, bot[qui][sese].val2, bot[qui][sese].piece);
    //     el[sese].remove();
    //     bot[qui].splice(sese, 1);
    //     sese = -3;
    //     qui +=1;
    //     return jouer();
    // }
    // console.log('0');
    for (var i = 0; i <= bot[qui].length; i++) {
        if (i == bot[qui].length) {
            qui+=1;
            return jouer();
        }
        // if (v11 == bot[qui][i].val1) {
        //     v11 = bot[qui][i].val2;
        //     tableau(1, 0, bot[qui][i].val1, bot[qui][i].val2, bot[qui][i].piece);
        //     el[i].remove();
        //     bot[qui].splice(i, 1);
        //     qui +=1;
        //     return jouer();
        // }
        // if (v11 == bot[qui][i].val2) {
        //     v11 = bot[qui][i].val1;
        //     tableau(1, 1, bot[qui][i].val1, bot[qui][i].val2, bot[qui][i].piece);
        //     el[i].remove();
        //     bot[qui].splice(i, 1);
        //     qui +=1;
        //     return jouer();
        // }
        // if (v22 == bot[qui][i].val2) {
        //     v22 = bot[qui][i].val1;
        //     tableau(2, 1, bot[qui][i].val1, bot[qui][i].val2, bot[qui][i].piece);
        //     el[i].remove();
        //     bot[qui].splice(i, 1);
        //     qui +=1;
        //     return jouer();
        // }
        // if (v22 == bot[qui][i].val1) {
        //     v22 = bot[qui][i].val2;
        //     tableau(2, 0, bot[qui][i].val1, bot[qui][i].val2, bot[qui][i].piece);
        //     el[i].remove();
        //     bot[qui].splice(i, 1);
        //     qui +=1;
        //     return jouer();
        // }
        if(eval(v11) == eval(bot[qui][i].val1)){
            test(i);
            console.log('v11 == bot val1', eval(v11) == eval(bot[qui][i].val1));
            v11 = bot[qui][i].val2;
            tableau(1, 0, bot[qui][i].val1, bot[qui][i].val2, '');
            el[i].remove();
            bot[qui].splice(i, 1);
            qui +=1;
            return jouer();
        }
        if(eval(v11) == eval(bot[qui][i].val2)){
            test(i);
            console.log('v11 == bot val2', eval(v11) == eval(bot[qui][i].val2));
            v11 = bot[qui][i].val1;
            tableau(1, 1, bot[qui][i].val1, bot[qui][i].val2, '');
            el[i].remove();
            bot[qui].splice(i, 1);
            qui +=1;
            return jouer();
        }
        if(eval(v22) == eval(bot[qui][i].val1)){
            test(i);
            console.log('v22 == bot val1', eval(v22) == eval(bot[qui][i].val1));
            v22 = bot[qui][i].val2;
            tableau(2, 0, bot[qui][i].val1, bot[qui][i].val2, '');
            el[i].remove();
            bot[qui].splice(i, 1);
            qui +=1;
            return jouer();
        }
        if(eval(v22) == eval(bot[qui][i].val2)){
            test(i);
            console.log('v22 == bot val2', eval(v22) == eval(bot[qui][i].val2));
            v22 = bot[qui][i].val1;
            tableau(2, 1, bot[qui][i].val1, bot[qui][i].val2, '');
            el[i].remove();
            bot[qui].splice(i, 1);
            qui +=1;
            return jouer();
        }
    }
}

function test(i){
    console.log('Old v11', v11)
    console.log('Old v22', v22)
    console.log('Bot val1', bot[qui][i].val1)
    console.log('Bot val2', bot[qui][i].val2)
}
function retirer(posi) {
    var el = document.querySelectorAll(".joueur .piece");
    joueur.splice(posi, 1);
    el[posi].remove();
    qui = 0;
    return jouer();
}
function appeljeu(el) {
    el.style.border = "0px solid black";
    el.addEventListener("dblclick", function () {
        el.style.border = "0.5px solid black";
        joueurjoue();
    });
}
function AddeventJoueur() {
    var al = document.querySelector(".info");
    setTimeout(()=>{al.style.display = "none"},1000);
    if (sese < 0) {
        document.querySelector(".passer").style.display = "block";
    }
    document.querySelector(".infoBis").style.display = "none";
    var el = document.querySelectorAll(".joueur .piece");
    document.addEventListener("dragstart", (e) => {
        e.target.classList.add("dragging");
    });
    document.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging");
        if (localdrop) {
            e.target.removeEventListener("dblclick", appeljeu);
            e.target.style.border = "0.5px solid black";
            if (localdrop == 2) {
                let aux = v11;
                v11 = -1;
                joueurjoue();
                v11 = aux;
                localdrop = 0;
                return;
            } else {
                let aux = v22;
                v22 = -1;
                joueurjoue();
                v22 = aux;
                localdrop = 0;
                return;
            }
        }
    });
    document.querySelector(".droite").addEventListener("dragenter", () => {
        localdrop = 2;
    });
    document.querySelector(".gauche").addEventListener("dragenter", () => {
        localdrop = 1;
    });
    for (var i = 0; i < joueur.length; i++) {
        el[i].draggable = "true";
        appeljeu(el[i]);
    }
}
function joueurjoue() {
    var el = document.querySelectorAll(".joueur .piece");
    var al = document.querySelector(".info");
    // if (sese >= 0) {
    //     if (el[sese].style.border == "0.5px solid black") {
    //         tableau(1, 0, joueur[sese].val1, joueur[sese].val2, joueur[sese].piece);
    //         qui=0;
    //         var aux=sese;
    //         sese=-3;
    //         return retirer(aux);
    //     } else {
    //         al.innerHTML = "piece invalide";
    //         al.style.display = "block";
    //         for (var i = 0; i < el.length; i++) {
    //             if (el[i].style.border == "0.5px solid black") {
    //                 el[i].style.border = "0px"
    //             }
    //         }
    //         setTimeout(() => { al.style.display = "none" }, 2500);
    //     }
    // } else {
        for (var i = 0; i < el.length; i++) {
            if (el[i].style.border == "0.5px solid black") {
                // console.log("0");
                if(firstTime == true || eval(v11) == eval(joueur[i].val1) || eval(v11) == eval(joueur[i].val2)
                    || eval(v22) == eval(joueur[i].val1) || eval(v22) == eval(joueur[i].val2)){
                    // console.log("1")
                // if (v11 == joueur[i].val1 || v22 == joueur[i].val2 || v11 == joueur[i].val2 || v22 == joueur[i].val1) {
                    // if (v11 == joueur[i].val1) {
                    //     v11 = joueur[i].val2;
                    //     tableau(1, 0, joueur[i].val1, joueur[i].val2, joueur[i].piece);
                    //     return retirer(i);
                    // } if (v11 == joueur[i].val2) {
                    //     v11 = joueur[i].val1;
                    //     tableau(1, 1, joueur[i].val1, joueur[i].val2, joueur[i].piece);
                    //     return retirer(i);
                    // } if (v22 == joueur[i].val1) {
                    //     v22 = joueur[i].val2;
                    //     tableau(2, 0, joueur[i].val1, joueur[i].val2, joueur[i].piece);
                    //     return retirer(i);
                    // } if (v22 == joueur[i].val2) {
                    //     v22 = joueur[i].val1;
                    //     tableau(2, 1, joueur[i].val1, joueur[i].val2, joueur[i].piece);
                    //     return retirer(i);
                    // }
                    if(firstTime == true){
                        v11 = joueur[i].val1;
                        v22 = joueur[i].val2;
                        tableau(1, 0, joueur[i].val1, joueur[i].val2, '');
                        return retirer(i);
                    }
                    if(eval(v11) == eval(joueur[i].val1)) {
                        v11 = joueur[i].val2;
                        tableau(1, 0, joueur[i].val1, joueur[i].val2, '');
                        return retirer(i);
                    }
                    if(eval(v11) == eval(joueur[i].val2)) {
                        v11 = joueur[i].val1;
                        tableau(1, 1, joueur[i].val1, joueur[i].val2, '');
                        return retirer(i);
                    }
                    if(eval(v22) == eval(joueur[i].val1)) {
                        v22 = joueur[i].val2;
                        tableau(2, 0, joueur[i].val1, joueur[i].val2, '');
                        return retirer(i);
                    }
                    if(eval(v22) == eval(joueur[i].val2)) {
                        v22 = joueur[i].val1;
                        tableau(2, 1, joueur[i].val1, joueur[i].val2, '');
                        return retirer(i);
                    }
                } else {
                    al.innerHTML = "Piece invalide";
                    al.style.display = "block";
                    el[i].style.border = "0px"
                    setTimeout(() => { al.style.display = "none" }, 3000);
                    return;
                }
            }
        }
    // }
}
function tableau(l, lv, vl1, vl2, styl) {
    var le = document.querySelectorAll(".emg");
    var ld = document.querySelectorAll(".emd");
    if (firstTime) {
        // document.querySelector(".emc").style.backgroundImage = "url('" + styl + "')";
        creerDominoTableauMilieu(vl1,vl2)
        firstTime = false;
    } else {

        if (vl1 == vl2) {
            lv = 2;
        }
        if (l == 1) {
            // le[qle].style.backgroundImage = "url('" + styl + "')";
            if (led >= 3) {
                if (lv == 0) {
                    le[qle].style.transform = "rotate(90deg)";
                    le[qle].style.left = String(led) + "%";
                    led -= 4;
                } if (lv == 1) {
                    le[qle].style.transform = "rotate(270deg)";
                    le[qle].style.left = String(led) + "%";
                    led -= 4;
                } if (lv == 2) {
                    led += 1;
                    le[qle].style.transform = "rotate(0deg)";
                    le[qle].style.left = String(led) + "%";
                    led -= 3;
                }
            } else {
                if (lv == 2 && tole != 45) {
                    le[qle].style.transform = "rotate(90deg)";
                    le[qle].style.top = String(tole) + "%";
                    le[qle].style.left = "3.5%";
                    tole -= 4.5;
                } else {
                    if (lv == 2) {
                        lv = 0;
                    }
                }
                if (lv == 0) {
                    le[qle].style.transform = "rotate(180deg)";
                    le[qle].style.top = String(tole) + "%"
                    le[qle].style.left = "3.5%";
                    tole -= 5.5;
                } if (lv == 1) {
                    le[qle].style.transform = "rotate(0deg)";
                    le[qle].style.top = String(tole) + "%";
                    le[qle].style.left = "3.5%";
                    tole -= 5.5;
                }
            }
            qle += 1;
            // clonerPieceTableau(1);
            creerDominoTableau(1,vl1,vl2)
        } else {
            // ld[qld].style.backgroundImage = "url('" + styl + "')";
            if (ldd <= 93) {
                if (lv == 0) {
                    ld[qld].style.transform = "rotate(270deg)";
                    ld[qld].style.left = String(ldd) + "%";
                    ldd += 4;
                } if (lv == 1) {
                    ld[qld].style.transform = "rotate(90deg)";
                    ld[qld].style.left = String(ldd) + "%";
                    ldd += 4;
                } if (lv == 2) {
                    ldd -= 1;
                    ld[qld].style.transform = "rotate(0deg)";
                    ld[qld].style.left = String(ldd) + "%";
                    ldd += 3;
                }
            } else {
                if (lv == 2 && told != 55) {
                    ld[qld].style.transform = "rotate(90deg)";
                    ld[qld].style.top = String(told) + "%";
                    ld[qld].style.left = "93%";
                    told -= 5;
                } else {
                    if (lv == 2) {
                        lv = 0;
                    }
                }
                if (lv == 0) {
                    ld[qld].style.transform = "rotate(-1deg)";
                    ld[qld].style.top = String(told) + "%"
                    ld[qld].style.left = "93%";
                    told += 6;
                } if (lv == 1) {
                    ld[qld].style.transform = "rotate(184deg)";
                    ld[qld].style.top = String(told) + "%";
                    ld[qld].style.left = "93%";
                    told += 6;
                }
            }
            qld += 1;
            // clonerPieceTableau(2);
            creerDominoTableau(2,vl1,vl2)
        }
    }
}
function clonerPieceTableau(p) {
    locopy = document.querySelector(".tableau");
    var ld = (p == 1) ? ".emg" : ".emd";
    ori = document.querySelector(ld);
    var copy = ori.cloneNode(true);
    locopy.appendChild(copy);
}

function creerDominoTableau(p,val1,val2) {
    var ld = (p == 1) ? "emg" : "emd";
    const dominoesDiv = document.querySelectorAll('.tableau');
    const div1 = document.createElement("div");
    div1.classList.add("piece");
    div1.classList.add(`${ld}`);
    const topDiv = document.createElement("div");
    topDiv.classList.add("top");
    topDiv.innerText = `${val1}`;
    const middleDiv = document.createElement("div");
    middleDiv.classList.add("middle");
    middleDiv.innerText = ":";
    const bottomDiv = document.createElement("div");
    bottomDiv.classList.add("bottom");
    bottomDiv.innerText = `${val2}`;
    div1.appendChild(topDiv);
    div1.appendChild(middleDiv);
    div1.appendChild(bottomDiv);
    dominoesDiv[0].appendChild(div1);
}

function creerDominoTableauMilieu(val1,val2) {
    const dominoesDiv = document.querySelectorAll('.tableau');
    const div1 = document.createElement("div");
    div1.classList.add("piece");
    div1.classList.add("emc");
    const topDiv = document.createElement("div");
    topDiv.classList.add("top");
    topDiv.innerText = `${val1}`;
    const middleDiv = document.createElement("div");
    middleDiv.classList.add("middle");
    middleDiv.innerText = ":";
    const bottomDiv = document.createElement("div");
    bottomDiv.classList.add("bottom");
    bottomDiv.innerText = `${val2}`;
    div1.appendChild(topDiv);
    div1.appendChild(middleDiv);
    div1.appendChild(bottomDiv);
    dominoesDiv[0].appendChild(div1);
}
