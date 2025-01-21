// ici on déclare un tableau qui va stocker temporairement les cartes affichées
let panier = []

/**
 * Cette fonction permet d'afficher une carte lorsque l'on click dessus.
 *
 * Règles:
 * - Si il n'y a aucune carte dans le stockage, alors on ajoute la carte dedans.
 * - Si il y a déjà une carte dans le stockage, alors on compare les 2 cartes.
 * - Si les 2 cartes sont identiques, alors on marque un point.
 * - Sinon, on remets les cartes en face cachée.
 *
 * @param e
 */
function afficherCarte(e) {
  // si la carte est déjà matchée ou en cours de selection
  // alors on ne fait rien
  if (e.target.classList.contains('match') ||
      e.target.classList.contains('selection')) {
    return
  }
  // si il y a moins de 2 cartes dans le panier, on l'ajoute la nouvelle
  // et on l'affiche à l'écran
  if (panier.length < 2) {
    e.target.classList.add('visible')
    e.target.classList.add('selection')
    panier.push(e.target)
  }
  // si il y a exactement 2 cartes dans le panier, on les compare
  if (panier.length === 2) {
    comparerCartes()
  }
}

/**
 * Cette fonction permet de comparer les 2 cartes présentes dans le panier.
 * Si l'attribut 'animal' de chaque carte est identique, alors elles matchent, on les garde affichée.
 * Sinon, elle ne matchent pas, on les retourne.
 */
function comparerCartes() {
  // on prend la première carte du panier
  const carteA = panier[0]
  // on prend la deuxième carte du panier
  const carteB = panier[1]
  // on compare l'attribut 'animal' de chaque carte
  if (carteA.getAttribute('animal') === carteB.getAttribute('animal')) {
    // ça match! :)
    carteA.classList.add('match')
    carteB.classList.add('match')
    // elles ne sont plus en sélection
    carteA.classList.remove('selection')
    carteB.classList.remove('selection')
  } else {
    // pas match! :(
    // setTimeout se lance au bout de 500 milliseconds (= une demie-seconde)
    setTimeout(function() {
      // elles ne sont plus visibles
      carteA.classList.remove('visible')
      carteB.classList.remove('visible')
      // elles ne sont plus en selection
      carteA.classList.remove('selection')
      carteB.classList.remove('selection')
    }, 500)
  }
  // enfin, on vide le panier pour le prochain tour
  panier = []
}

/**
 * Cette fonction mélange les cartes aléatoirement avec l'algorithme de Fisher-Yates.
 * Doc: https://fr.wikipedia.org/wiki/M%C3%A9lange_de_Fisher-Yates
 */
function melangerCartes(cartes) {
  // mélange les cartes...
  let currentIndex = cartes.length, randomIndex

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex)

    currentIndex--;

    [cartes[currentIndex], cartes[randomIndex]] = [
      cartes[randomIndex],
      cartes[currentIndex]]
  }

  // retourne les cartes mélangées
  return cartes
}

function commencerPartie() {
  // on définit le nombre de paires de cartes (10 paires = 20 cartes)
  const nombreDePaires = 10
  // on définit les valeurs possibles pour les cartes
  // ici ce sont des animaux
  const animaux = [
    '🐕',
    '🐱',
    '🐇',
    '🐟',
    '🐸',
    '🐍',
    '🐒',
    '🐑',
    '🐄',
    '🐔',
  ]
  // on récupère notre element html deck  via l'id 'deck'
  const deck = document.querySelector('#deck')
  // on prépare les cartes que l'on va ajouter à notre deck
  let cartes = []
  // on parcourt chacune des paires de cartes
  for (let i = 0; i < nombreDePaires; i++) {
    // on parcourt chaque carte de cette paire
    for (let j = 0; j < 2; j++) {
      // on crée la carte dans le HTML
      const carte = document.createElement('div')
      // on ajoute un événement 'click' sur la carte pour l'afficher
      carte.addEventListener('click', afficherCarte)
      // on lui ajoute la classe 'carte'
      carte.classList.add('carte')
      // on lui ajoute une classe animal en fonction de l'index courant
      // (example: animaux[0] = 🐕 et animaux[3] = 🐟
      // !Attention: les tableaux commencent par l'index 0!
      carte.classList.add(animaux[i])
      // on lui ajoute le texte qui va s'afficher qui est l'animal en question (ex: 🐟)
      carte.textContent = animaux[i]
      // on lui ajoute un attribut (ex: animal = 🐟) pour les comparer pplus tard
      carte.setAttribute('animal', animaux[i])
      // on ajoute cette carte dans notre tableau de cartes
      cartes.push(carte)
    }
  }
  // on mélange notre tableau de cartes
  // pour que les paires ne se suivent pas
  cartes = melangerCartes(cartes)
  // on parcourt l'ensemble des cartes (nombre de paires * 2)
  for (let i = 0; i < nombreDePaires * 2; i++) {
    // et on insert la carte dans notre deck HTML
    deck.append(cartes[i])
  }
}

// au chargement de la page, on lance la partie
window.onload = commencerPartie()