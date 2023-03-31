const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    let mode = urlParams.get(`mode`);
    console.log(mode);
    
    // Initialiser le générateur en fonction du mode
    let generator;
    switch (mode) {
      case 'multiplication':
        generator = new MultiplicationGenerator();
        break;
      case 'addition':
        generator = new AdditionGenerator();
        break;
      case 'soustraction':
        generator = new SoustractionGenerator();
        break;
      case 'division':
        generator = new DivisionGenerator();
        break;
    }
    
    // Initialiser le jeu
    game = new Game(generator);
    game.charger();
    console.log('game.charger()', game.dominos);
    console.log('Distribution', game.players);