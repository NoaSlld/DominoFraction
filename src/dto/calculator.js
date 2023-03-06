class Calculator {
    reduce(number,denomin){
        let gcd = this.gcd(number,denomin);
        return [number/gcd, denomin/gcd];
    }

    gcd(a,b) {
        return b ? this.gcd(b, a%b) : a;
    }
}