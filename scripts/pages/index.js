import { photographerFactory } from "../factories/photographerFactory.js";
import { fetchJsonData } from "../utils/fetchJsonData.js";

// Génère le HTML pour chaque photographe
async function generatePhotographerHtml(photographers) {
  // Récupère l'élément de section qui contiendra les cartes du photographe
  const photographersSection = document.querySelector(".photographer-section");

  // Parcours le tableau des photographes et créer une carte pour chacun
  photographers.forEach((photographer) => {
    // Créer un objet modèle photographe à partir des données
    const photographerModel = photographerFactory(photographer);
    // Obtiens l'élément DOM pour la carte du photographe
    const userCardDOM = photographerModel.getPhotographerCardDOM();
    // Ajoute la fiche à la section photographes
    photographersSection.appendChild(userCardDOM);
  });
}

// Récupère les données du photographe et restitue les cartes
async function renderPhotographerProfiles() {
  // Obtiens les données pour les photographes
  const { photographers } = await fetchJsonData();
  // Génère le HTML pour les fiches du photographe
  generatePhotographerHtml(photographers);
}

// Rend tous les profils de photographe
renderPhotographerProfiles();