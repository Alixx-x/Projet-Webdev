const points = {
  A: { x: 120, y: 200 },
  B: { x: 180, y: 170 },
  C: { x: 265, y: 135 },
  D: { x: 190, y: 208 },
  E: { x: 250, y: 240 },
  F: { x: 310, y: 260 },
  G: { x: 330, y: 270 },
  H: { x: 352, y: 283 },
  I: { x: 393, y: 296 },
  J: { x: 423, y: 293 },
  K: { x: 436, y: 309 },
  L: { x: 481, y: 274 },
  M: { x: 448, y: 244 },
  N: { x: 392, y: 226 },
  O: { x: 541, y: 279 },
  P: { x: 589, y: 273 },
  Q: { x: 635, y: 269 },
  R: { x: 686, y: 260 },
  S: { x: 692, y: 244 },
  T: { x: 715, y: 223 },
  U: { x: 701, y: 188 },
  V: { x: 695, y: 173 },
  X: { x: 647, y: 138 },
  Y: { x: 626, y: 146 },
  Z: { x: 607, y: 145 },
  AA: { x: 587, y: 155 },
  AB: { x: 567, y: 169 },
  AC: { x: 544, y: 168 },
  AD: { x: 524, y: 179 },
  AE: { x: 513, y: 178 },
  AF: { x: 514, y: 176 },
  AG: { x: 498, y: 183 },
  AH: { x: 489, y: 183 },
  AI: { x: 478, y: 198 },
  AJ: { x: 481, y: 203 },
  AK: { x: 507, y: 208 },
  AL: { x: 552, y: 210 },
  AM: { x: 586, y: 208 },
  AN: { x: 620, y: 210 },
  AO: { x: 635, y: 205 },
  AP: { x: 663, y: 188 },
  AQ: { x: 640, y: 229 },
  AR: { x: 631, y: 248 },
  AS: { x: 613, y: 261 },
  AT: { x: 591, y: 255 },
  AU: { x: 564, y: 256 },
  AV: { x: 557, y: 245 },
  AW: { x: 536, y: 243 },
  AX: { x: 501, y: 240 },
  AY: { x: 468, y: 179 },
  AZ: { x: 462, y: 159 },
  BA: { x: 467, y: 144 },
  BB: { x: 477, y: 136 },
  BC: { x: 508, y: 113 },
  BD: { x: 474, y: 223 },
  BE: { x: 451, y: 210 },
  BF: { x: 427, y: 205 },
  BG: { x: 414, y: 218 },
  BH: { x: 367, y: 236 },
  BI: { x: 349, y: 239 },
  BJ: { x: 337, y: 233 },
  BK: { x: 317, y: 210 },
  BL: { x: 322, y: 194 },
  BM: { x: 305, y: 190 },
  BN: { x: 287, y: 180 },
  BO: { x: 274, y: 158 },
  BP: { x: 352, y: 169 },
  BQ: { x: 377, y: 165 },
  BR: { x: 387, y: 158 },
  BS: { x: 401, y: 121 },
  BT: { x: 417, y: 191 },
  BU: { x: 398, y: 185 },
  BV: { x: 378, y: 185 },
  BW: { x: 437, y: 178 },
  BX: { x: 437, y: 158 },
  BY: { x: 447, y: 125 },
  BZ: { x: 424, y: 120 },
  CA: { x: 375, y: 103 },
  CB: { x: 363, y: 94 },
  CC: { x: 350, y: 90 },
  CD: { x: 373, y: 54 },
  CE: { x: 377, y: 43 },
  CF: { x: 362, y: 22 },
  CG: { x: 350, y: 9 },
  CH: { x: 312, y: 37 },
  CI: { x: 283, y: 57 },
  CJ: { x: 255, y: 63 },
  CK: { x: 237, y: 60 },
  CL: { x: 210, y: 77 },
  CM: { x: 196, y: 104 },
  CN: { x: 222, y: 123 },
  CO: { x: 250, y: 133 },
  CP: { x: 254, y: 129 },
  CQ: { x: 264, y: 129 },
  CR: { x: 269, y: 116 },
  CS: { x: 288, y: 118 },
  CT: { x: 302, y: 129 },
  CU: { x: 314, y: 129 },
  CV: { x: 348, y: 119 },
  CW: { x: 166, y: 151 },
  CX: { x: 218, y: 241 },
  CY: { x: 300, y: 270 },
  CZ: { x: 325, y: 291 },
  DA: { x: 342, y: 278 },
  DB: { x: 362, y: 320 },
  DC: { x: 397, y: 320 },
  DD: { x: 406, y: 294 },
  DE: { x: 418, y: 320 },
  DF: { x: 492, y: 275 },
  DG: { x: 91, y: 245 },
  DH: { x: 149, y: 229 },
  DI: { x: 81, y: 271 },
  DJ: { x: 195, y: 152 },
  DK: { x: 207, y: 157 },
};

// Connexions entre les nœuds (routes)
const manualRoutes = {
  A: ["DH", "DG", "B"],
  B: ["CW", "DJ", "DK", "D", "A"],
  C: ["DK", "BO"],
  D: ["E", "CX", "B"],
  E: ["F", "D"],
  F: ["G", "E"],
  G: ["F"],
  H: ["I"],
  I: ["H", "DD"],
  J: ["DD", "K", "L"],
  K: ["J", "DF", "DE"],
  L: ["J", "DF", "M"],
  M: ["L", "N"],
  N: ["M", "BG", "BH"],
  O: ["P", "DF"],
  P: ["O", "Q"],
  Q: ["P", "R", "AS"],
  R: ["Q", "S"],
  S: ["R", "T"],
  T: ["S", "U"],
  U: ["T", "AP", "V"],
  V: ["U", "X"],
  W: [],
  X: ["V", "Y"],
  Y: ["X", "Z"],
  Z: ["Y", "AA"],
  AA: ["Z", "AB"],
  AB: ["AA", "AC"],
  AC: ["AB", "AD"],
  AD: ["AC", "AE", "Watusi"],
  AE: ["AD", "AF"],
  AF: ["AE", "AG"],
  AG: ["AF", "AH"],
  AH: ["AI", "AG"],
  AI: ["AH", "AJ", "AY"],
  AJ: ["AI", "AK", "BD"],
  AK: ["AL", "AJ"],
  AL: ["AK", "AM"],
  AM: ["AN", "AL"],
  AN: ["AM", "AO"],
  AO: ["AP", "AN", "AQ"],
  AP: ["AO", "U"],
  AQ: ["AR", "AO"],
  AR: ["AQ", "AS"],
  AS: ["Q", "AR", "AT"],
  AT: ["AS", "AU"],
  AU: ["AT", "AV"],
  AV: ["AU", "AW"],
  AW: ["AV", "AX"],
  AX: ["AW", "BD"],
  AY: ["AI", "AZ"],
  AZ: ["BX", "AY", "BA"],
  BA: ["AZ", "BB"],
  BB: ["BC", "BY", "BA"],
  BC: ["BB"],
  BD: ["AX", "AJ", "BE"],
  BE: ["BD", "BF"],
  BF: ["BT", "BE", "BG"],
  BG: ["BF", "N"],
  BH: ["N", "BI"],
  BI: ["BH", "BJ"],
  BJ: ["BI", "BK"],
  BK: ["BL", "BJ"],
  BL: ["BP", "BM", "BK"],
  BM: ["BL", "BN"],
  BN: ["BM", "BO"],
  BO: ["BN", "C"],
  BP: ["BQ", "BV", "BL"],
  BQ: ["BP", "BR"],
  BR: ["BQ", "BS"],
  BS: ["BR", "BZ", "CA"],
  BT: ["BF", "BU"],
  BU: ["BT", "BV"],
  BV: ["BP", "BU"],
  BW: ["BX", "BT"],
  BX: ["BW", "AZ"],
  BY: ["BB", "BZ"],
  BZ: ["BY", "BS"],
  CA: ["BS", "CB", "CV"],
  CB: ["CA", "CC"],
  CC: ["CB", "CD"],
  CD: ["CC", "CE"],
  CE: ["CD", "CF"],
  CF: ["CE", "CG"],
  CG: ["CF", "CH"],
  CH: ["CG", "CI"],
  CI: ["CH", "CJ"],
  CJ: ["CI", "CK"],
  CK: ["CJ", "CL"],
  CL: ["CK", "CM"],
  CM: ["CL", "CN"],
  CN: ["CM", "CO"],
  CO: ["CN", "CP"],
  CP: ["CO", "CQ"],
  CQ: ["CR", "C", "CP"],
  CR: ["CQ", "CS"],
  CS: ["CT", "CR"],
  CT: ["CS", "CU"],
  CU: ["CV", "CT"],
  CV: ["CU", "CA"],
  CW: ["DJ", "B"],
  CX: ["D", "CY"],
  CY: ["CX", "CZ"],
  CZ: ["CY", "DB"],
  DA: ["G", "H"],
  DB: ["CZ", "DC"],
  DC: ["DB", "DD", "DE"],
  DD: ["DC", "I", "J"],
  DE: ["DC", "K"],
  DF: ["K", "O", "L"],
  DG: ["DI", "A"],
  DH: ["A"],
  DI: ["DG"],
  DJ: ["CW", "DK", "B"],
  DK: ["DJ", "C", "B"]
};
  
  // Enclos et leurs points de départ/arrivée sur les routes
const enclos = {
  "Entrée": "A",
  "Gare des cascades": "B",
  "Gare du plateau": "BP",
  "Lodge":"BO",
  "Bergerie des reptiles": "DG",
  "Café nomade": "I",
  "Restaurant de l'entrée": "DH",
  "Restaurant du plateau": "BK",
  "Tente pédagogique": "BX",
  "Vol d'oiseaux": "BC",
  "Âne de Provence": "U",
  "Âne de Somalie": "AC",
  "Antilope": "AQ",
  "Ara perroquet": "CW",
  "Autruche": "CH",
  "Binturong": "M",
  "Bison": "V",
  "Capucin": "BN",
  "Casoar": "CB",
  "Cerf": "O",
  "Chèvre naine": "H",
  "Chien des buissons": "AM",
  "Cigogne": "BA",
  "Coati": "CS",
  "Crocodile nain": "CD",
  "Daim": "AQ",
  "Dromadaire": "U",
  "Eléphant": "BV",
  "Émeu": "AO",
  "Fennec": "CR",
  "Flamant rose": "AA",
  "Gazelle": "CH",
  "Gibbon": "BN",
  "Girafe": "N",
  "Gnoul": "CK",
  "Grand Hocco": "CW",
  "Guépard": "CD",
  "Hippopotame": "BY",
  "Hyène": "BY",
  "Ibis": "AK",
  "Iguane": "DG",
  "Lion": "BS",
  "Lémurien": "H",
  "Loup à crinière": "BE",
  "Loup d'Europe": "T",
  "Loutre": "M",
  "Lynx": "AX",
  "Macaque Crabier": "O",
  "Marabout": "BA",
  "Mouflon": "DJ",
  "Mouton Noir": "Z",
  "Nandou": "AM",
  "Nilgaut": "AQ",
  "Oryx algazelle": "AD",
  "Oryx beisa": "CK",
  "Ouistiti": "BN",
  "Panthère": "DJ",
  "Panda roux": "G",
  "Pécari": "AL",
  "Porc-épic": "X",
  "Python": "DG",
  "Rhinocéros": "CK",
  "Saïmiri": "CS",
  "Serval": "AW",
  "Suricate": "CO",
  "Tamanoir": "AA",
  "Tamarin": "BN",
  "Tapir": "CV",
  "Tigre": "AS",
  "Tortue Clairières": "AK",
  "Tortue Vallon": "I",
  "Tortue Bergerie": "DG",
  "Varan de Komodo": "BK",
  "Vautour": "P",
  "Wallaby": "AO",
  "Watusi": "AD",
  "Yack": "Z",
  "Zèbre": "BX"
};


// Générer les routes avec les poids calculés automatiquement
function genererRoutesAvecPoids() {
  const routes = {};
  Object.keys(manualRoutes).forEach(start => {
    routes[start] = {};
    manualRoutes[start].forEach(end => {
      const startPoint = points[start];
      const endPoint = points[end];
      if (startPoint && endPoint) {
        const dx = endPoint.x - startPoint.x;
        const dy = endPoint.y - startPoint.y;
        routes[start][end] = Math.sqrt(dx * dx + dy * dy);
      }
    });
  });
  return routes;
}

// Routes avec poids générés
const routes = genererRoutesAvecPoids();

// Dernier sélecteur cliqué
let dernierSelecteurClique = "start";

// Fonction pour afficher un point
function afficherPoint(ctx, pointKey, label, color) {
  const point = points[pointKey];
  if (!point) return;
  ctx.beginPath();
  ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.font = "10px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(label, point.x + 8, point.y - 8);
}

// Fonction pour mettre à jour l'affichage des points sélectionnés
function mettreAJourCanvas() {
  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const startSelect = document.getElementById("start");
  const endSelect = document.getElementById("end");
  const startEnclos = startSelect.value;
  const endEnclos = endSelect.value;

  if (startEnclos) {
    const startPoint = enclos[startEnclos];
    afficherPoint(ctx, startPoint, "Départ", "green");
  }

  if (endEnclos) {
    const endPoint = enclos[endEnclos];
    afficherPoint(ctx, endPoint, "Arrivée", "red");
  }
}

// Fonction pour trouver le point le plus proche
function trouverPointLePlusProche(x, y) {
  let pointLePlusProche = null;
  let distanceMin = Infinity;

  Object.keys(points).forEach(point => {
    const dx = points[point].x - x;
    const dy = points[point].y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < distanceMin) {
      distanceMin = distance;
      pointLePlusProche = point;
    }
  });

  return pointLePlusProche;
}

// Fonction pour gérer le clic sur le canvas
function ajouterGestionnaireDeClic() {
  const canvas = document.getElementById("mapCanvas");

  canvas.addEventListener("click", event => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    const pointLePlusProche = trouverPointLePlusProche(x, y);

    if (pointLePlusProche) {
      const selectElement = document.getElementById(dernierSelecteurClique);
      selectElement.value = Object.keys(enclos).find(
        key => enclos[key] === pointLePlusProche
      );
      mettreAJourCanvas();
    }
  });
}

// Fonction pour tracer le chemin le plus court
function tracerChemin() {
  const startSelect = document.getElementById("start");
  const endSelect = document.getElementById("end");
  const startEnclos = startSelect.value;
  const endEnclos = endSelect.value;

  if (!startEnclos || !endEnclos) {
    alert("Veuillez sélectionner un enclos de départ et un enclos d'arrivée.");
    return;
  }

  const start = enclos[startEnclos];
  const end = enclos[endEnclos];

  if (!start || !end) {
    alert("Les points sélectionnés ne sont pas valides.");
    return;
  }

  const result = dijkstra(routes, start, end);
  if (result.path.length === 0 || result.distance === Infinity) {
    alert("Aucun chemin trouvé.");
    return;
  }

  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Tracer le chemin
  ctx.beginPath();
  result.path.forEach((point, index) => {
    const { x, y } = points[point];
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Réafficher les points de départ et d'arrivée
  afficherPoint(ctx, start, "Départ", "green");
  afficherPoint(ctx, end, "Arrivée", "blue");

  console.log("Chemin trouvé :", result.path);
  console.log("Distance totale :", result.distance);
}

// Fonction pour l'algorithme de Dijkstra
function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const queue = new Set(Object.keys(graph));

  // Initialisation des distances
  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });
  distances[start] = 0;

  while (queue.size > 0) {
    const current = Array.from(queue).reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode
    );

    if (current === end) break;

    queue.delete(current);

    Object.keys(graph[current]).forEach(neighbor => {
      if (!queue.has(neighbor)) return;
      const newDist = distances[current] + graph[current][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = current;
      }
    });
  }

  const path = [];
  let currentNode = end;
  while (currentNode) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return { path, distance: distances[end] };
}

// Initialisation des sélecteurs
function initialiserInterface() {
  const startSelect = document.getElementById("start");
  const endSelect = document.getElementById("end");

  Object.keys(enclos).forEach(enclosName => {
    startSelect.add(new Option(enclosName, enclosName));
    endSelect.add(new Option(enclosName, enclosName));
  });

  startSelect.addEventListener("click", () => {
    dernierSelecteurClique = "start";
  });

  endSelect.addEventListener("click", () => {
    dernierSelecteurClique = "end";
  });

  startSelect.addEventListener("change", mettreAJourCanvas);
  endSelect.addEventListener("change", mettreAJourCanvas);
}

// Charger l'interface et le canvas
window.onload = () => {
  initialiserInterface();
  mettreAJourCanvas();
  ajouterGestionnaireDeClic();
};

/*
// Fonction pour afficher les points et les chemins sur le canvas
function afficherPointsEtChemins() {
  // Récupération ou création du canvas
  let canvas = document.getElementById("mapCanvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "mapCanvas";
    canvas.width = 800;
    canvas.height = 400;
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");

  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Dessiner les chemins (routes)
  Object.keys(routes).forEach(start => {
    const startPoint = points[start];
    if (startPoint) {
      Object.keys(routes[start]).forEach(end => {
        const endPoint = points[end];
        if (endPoint) {
          ctx.beginPath();
          ctx.moveTo(startPoint.x, startPoint.y);
          ctx.lineTo(endPoint.x, endPoint.y);
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    }
  });

  // 2. Dessiner les points (nœuds)
  Object.keys(points).forEach(point => {
    const { x, y } = points[point];
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI); // Rayon de 5 pixels
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(point, x + 4, y - 4); // Décalage pour les labels
  });
}

// Appeler la fonction lors du chargement de la page
window.onload = afficherPointsEtChemins;

/*
// Tableau pour stocker les points collectés
const pointsCollectes = [];

// Gestionnaire d'événements pour cliquer sur le canvas
const canvas = document.getElementById("mapCanvas");
canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect(); // Position et taille du canvas
    const scaleX = canvas.width / rect.width;   // Échelle horizontale
    const scaleY = canvas.height / rect.height; // Échelle verticale

    // Calcul précis des coordonnées cliquées
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);

    // Ajouter les coordonnées au tableau
    pointsCollectes.push({ x, y });

    // Afficher les coordonnées dans la console
    console.log(`Point ${pointsCollectes.length}: { x: ${x}, y: ${y} }`);

    // Dessiner le point cliqué pour un repère visuel
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI); // Cercle de rayon 5
    ctx.fillStyle = "green";
    ctx.fill();

    // Afficher le label du point (ex: P1, P2...)
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`P${pointsCollectes.length}`, x + 8, y - 8);
});*/



  