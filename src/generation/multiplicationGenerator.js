class MultiplicationGenerator extends Generator {
    generate() {
        let dominos = []
        let i = 1;
        let aux = 0;
        this.generatefirst7dominos(dominos)
        for( i ; i <= 21; i++){
            aux = this.createAndPushOneDomino(dominos, i, aux)
        }
        return dominos
    }
    
    generatefirst7dominos(dominos){
        let sixNum = Math.floor(Math.random() * 10 ) + 1;
        let sixDenum = Math.floor(Math.random() * 10 ) + 1;
        if (sixDenum ==  sixNum || sixDenum == 1 ){
            this.generatefirst7dominos(dominos);
            dominos = [];
        } 
        let sixNumBis = Math.floor(Math.random() * 10 ) + 1;
        let sixDenumBis = Math.floor(Math.random() * 10 ) + 1
        if ((sixDenumBis ==  sixNumBis || sixDenumBis == 1 )){
            this.generatefirst7dominos(dominos);
            dominos = [];
        } 
        
        let prodNum = sixNum * sixNumBis
        let prodDenum = sixDenum * sixDenumBis
        for (let aux = 0 ; aux < 6 ; aux++){
            dominos.push(new Domino(Calculator.reduce(prodNum,prodDenum)[0] + "/" + Calculator.reduce(prodNum,prodDenum)[1],
            (Math.floor(Math.random() * 10 ) + 1) + "/" + (Math.floor(Math.random() * 10 ) + 1) + " * " + (Math.floor(Math.random() * 10 ) + 1)  + "/" + (Math.floor(Math.random() * 10 ) + 1)))
        }
        
        dominos.push(new Domino(Calculator.reduce(prodNum,prodDenum)[0] + "/" + Calculator.reduce(prodNum,prodDenum)[1],
        sixNum + "/" + sixDenum + " * " + sixNumBis + "/" + sixDenumBis
        ));
    }
    
    createDomino(dominos, nb){
        let [fraction1, fraction2] = dominos[nb].valDroite.split('*');
        let [numerator1, denominator1] = fraction1.split('/');
        let [numerator2, denominator2] = fraction2.split('/');
        let prodNum = numerator1 * numerator2
        let prodDenum = denominator1 * denominator2
        return Calculator.reduce(prodNum,prodDenum)[0] + "/" + Calculator.reduce(prodNum,prodDenum)[1]
    }
    
    createAndPushOneDomino(dominos, i, aux){
        let g = Math.floor(Math.random() * 5 ) + 1;
        let h = Math.floor(Math.random() * 5 ) + 1;
        
        if (i <= 6) {
            let [fraction1, fraction2] = dominos[aux].valDroite.split('*');
            let [numerator1, denominator1] = fraction1.split('/');
            let [numerator2, denominator2] = fraction2.split('/');
            dominos.push( new Domino(this.createDomino(dominos, 5),
            Calculator.reduce(numerator1*h,denominator1)[0] + "/" + Calculator.reduce(numerator1*h,denominator1)[1] + " * " + Calculator.reduce(numerator2,denominator2*h)[0] + "/" + Calculator.reduce(numerator2,denominator2*h)[1]
            )); 
        }
        if (i > 6 && i <= 11) {
            if(i == 7) {
                aux = 0;
            }
            let [fraction1, fraction2] = dominos[aux].valDroite.split('*');
            let [numerator1, denominator1] = fraction1.split('/');
            let [numerator2, denominator2] = fraction2.split('/');
            dominos.push(new Domino(this.createDomino(dominos, 4),
            Calculator.reduce(numerator1*g,denominator1*h)[0] + "/" + Calculator.reduce(numerator1*g,denominator1*h)[1] + " * " + Calculator.reduce(numerator2*h,denominator2*g)[0] + "/" + Calculator.reduce(numerator2*h,denominator2*g)[1]
            )); 
        }
        
        if (i > 11 && i <= 15) {
            if(i == 12) {
                aux = 0;
            }
            let [fraction1, fraction2] = dominos[aux].valDroite.split('*');
            let [numerator1, denominator1] = fraction1.split('/');
            let [numerator2, denominator2] = fraction2.split('/');
            dominos.push(new Domino(this.createDomino(dominos, 3),
            Calculator.reduce(numerator1*g,denominator1)[0] + "/" + Calculator.reduce(numerator1*g,denominator1)[1] + " * " + Calculator.reduce(numerator2,denominator2*g)[0] + "/" + Calculator.reduce(numerator2,denominator2*g)[1]
            )); 
        }
        
        if (i > 15 && i <= 18) {
            if(i == 16) {
                aux = 0;
            }
            let [fraction1, fraction2] = dominos[aux].valDroite.split('*');
            let [numerator1, denominator1] = fraction1.split('/');
            let [numerator2, denominator2] = fraction2.split('/');
            dominos.push(new Domino(this.createDomino(dominos, 2),
            Calculator.reduce(numerator1*h,denominator1*g)[0] + "/" + Calculator.reduce(numerator1*h,denominator1*g)[1] + " * " + Calculator.reduce(numerator2*g,denominator2*h)[0] + "/" + Calculator.reduce(numerator2*g,denominator2*h)[1]
            )); 
        }
        if (i > 18 && i <= 20) {
            if(i == 19) {
                aux = 0;
            }
            let [fraction1, fraction2] = dominos[aux].valDroite.split('*');
            let [numerator1, denominator1] = fraction1.split('/');
            let [numerator2, denominator2] = fraction2.split('/');
            dominos.push(new Domino(this.createDomino(dominos, 1),
            Calculator.reduce(numerator1*h,denominator1*g)[0] + "/" + Calculator.reduce(numerator1*h,denominator1*g)[1] + " * " + Calculator.reduce(numerator2*g,denominator2*h)[0] + "/" + Calculator.reduce(numerator2*g,denominator2*h)[1]
            )); 
        }
        if (i > 20 && i <= 21) {
            if(i == 21) {
                aux = 0;
            }
            let [fraction1, fraction2] = dominos[aux].valDroite.split('*');
            let [numerator1, denominator1] = fraction1.split('/');
            let [numerator2, denominator2] = fraction2.split('/');
            dominos.push(new Domino(this.createDomino(dominos, 0),
            Calculator.reduce(numerator1*h,denominator1*g)[0] + "/" + Calculator.reduce(numerator1*h,denominator1*g)[1] + " * " + Calculator.reduce(numerator2*g,denominator2*h)[0] + "/" + Calculator.reduce(numerator2*g,denominator2*h)[1]
            )); 
        }
        return aux += 1
    }
}