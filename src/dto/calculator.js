class Calculator {
    static reduce(number,denomin){
        let gcd = this.gcd(number,denomin);
        return [number/gcd, denomin/gcd];
    }

    static gcd(a,b) {
        return b ? this.gcd(b, a%b) : a;
    }
}