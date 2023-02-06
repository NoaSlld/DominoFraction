pieces = [];
joueur = [];
bot = new Array(4);

let qui = 0, v11 = 6, v22 = 6, qle = 0, qld = 0, led = 43, ldd = 49, tole = 45, told = 55, localdrop = 0, sese = 0;
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
    Definirpieces();
}
document.addEventListener("DOMContentLoaded", charger);
function Definirpieces() {
    var r1 = 0, r2 = 0, pr = 0;
    while (1) {
        var va1 = String(r1),
            va2 = String(r2);
        partie = {
            piece: 'pec/' + va1 + va2 + '.png',
            val1: r1,
            val2: r2,
            psi: 0
        }
        pieces.push(partie);
        r2++;
        if (r2 == 7) {
            pr += 1;
            r2 = pr;
            r1 = pr;

        }
        if ((va1 + va2) === '66') {
            return Distribuerpieces();
        }

    }
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
            pieces[pobj[numdecopy]].psi = numdecopy;
            joueur.push(pieces[pobj[numdecopy]]);
        }
        if (numdecopy > 6 && numdecopy <= 13) {
            locopy = document.querySelector(".bot0");
            pieces[pobj[numdecopy]].psi = numdecopy;
            bot[0].push(pieces[pobj[numdecopy]]);
        }
        if (numdecopy > 13 && numdecopy <= 20) {
            locopy = document.querySelector(".bot1");
            pieces[pobj[numdecopy]].psi = numdecopy;
            bot[1].push(pieces[pobj[numdecopy]]);
        }
        if (numdecopy > 20) {
            locopy = document.querySelector(".bot2");
            pieces[pobj[numdecopy]].psi = numdecopy;
            bot[2].push(pieces[pobj[numdecopy]]);
        }
        var copy = ori.cloneNode(true);
        locopy.appendChild(copy);
        if (numdecopy < 7) {
            document.querySelectorAll(".piece")[numdecopy].style.backgroundImage = "url('" + pieces[pobj[numdecopy]].piece + "')";
        } else {
            document.querySelectorAll(".piece")[numdecopy].style.backgroundImage = "url('pec/padr.png')";
        }
        numdecopy++;
    }
    return QuiJoue();
}
function QuiJoue() {
    var al = document.querySelector(".info");
    for (var i = 0; i < 7; i++) {
        if ((joueur[i].val1 + joueur[i].val2) == 12) {
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
        }
    }
    for (var q = 0; q < 3; q++) {
        for (var i = 0; i < 7; i++) {
            if (bot[q][i].val2 == 6 && bot[q][i].val1 == 6) {
                var nus = (q == 0) ? "2" : (q == 1) ? "3" : "4";
                document.querySelector(".infoBis").style.display = "block";
                al.innerHTML = "Joueur " + nus + " commence";
                al.style.display = "block";
                sese = i;
                qui = q;
                setTimeout(() => {
                    al.style.display = "none";
                    return jouer();
                }, 2500);
                return;
            }
        }
    }
}
function JeuBlock() {
    var n = 0;
    for (var i = 0; i < joueur.length; i++) {
        if (v11 == joueur[i].val1 || v22 == joueur[i].val2 || v11 == joueur[i].val2 || v22 == joueur[i].val1) {
            n += 1;
            break;
        }
    }
    for (var q = 0; q < 3; q++) {
        for (var i = 0; i < bot[q].length; i++) {
            if (v11 == bot[q][i].val1 || v22 == bot[q][i].val2
                || v11 == bot[q][i].val2 || v22 == bot[q][i].val1) {
                n += 1;
                break;
            }
        }
    }
    return n;
}
function FinDuJeu() {
    document.querySelector("footer").style.display = "block";
    document.querySelectorAll("button")[2].style.display = "block";
    document.querySelectorAll("button")[2].addEventListener("click", () => {
        setTimeout(() => {
            return document.location.reload(true);
        }, 500);
    });
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
    document.querySelector(".infoBis").style.display = "block";
    document.querySelector(".passer").style.display = "none";
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
        al.innerHTML = "jogo bloqueado";
        al.style.display = "block";
        document.querySelector(".infoBis").style.display = "block";
        return FinDuJeu();
    }
    if(sese<0){
    var nus = (qui == 3) ? "Q?" : (qui == 0) ? "2" : (qui == 1) ? "3" : "4";
    if (nus === "Q?") {
        al.innerHTML = "A toi de jouer <br>glisse ou double clique sur le domino";
    } else {
        al.innerHTML = "Tour du joueur " + nus;
    }
    al.style.display = "block";
}
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
    if (sese >= 0) {
        tableau(1, 0, bot[qui][sese].val1, bot[qui][sese].val2, bot[qui][sese].piece);
        el[sese].remove();
        bot[qui].splice(sese, 1);
        sese = -3;
        qui +=1;
        return jouer();
    }
    for (var i = 0; i <= bot[qui].length; i++) {
        if (i == bot[qui].length) {
            qui+=1;
            return jouer();
        }
        if (v11 == bot[qui][i].val1) {
            v11 = bot[qui][i].val2;
            tableau(1, 0, bot[qui][i].val1, bot[qui][i].val2, bot[qui][i].piece);
            el[i].remove();
            bot[qui].splice(i, 1);
            qui +=1;
            return jouer();
        }
        if (v11 == bot[qui][i].val2) {
            v11 = bot[qui][i].val1;
            tableau(1, 1, bot[qui][i].val1, bot[qui][i].val2, bot[qui][i].piece);
            el[i].remove();
            bot[qui].splice(i, 1);
            qui +=1;
            return jouer();
        }
        if (v22 == bot[qui][i].val2) {
            v22 = bot[qui][i].val1;
            tableau(2, 1, bot[qui][i].val1, bot[qui][i].val2, bot[qui][i].piece);
            el[i].remove();
            bot[qui].splice(i, 1);
            qui +=1;
            return jouer();
        }
        if (v22 == bot[qui][i].val1) {
            v22 = bot[qui][i].val2;
            tableau(2, 0, bot[qui][i].val1, bot[qui][i].val2, bot[qui][i].piece);
            el[i].remove();
            bot[qui].splice(i, 1);
            qui +=1;
            return jouer();
        }
    }
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
    if (sese >= 0) {
        if (el[sese].style.border == "0.5px solid black") {
            tableau(1, 0, joueur[sese].val1, joueur[sese].val2, joueur[sese].piece);
            qui=0;
            var aux=sese;
            sese=-3;
            return retirer(aux);
        } else {
            al.innerHTML = "piece invalide";
            al.style.display = "block";
            for (var i = 0; i < el.length; i++) {
                if (el[i].style.border == "0.5px solid black") {
                    el[i].style.border = "0px"
                }
            }
            setTimeout(() => { al.style.display = "none" }, 2500);
        }
    } else {
        for (var i = 0; i < el.length; i++) {
            if (el[i].style.border == "0.5px solid black") {
                if (v11 == joueur[i].val1 || v22 == joueur[i].val2 || v11 == joueur[i].val2 || v22 == joueur[i].val1) {
                    if (v11 == joueur[i].val1) {
                        v11 = joueur[i].val2;
                        tableau(1, 0, joueur[i].val1, joueur[i].val2, joueur[i].piece);
                        return retirer(i);
                    } if (v11 == joueur[i].val2) {
                        v11 = joueur[i].val1;
                        tableau(1, 1, joueur[i].val1, joueur[i].val2, joueur[i].piece);
                        return retirer(i);
                    } if (v22 == joueur[i].val1) {
                        v22 = joueur[i].val2;
                        tableau(2, 0, joueur[i].val1, joueur[i].val2, joueur[i].piece);
                        return retirer(i);
                    } if (v22 == joueur[i].val2) {
                        v22 = joueur[i].val1;
                        tableau(2, 1, joueur[i].val1, joueur[i].val2, joueur[i].piece);
                        return retirer(i);
                    }
                } else {
                    al.innerHTML = "peça invalida";
                    al.style.display = "block";
                    el[i].style.border = "0px"
                    setTimeout(() => { al.style.display = "none" }, 3000);
                    return;
                }
            }
        }
    }
}
function tableau(l, lv, vl1, vl2, styl) {
    var le = document.querySelectorAll(".emg");
    var ld = document.querySelectorAll(".emd");
    if (vl1 == 6 && vl2 == 6) {
        document.querySelector(".emc").style.backgroundImage = "url('" + styl + "')";
    } else {
        if (vl1 == vl2) {
            lv = 2;
        }
        if (l == 1) {
            le[qle].style.backgroundImage = "url('" + styl + "')";
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
            clonerPieceTableau(1);
        } else {
            ld[qld].style.backgroundImage = "url('" + styl + "')";
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
            clonerPieceTableau(2);
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
