class AdditionGenerator extends Generator {
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
        let sixNumBis = Math.floor(Math.random() * 10 ) + 1;
        let sixDenumBis = Math.floor(Math.random() * 10) + 1;
        
        while ((sixDenum == sixNum || sixDenum == 1) || (sixDenumBis == sixNumBis || sixDenumBis == 1)) {
            sixNum = Math.floor(Math.random() * 10 ) + 1;
            sixDenum = Math.floor(Math.random() * 10 ) + 1;
            sixNumBis = Math.floor(Math.random() * 10 ) + 1;
            sixDenumBis = Math.floor(Math.random() * 10) + 1;
        }
        
        let prodNum = eval(sixNum*sixDenumBis + sixNumBis*sixDenum)
        let prodDenum = sixDenum * sixDenumBis
    
        for (let aux = 0 ; aux < 6 ; aux++){
            dominos.push(new Domino(Calculator.reduce(prodNum,prodDenum)[0] + "/" + Calculator.reduce(prodNum,prodDenum)[1],
                (Math.floor(Math.random() * 10 ) + 1) + "/" + (Math.floor(Math.random() * 10 ) + 1) + " + " + (Math.floor(Math.random() * 10 ) + 1)  + "/" + (Math.floor(Math.random() * 10 ) + 1) 
            ));
        }
        dominos.push(new Domino(Calculator.reduce(prodNum,prodDenum)[0] + "/" + Calculator.reduce(prodNum,prodDenum)[1],
            sixNum + "/" + sixDenum + " + " + sixNumBis + "/" + sixDenumBis
        ));
    }
    
    createDomino(dominos, nb){
        let [fraction1, fraction2] = dominos[nb].valDroite.split('+');
        let [numerator1, denominator1] = fraction1.split('/');
        let [numerator2, denominator2] = fraction2.split('/');
        let prodNum = eval(numerator1*denominator2 + numerator2*denominator1)
        let prodDenum = denominator1 * denominator2
        return Calculator.reduce(prodNum,prodDenum)[0] + "/" + Calculator.reduce(prodNum,prodDenum)[1]
    }
    
    createAndPushOneDomino(dominos, i, aux){
      let g = Math.floor(Math.random() * 5 );
      let h = Math.floor(Math.random() * 5 ) + 4;
      let [fraction1, fraction2] = dominos[aux].valDroite.split('+');
      let [numerator1, denominator1] = fraction1.split('/');
      let [numerator2, denominator2] = fraction2.split('/');
      if (eval(numerator2/denominator2) < eval(g/h)) {
        this.createAndPushOneDomino(dominos, i, aux);
        return aux;
      }
      
      if (i <= 6) {
        dominos.push(new Domino(this.createDomino(dominos, 5),
        Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[0] + "/" + Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[1] + " + " + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[0] + "/" + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[1]
        )); 
      }
      if (i > 6 && i <= 11) {
        if(i == 7) {
            aux = 0;
        }
        dominos.push(new Domino(this.createDomino(dominos, 4),
        Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[0] + "/" + Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[1] + " + " + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[0] + "/" + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[1]
        )); 
       }
       if (i > 11 && i <= 15) {
        if(i == 12) {
            aux = 0;
        }
        dominos.push(new Domino(this.createDomino(dominos, 3),
            Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[0] + "/" + Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[1] + " + " + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[0] + "/" + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[1]
        )); 
       }
    
       if (i > 15 && i <= 18) {
        if(i == 16) {
            aux = 0;
        }
        dominos.push(new Domino(this.createDomino(dominos, 2),
            Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[0] + "/" + Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[1] + " + " + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[0] + "/" + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[1]
        )); 
       }
       if (i > 18 && i <= 20) {
        if(i == 19) {
            aux = 0;
        }
        dominos.push(new Domino(this.createDomino(dominos, 1),
            Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[0] + "/" + Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[1] + " + " + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[0] + "/" + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[1]
        )); 
       }
       if (i > 20 && i <= 21) {
        if(i == 21) {
            aux = 0;
        }
        dominos.push(new Domino(this.createDomino(dominos, 0),
            Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[0] + "/" + Calculator.reduce(eval(numerator1*h + g*denominator1),eval(denominator1*h))[1] + " + " + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[0] + "/" + Calculator.reduce(eval(numerator2*h - g*denominator2),eval(denominator2*h))[1]
        )); 
       }
       return aux += 1;
      }
}