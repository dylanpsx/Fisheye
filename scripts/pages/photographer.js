import { mediaFactory } from "../factories/mediaFactory.js";
import { photographerFactory } from "../factories/photographerFactory.js"
import { getPhotographerInfo } from "../utils/getPhotographerInfo.js";
import { getPhotographerMedia } from "../utils/getPhotographerMedia.js";
import { displayModal, closeModal } from "../utils/displayCloseModal.js";
import { renderLightBoxMedia, renderPhotographFooter, nextLightBoxMedia, previousLightBoxMedia, renderLikes, addLightBoxEventListeners } from "../utils/lightbox.js";

// // Récupère l'objet d'informations sur le photographe
const photographerInfo = await getPhotographerInfo();

// Récupérer le tableau multimédia du photographe
const photographerMedia = await getPhotographerMedia();

function renderDropdown() {
  // Crée l'élément select pour le menu déroulant
  const dropdownMenu = document.createElement("select");
  dropdownMenu.className = "dropdown";
  dropdownMenu.id = "dropdownMenu";
  dropdownMenu.setAttribute("aria-label", "Menu de tri");

  // Crée les options du menu déroulant
  const defaultOption = document.createElement("option");
  defaultOption.className = "dropdown-options";
  defaultOption.value = "";
  defaultOption.textContent = "Trier par";

  const popularityOption = document.createElement("option");
  popularityOption.className = "dropdown-options";
  popularityOption.value = "Popularité";
  popularityOption.textContent = "Popularité";

  const dateOption = document.createElement("option");
  dateOption.className = "dropdown-options";
  dateOption.value = "Date";
  dateOption.textContent = "Date";

  const titleOption = document.createElement("option");
  titleOption.className = "dropdown-options";
  titleOption.value = "Titre";
  titleOption.textContent = "Titre";

  // Ajoute les options à l'élément select
  dropdownMenu.appendChild(defaultOption);
  dropdownMenu.appendChild(popularityOption);
  dropdownMenu.appendChild(dateOption);
  dropdownMenu.appendChild(titleOption);

  // Ajoute le menu déroulant à l'élément principal
  const mainEl = document.querySelector("main");
  mainEl.appendChild(dropdownMenu);
}

function renderMediaSection(array) {
  // Crée un nouvel élément div pour contenir les cartes multimédias
  const mediaSection = document.createElement("div");
  mediaSection.className = "media-section";

  // Ajoute la section média à l'élément principal
  const mainEl = document.querySelector("main");
  mainEl.append(mediaSection);

  // Parcours chaque élément multimédia du tableau
  array.forEach((media) => {
    // Crée un objet modèle de carte multimédia à partir du tableau multimédia
    const mediaCardModel = mediaFactory(media);
    // Récupère l'élément DOM pour la carte multimédia
    const mediaCardDOM = mediaCardModel.getMediaCardDOM();
    // Ajoute la carte à la section média
    mediaSection.append(mediaCardDOM);
  });
}

function insertPhotographName(object) {
  // Déstructuration de l'objet info photographe pour extraire la propriété name
  const { name } = object;

  // Crée l'élément h2 pour le titre modal
  const modalTitle = document.createElement("h2");
  modalTitle.className = "modal-title";
  modalTitle.innerHTML = `Contactez-moi<br>${name}`;

  // Sélectionne l'élément modalTitle existant
  const existingModalTitle = document.querySelector(".modal-title");

  // Remplace l'élément modalTitle existant par le nouveau
  if (existingModalTitle) {
    existingModalTitle.replaceWith(modalTitle);
  } else {
    // Ajoute le nom du photographe à l'élément modalTitle
    const modalContent = document.querySelector(".modal-content");
    modalContent.insertBefore(modalTitle, modalContent.firstChild);
  }
}

function validateModalForm(event) {
  // Empêche la soumission du formulaire par défaut
  event.preventDefault();

  // Récupère les éléments du formulaire modal et ses entrées
  const modalForm = document.getElementById("modalForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // Vérifiez si les données d'entrée du formulaire sont valides et console.log les données en tant qu'objet
  if (modalForm.checkValidity()) {
    console.log({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      message: message.value,
    });
    modalForm.reset();
    closeModal("contactModal");
  }
}

// J'ai déclarée la fonction comme asynchrone car elle contient des opérations de tri et est utilisé comme gestionnaire d'événements pour l'élément dans le DOM
async function sortMediaSection() {
  const selectedOption = this.value;
  // this.value récupére la valeur de l'option sélectionnée dans le DOM, cette valeur est utilisé pour déterminer le critère de tri sélectionné

  // Selon l'option sélectionnée le tableau est trié utilisant la méthode "sort()" avec une fonction de comparaison appropriée
  // Le tri est effectué de manière asynchrone avec "await"

  // Trie le tableau PhotographeMedia à l'aide de la clé likes si l'option sélectionnée est "Popularité"
  if (selectedOption == "Popularité") {
    await photographerMedia.sort((a, b) => {
      return b.likes - a.likes;
    });
  }

  // Trie le tableau PhotographeMedia à l'aide de la clé date si l'option sélectionnée est "Date"
  if (selectedOption == "Date") {
    await photographerMedia.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  // Trie le tableau PhotographeMedia à l'aide de la clé title si l'option sélectionnée est "Titre"
  if (selectedOption == "Titre") {
    await photographerMedia.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  // Supprime la section média existante
  // Je sélectionne la section média dans le DOM à l'aide de la classe "media-section" et la supprime
  const mediaSection = document.querySelector(".media-section");
  mediaSection.remove();

  // Affiche la section de l'article média à l'aide du tableau PhotographeMedia trié
  renderMediaSection(photographerMedia);

  // Ajoute un écouteur d'événement à chaque bouton de la carte multimédia pour ouvrir la lightbox modale au clic
  const mediaCardButtons = document.querySelectorAll(".media-card-button");
  mediaCardButtons.forEach((card) => {
    card.addEventListener("click", () => {
      const mediaId = card.parentElement.id;
      renderLightBoxMedia(mediaId);
      displayModal("lightboxModal");
    });
  });

  // Ajoute un écouteur d'événement à chaque bouton de type carte multimédia pour exécuter la fonction renderLikes en un clic
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", renderLikes);
  });
}

function addEventListeners() {
  // Ajoute un écouteur d'événement au menu déroulant pour trier la section multimédia en cas de changement
  const dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.addEventListener("change", sortMediaSection);

  // Ajoute un écouteur d'événement au bouton de contact pour ouvrir la modal de contact au clic
  const contactBtn = document.getElementById("contactBtn");
  contactBtn.addEventListener("click", () => {
    displayModal("contactModal");
  });

  // Ajoute un écouteur d'événement au bouton de fermeture de la modal de contact pour la fermer au clic
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  modalCloseBtn.addEventListener("click", () => {
    closeModal("contactModal");
  });

  // Ajoute un écouteur d'événement pour valider le formulaire modal de contact lors de la soumission
  const modalForm = document.getElementById("modalForm");
  modalForm.addEventListener("submit", validateModalForm);

  addLightBoxEventListeners();
}

async function renderPhotographMediaPage() {
  // Utilisez photographerFactory pour obtenir la fonction renderPhotographerHeader
  const photographerFactoryObj = photographerFactory({}, photographerInfo);
  const renderPhotographHeader = photographerFactoryObj.renderPhotographHeader;
  // Affiche la section d'en-tête de la page avec le nom, l'emplacement, le slogan et le portrait du photographe
  await renderPhotographHeader(photographerInfo);

  // Affiche le menu déroulant
  await renderDropdown();

  // Affiche la section média de la page avec des cartes pour chaque élément multimédia
  await renderMediaSection(photographerMedia);

  // Affiche la section de pied de page avec les likes et le tarif du photographe
   renderPhotographFooter(photographerInfo);

  // Insére le nom du photographe dans le titre modal
  await insertPhotographName(photographerInfo);

  // Ajoute tous les écouteurs d'événements
  addEventListeners();
}

// Rend la page média du photographe avec tous les éléments
renderPhotographMediaPage();
