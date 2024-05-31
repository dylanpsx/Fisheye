import { displayModal, closeModal } from "../utils/displayCloseModal.js";

export function photographerFactory(data) {
  // Déstructure l'objet de données pour extraire ses propriétés
  const { name, id, city, country, tagline, price, portrait } = data;

  // Création du chemin pour l'image portrait
  const picture = `assets/photographers/${portrait}`;

  // Défini une fonction qui renvoi un élément DOM pour la carte du photographe
  function getPhotographerCardDOM() {
    // Créer un élément article pour contenir la fiche du photographe
    const article = document.createElement("article");
    article.className += "photographer-card";

    // Créer un élément de lien pointant vers le portfolio du photographe
    const photographerCardLink = document.createElement("a");
    photographerCardLink.className += "photographer-card-link";
    photographerCardLink.setAttribute("href", `photographer.html?id=${id}`);
    photographerCardLink.setAttribute(
      "aria-label",
      `Lien vers le portfolio de ${name}`
    );

    // Créer un élément d'image pour le portrait du photographe
    const photographerImg = document.createElement("img");
    photographerImg.className += "photographer-img";
    photographerImg.setAttribute("src", picture);
    photographerImg.setAttribute("alt", `Photo de ${name}`);

    // Créer un élément de titre pour le nom du photographe
    const photographerName = document.createElement("h2");
    photographerName.className += "photographer-name";
    photographerName.textContent = name;

    // Créer un élément de paragraphe pour l'emplacement
    const photographerLocation = document.createElement("p");
    photographerLocation.className += "photographer-location";
    photographerLocation.textContent = `${city}, ${country}`;

    // Créer un élément de paragraphe pour la bio
    const photographerTagline = document.createElement("p");
    photographerTagline.className += "photographer-tagline";
    photographerTagline.textContent = tagline;

    // Créer un élément de paragraphe pour le tarif
    const photographerRate = document.createElement("p");
    photographerRate.className += "photographer-rate";
    photographerRate.textContent = `${price} € / jour`;

    // Ajoute l'image et le titre à l'élément de lien
    photographerCardLink.appendChild(photographerImg);
    photographerCardLink.appendChild(photographerName);

    // Ajoute le lien, l'emplacement, la bio et le tarif à l'élément article
    article.appendChild(photographerCardLink);
    article.appendChild(photographerLocation);
    article.appendChild(photographerTagline);
    article.appendChild(photographerRate);

    // Renvoie l'élément article
    return article;
  }

  // Définir la fonction renderPhotographHeader pour l'affichage de l'en-tête du photographe
  function renderPhotographHeader(photographerInfo) {
    // Déstructuration de l'objet info photographe à extraire pour extraire ses propriétés
    const { name, city, country, tagline, portrait } = photographerInfo;

    // Crée les éléments DOM pour la section d'en-tête
    const photographHeader = document.createElement("section");
    photographHeader.className = "photograph-header";

    const photographInfo = document.createElement("div");
    photographInfo.className = "photograph-info";

    const nameElement = document.createElement("h1");
    nameElement.className = "photograph-name";
    nameElement.textContent = name;

    const locationElement = document.createElement("p");
    locationElement.className = "photograph-location";
    locationElement.textContent = `${city}, ${country}`;

    const taglineElement = document.createElement("p");
    taglineElement.className = "photograph-tagline";
    taglineElement.textContent = tagline;

    const contactButton = document.createElement("button");
    contactButton.className = "button";
    contactButton.id = "contactBtn";
    contactButton.setAttribute(
      "aria-label",
      "Bouton d'ouverture du modal de contact"
    );
    contactButton.textContent = "Contactez-moi";
    contactButton.addEventListener("click", () => {
      displayModal("contactModal");
    });

    const imgElement = document.createElement("img");
    imgElement.className = "photograph-img";
    imgElement.src = `assets/photographers/${portrait}`;
    imgElement.alt = `Photo de ${name}`;

    // Ajoute les éléments créés à la section d'en-tête
    photographInfo.appendChild(nameElement);
    photographInfo.appendChild(locationElement);
    photographInfo.appendChild(taglineElement);

    photographHeader.appendChild(photographInfo);
    photographHeader.appendChild(contactButton);
    photographHeader.appendChild(imgElement);

    // Ajoute la section d'en-tête à l'élément principal
    const mainEl = document.querySelector("main");
    mainEl.appendChild(photographHeader);
  }

  // Renvoie un objet avec les propriétés de nom et d'image et la fonction getPhotographerCardDOM
  return { name, picture, getPhotographerCardDOM, renderPhotographHeader };
}
