The dragon slayer
=================

*The dragon slayer* est un jeu de rôle de combat au tour par tour qui voit s'affronter un héros (le joueur) et un dragon (l'ordinateur).

Le jeu utilise des lancés de dés. Sachez qu'il existe des dés à 6 faces mais également des dés à 7,8, 10 faces ! Nous utiliserons plusieurs types de dés dans ce jeu !

Pour représenter un lancer de dés, nous noterons nDx, où n est le nombre de dés à lancer, x le nombre de faces de chacun des dés. Par exemple 2D6 représente un lancer de 2 dés à 6 faces.

Maquette
--------
La maquette graphique du jeu a été réalisée par un graphiste et un intégrateur à déjà développé la partie HTML/CSS. Vous pouvez donc reprendre directement son travail.
A vous de remplacer la partie dynamique (le déroulement de la partie) pour la générer en javascript.

_Remarque :_ vous disposez pour le moment d'un seul outil pour écrire du code HTML en javascript : **document.write()**. Quelles conséquences pour l'emplacement du **script** dans la page ? Fera-t-on toujours de cette manière ? Votre formateur est là pour répondre avec vous à ces questions. 

Préparation du jeu
------------------

Au lancement du jeu le joueur doit choisir :
	
	- le niveau de difficulté du jeu : facile, normal, difficile

Puis les points de vie de chaque personnage sont tirés au hasard:

	En mode facile :
	--------------
	* PV dragon : 100 + 5D10
	* PV joueur : 100 + 10D10

	En mode normal :
	--------------
	* PV dragon : 100 + 10D10
	* PV joueur : 100 + 10D10

	En mode difficile :
	-----------------
	* PV dragon : 100 + 10D10
	* PV joueur : 100 + 7D10
	
	--> Affichage des PV de départ

Déroulement de la partie
------------------------

A chaque tour de jeu, les étapes suivantes ont lieu :

1) On détermine qui est le plus rapide et attaque l'autre : c'est l'initiative

	Calcul de l'initiative : chaque personnage lance 10D6. Celui qui a le plus grand score attaque l'autre.
	
2) On détermine le nombre de points de dommage causés par l'attaquant à son adversaire

	a) Si c'est le dragon qui attaque :

		Les points de dommages sont égaux à 3D6. 
		Ensuite ces points de dommages sont majorés ou minorés en fonction de la difficulté et de la classe du héro.

		* Niveau facile : les points de dommages sont minorés de 2D6%.
		* Niveau difficile : les points de dommages sont majorés de 1D6%.

	b) Si c'est le héro qui attaque

		Les points de dommages sont égaux à 3D6. 
		Ensuite ces points de dommages sont majorés ou minorés en fonction de la difficulté et de la classe du héro.

		* Niveau facile : les points de dommages sont majorés de 2D6%.
		* Niveau difficile : les points de dommages sont minorés de 1D6%.
		
3) Affichage du journal du jeu : que s'est-il passé pendant le tour ?

    - Affichage du numéro du tour
	- Affichage de qui a attaqué et combien de points de dommages ont été causés
	- Affichage de l'état du jeu

Fin de la partie
----------------

La partie s'arrête lorsque l'un des personnages est mort, c'est-à-dire qu'il n'a plus de points de vie.

Affichage de l'image du vainqueur

Conseils
--------
Prenez le temps de penser aux différetnes étapes à suivre, et essayer de découper la tâche globale en plus petites tâches.
Il faut avancer pas à pas et tester chaque étape. On peut également faire une première version qui ne prend pas en compte tous les paramètres.
Une fois que cette première version fonctionne correctement, on l'enrichit au fur-et-à-mesure avec toutes les fonctionnalités.

Il est plus intéressant - et rassurant - d'avoir rapidement une version simplifée qui fonctionne que l'on enrichit par la suite !

Lorsque le nombre de lignes de code commencent à devenir important, pensez à découper le code en fonctions de manière logique ! 
Les fonctions permettent de ne pas répéter de code mais également de structurer le code pour le rendre plus lisible et plus maintenable.
	
BONUS
=====

Bonus n°1 : images du chevalier et du dragon amochés
----------------------------------------------------
Lors de l'affichage de l'état du jeu, si les points de vie des personnages sont inférieurs à 30% de leurs points de vie de départ, 
l'image du personnage est l'image "amochée" (knight-wounded.png et dragon-wounded.png).

Bonus n°2 : classes de personnages
----------------------------------
L'idée est de proposer au joueur parmis 3 classes de personnages :
- **chevalier**
- **voleur**
- **mage**

Chaque classe a une particularité :
- le **voleur** est rapide, son **initiative** est majorée de **1D6%**. Par exemple s'il lance 1D6 et qu'il obtient 4, il aura 4% de bonus.
- l'attaque du dragon contre le **chevalier** est minorée de **1D10%**, car son armure le protège.
- l'attaque du **mage** est majorée de **1D10%**, il possède un sort de boule de feu très puissant.

Bonus n°3 : jauges de points de vie
-----------------------------------
Afficher les points de vie restants de chaque personnage dans une jauge qui reflète le pourcentage de points de vie restants.
S'il reste à un personnage la moitié de ses points de vie de départ, la jauge sera remplie à 50%.