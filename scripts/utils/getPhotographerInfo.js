import { fetchJsonData } from "./fetchJsonData.js";

// Récupère les informations d'un photographe à partir des données JSON par son ID
export async function getPhotographerInfo() {
  // Récupère l'objet photographe à partir des données JSON
  const { photographers } = await fetchJsonData();
  // Récupère l'identifiant du photographe à partir des paramètres de l'URL
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get("id"));
  // Recherche l'objet photographe dans le tableau photographes avec l'ID correspondant
  return photographers.find(
    (photographer) => photographer.id === photographerId
  );
}