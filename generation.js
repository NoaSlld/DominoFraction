let dominos = [];
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
  
  if (i <= 6) {
    let [fraction1, fraction2] = dominos[aux].val2.split('*');
    let [numerator1, denominator1] = fraction1.split('/');
    let [numerator2, denominator2] = fraction2.split('/');
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
    let [fraction1, fraction2] = dominos[aux].val2.split('*');
    let [numerator1, denominator1] = fraction1.split('/');
    let [numerator2, denominator2] = fraction2.split('/');
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
    let [fraction1, fraction2] = dominos[aux].val2.split('*');
    let [numerator1, denominator1] = fraction1.split('/');
    let [numerator2, denominator2] = fraction2.split('/');
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
    let [fraction1, fraction2] = dominos[aux].val2.split('*');
    let [numerator1, denominator1] = fraction1.split('/');
    let [numerator2, denominator2] = fraction2.split('/');
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
    let [fraction1, fraction2] = dominos[aux].val2.split('*');
    let [numerator1, denominator1] = fraction1.split('/');
    let [numerator2, denominator2] = fraction2.split('/');
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
    let [fraction1, fraction2] = dominos[aux].val2.split('*');
    let [numerator1, denominator1] = fraction1.split('/');
    let [numerator2, denominator2] = fraction2.split('/');
    dominos.push({
        val1: createDomino(nb),
        val2: reduce(numerator1*h,denominator1*g)[0] + "/" + reduce(numerator1*h,denominator1*g)[1] + " * " + reduce(numerator2*g,denominator2*h)[0] + "/" + reduce(numerator2*g,denominator2*h)[1]
    }); 
   }

  aux++
  i++;
  }


function generatefirst7dominos(){
    sixNum = Math.floor(Math.random() * 10 ) + 1;
    sixDenum = Math.floor(Math.random() * 10 ) + 1;
    if (sixDenum ==  sixNum || sixDenum == 1 ){
        generatefirst7dominos();
    } 
    sixNumBis = Math.floor(Math.random() * 10 ) + 1;
    if ((sixDenumBis = Math.floor(Math.random() * 10 ) + 1) ==  sixNumBis || sixDenumBis == 1 ){
        generatefirst7dominos();
    } 
    prodNum = sixNum * sixNumBis
    prodDenum = sixDenum * sixDenumBis
  
    for (let aux = 0 ; aux < 6 ; aux++){
        dominos.push({
            val1: reduce(prodNum,prodDenum)[0] + "/" + reduce(prodNum,prodDenum)[1],
            val2: (Math.floor(Math.random() * 10 ) + 1) + "/" + (Math.floor(Math.random() * 10 ) + 1) + " * " + (Math.floor(Math.random() * 10 ) + 1)  + "/" + (Math.floor(Math.random() * 10 ) + 1) 
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

generatefirst7dominos()
for( i ; i <= 21;){
    createAndPushOneDomino()
}



console.log(dominos);
