'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
// L'unique variable globale est un objet contenant l'état du jeu.
let game;

// Déclaration des constantes du jeu, rend le code plus compréhensible
const PLAYER = 'player';
const DRAGON = 'dragon';

const LEVEL_EASY   = 1;
const LEVEL_NORMAL = 2;
const LEVEL_HARD   = 3;


/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/
/**
 * Détermine qui du joueur ou du dragon prend l'initiative et attaque
 * @returns {string} - DRAGON|PLAYER
 */
function getAttacker()
{
    // On lance 10D6 pour le joueur et pour le dragon
    let dragon = throwDices(10,6)
    let player = throwDices(10,6)
    //Si le player a un nombre supérieur au drafon
    if(player > dragon){
        //on retourne PLAYER
        return PLAYER
    }    
    //on retourne DRAGON par défaut
    return DRAGON
}

/**
 * Calcule les points de dommages causés par le dragon au chevalier
 * @returns {number} - le nombre de points de dommages
 */
function computeDamagePoint(attacker)
{
    console.log("mon argument: ", attacker)
    // On tire 3D6 pour le calcul des points de dommages causés par le dragon
    let damagePoints = throwDices(3,6)
     /*
      Majoration ou minoration des points de dommage en fonction du niveau de difficulté
      Pas de pondération si niveau normal CONDITION SWITCH sur la propriété level de l'objet game
    */
    switch(game.level){
        case LEVEL_EASY:
        /*
             Au niveau Facile,
             Si le dragon attaque, on diminue les points de dommage de 2D6 %
             Si le joueur attaque, on augmente les points de dommage de 2D6 %
            */
            if(attacker === DRAGON){
                damagePoints -= Math.round(damagePoints * throwDices(2,6)/100)
            }else{
                damagePoints += Math.round(damagePoints * throwDices(2,6)/100)
            }
        break;
        case LEVEL_HARD:
            /*
             Au niveau difficile,
             Si le dragon attaque, on augmente les points de dommage de 1D6 %
             Si le joueur attaque, on diminue les points de dommage de 1D6 %
            */
            if(attacker === DRAGON){
                damagePoints += Math.round(damagePoints * throwDices(1,6)/100)
            }else{
                damagePoints -= Math.round(damagePoints * throwDices(1,6)/100)
            }
        break;
    } 
    // On retourne les points de dommage
    return damagePoints
}

/**
 * Boucle du jeu : répète l'exécution d'un tour de jeu tant que les 2 personnages sont vivants
 */
function gameLoop()
{
    console.log("gameLoop")
    // Le jeu s'exécute tant que le dragon et le joueur sont vivants. WHILE
    while(game.hpDragon > 0 && game.hpPlayer > 0){
        console.log("round numéro: ", game.round)
        // On récup l'attackant et on stock dans une variable (appel de fonction)
        let attacker = getAttacker()
        // On récup les points de domage causés par l'assaillant (appel de fonction) on stock dans une variable
        let damagePoints = computeDamagePoint(attacker)
        //si l'attaquant est DRAGON
        if(attacker === DRAGON){
            // Diminution des points de vie du joueur.
            game.hpPlayer -= damagePoints
            if(game.hpPlayer < 0){
                game.hpPlayer = 0
            }
        //sinon
        }else{
            // Diminution des points de vie du dragon.
            game.hpDragon -= damagePoints
            if(game.hpDragon < 0){
                game.hpDragon = 0
            }
        }    
        // Affichage du journal : que s'est-il passé ? (appel de fonction)
        showGameLog(attacker, damagePoints)
        // Affichage de l'état du jeu (appel de fonction)
        showGameState()
        // On passe au tour suivant. (incrémentation du round)
        game.round++
    }    
}


/**
 * Initialise les paramètres du jeu
 *  Création d'un objet permettant de stocker les données du jeu
 *      ->  les données seront stockées dans une propriété de l'objet,
 *          on évite ainsi de manipuler des variables globales à l'intérieur des fonctions qui font évoluer les valeurs
 *
 * Quelles sont les données necessaires tout au long du jeu (pour chaque round)
 *    -  N° du round (affichage)
 *    -  Niveau de difficulté (calcul des dommages)
 *    -  Points de vie du joueur ( affichage + fin de jeu )
 *    -  Points de vie du dragon ( affichage + fin de jeu )
 */
function initializeGame()
{
    console.log("initializeGame")
    // Initialisation de la variable globale du jeu (on lui attribut un objet)
    //dans cet objet on crée une propriété round qui a 1 pour valeur
    game = new Object()
    game.round = 1
    // Choix du niveau du jeu (appel de la fonction utilities) que l'on stock dans une propriété level de l'objet
    game.level = requestInteger("Choisissez un niveau: 1 = Facile, 2 = Normal et 3 = Difficile", 1, 3)
    
    /*
    * Détermination des points de vie de départ selon le niveau de difficulté.
    * 10 tirages, la pondération se joue sur le nombre de faces
    *    -> plus il y a de faces, plus le nombre tiré peut-être élévé CONDITION SWITCH
    */
    switch(game.level) {
        //si c'est en mode facile
        case LEVEL_EASY:
            //on rajoute aux 100pv de base 5D10 de vie au dragon et 10D10 au joueur 
            game.hpDragon = 100 + throwDices(5, 10);
            game.hpPlayer = 100 + throwDices(10, 10);
            break;
        //si c'est en mode normal
        case LEVEL_NORMAL:
            //on rajoute aux 100pv de base 10D10 pour les deux
            game.hpDragon = 100 + throwDices(10, 10);
            game.hpPlayer = 100 + throwDices(10, 10);
            break;
        //si c'est en mode hard
        case LEVEL_HARD:
            //on rajoute aux 100pv de base 10D10 de vie au dragon et 7D10 au joueur
            game.hpDragon = 100 + throwDices(10, 10);
            game.hpPlayer = 100 + throwDices(7, 10);
            break;
    }
}

/**
 * Affichage de l'état du jeu, c'est-à-dire des points de vie respectifs des deux combattants
 */
function showGameState()
{
    console.log("showGameState")
    console.log("pv dragon: ", game.hpDragon, ", pv chevalier: ", game.hpPlayer)
    // Au départ du jeu, les joueurs sont encore en bonne état !
    const imageFilePlayer = 'knight.png';
    const imageFileDragon = 'dragon.png';
    // Affichage du code HTML (création d'un li avec la classe game-state)
    document.write('<div class="game-state">');
    // Affichage de l'état du joueur balise figure (avec la classe game-state_player) + img du joueur
    document.write('<figure class="game-state_player">');
    document.write(`<img src="images/${imageFilePlayer}" alt="Chevalier">`);
    // Si le joueur est toujours vivant
    if(game.hpPlayer > 0){
        //on affiche ses points de vie dans un figcaption
        document.write(`<figcaption>${game.hpPlayer} PV</figcaption>`);
    //sinon
    }else{
        // Le joueur est mort, on affiche 'GAME OVER' dans un figcaption
        document.write('<figcaption>GAME OVER</figcaption>');
    }   
    //fermeture du figure
    document.write('</figure>')
    // Affichage de l'état du dragon balise figure (avec la classe game-state_dragon) + img du joueur
    document.write('<figure class="game-state_dragon">');
    document.write(`<img src="images/${imageFileDragon}" alt="Dragon">`);
    // Si le dragon est toujours vivant
    if(game.hpDragon > 0){
        //on affiche ses points de vie dans un figcaption
        document.write(`<figcaption>${game.hpDragon} PV</figcaption>`);
    //sinon
    }else{
        // Le dragon est mort on affiche 'GAME OVER' dans un figcaption
        document.write('<figcaption>GAME OVER</figcaption>');
    }       
    //fermeture de la balise figure
    document.write('</figure>')
    //fermeture de la balise li
    document.write('</div>')
    
}

/**
 * Affiche ce qu'il s'est passé lors d'un tour du jeu : qui a attaqué ? Combien de points de dommage ont été causés ?
 * @param {string} attacker - Qui attaque : DRAGON ou PLAYER
 * @param {number} damagePoints - Le nombre de points de dommage causés
 */
function showGameLog(attacker, damagePoints)
{
    console.log("showGameLog")
    let alt;
    let imageFilename;
    let message;
    
    // Si c'est le dragon qui attaque...
    if(attacker === DRAGON){
        //attribution des valeurs pour l'image du dragon dans les variable alt, imageFilename et message
        imageFilename = "dragon-winner.png";
        alt = 'Dragon vainqueur';
        message = 'Le dragon prend l\'initiative, vous attaque et vous inflige ' + damagePoints + ' points de dommage !';
    //sinon
    }else{
        //attribution des valeurs pour l'image du player dans les variable alt, imageFilename et message
        imageFilename = "knight-winner.png";
        alt = 'Chevalier vainqueur';
        message = 'Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ' + damagePoints + ' points de dommage !';
    }
    // Affichage des informations du tour dans le document HTML (h3, figure (avec la classe gameround), img, figcaption )
    document.write(`<h3>Tour n°${game.round}</h3>`);
    document.write('<figure class="game-round">');
    document.write(`<img src="images/${imageFilename}" alt="${alt}">`);
    document.write(`<figcaption>${message}</figcaption>`);
    document.write('</figure>');
    
}

/**
 * Affichage du vainqueur
 */
function showGameWinner()
{
    console.log("showGameWinner")
    let imageFilename;
    let alt;
    let message;

    // Si les points de vie du dragon sont positifs, c'est qu'il est toujours vivant, c'est donc lui qui a gagné le combat
    if(game.hpDragon > 0){
        //attribution des valeurs pour l'image du dragon dans les variable alt, imageFilename et message
        imageFilename = "dragon-winner.png";
        alt = 'Dragon vainqueur';
        message = 'Vous avez perdu le combat, le dragon vous a carbonisé !';
    //sinon (le dragon est mort) c'est le joueur qui a gagné
    }else{
        //attribution des valeurs pour l'image du player dans les variable alt, imageFilename et message
        imageFilename = "knight-winner.png";
        alt = 'Chevalier vainqueur';
        message = 'Vous avez vaincu le dragon, vous êtes un vrai héros !';
    }
    //création du footer avec le resultat de la partie footer, h3, figure, figcaption, img
    document.write('<footer>');
    document.write('<h3>Fin de la partie</h3>');
    document.write('<figure>');
    document.write(`<figcaption>${message}</figcaption>`);
    document.write(`<img src="images/${imageFilename}" alt="${alt}">`);
    document.write('</figure>');
    document.write('</footer>');
}

/**
 * Fonction principale du jeu qui démarre la partie
 */
function startGame()
{
    // Etape 1 : initialisation du jeu (fonction)
    initializeGame()
    // Etape 2 : exécution du jeu, déroulement de la partie (2 fonctions)
    showGameState()
    gameLoop()
    // Fin du jeu, affichage du vainqueur (fonction)
    showGameWinner()
}


/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
startGame();
console.log(game)