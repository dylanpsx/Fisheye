import { displayModal, closeModal } from "../utils/displayCloseModal.js";
import { getPhotographerMedia } from "../utils/getPhotographerMedia.js";
import { getPhotographerInfo } from "../utils/getPhotographerInfo.js";

// Récupère l'objet d'informations sur le photographe
const photographerInfo = await getPhotographerInfo();
// Récupérer le tableau multimédia du photographe
const photographerMedia = await getPhotographerMedia();
// Initialise une variable qui contiendra l'identifiant actuel du média lightbox
let currentLightboxMediaId = 0;

export async function renderLightBoxMedia(mediaId) {
    // Récupère l'objet média pour l'identifiant média spécifié
    const mediaObject = await photographerMedia.find(
        (media) => media.id == mediaId
    );

    // Met à jour la variable currentMediaId avec l'identifiant multimédia actuel de la lightbox
    currentLightboxMediaId = mediaId;

    // Déstructuration de l'objet média pour extraire ses propriétés
    const { title, photographerId, image, video } = mediaObject;

    // Récupère l'élément lightboxMedia
    const lightboxMedia = document.getElementById("lightboxMedia");

    // Crée l'élément figcaption
    const figcaption = document.createElement("figcaption");
    figcaption.className = "lightbox-caption";
    figcaption.textContent = title;

    // Si le média est une image, crée et ajoute l'élément img à l'élément lightboxMedia
    if (image) {
        const img = document.createElement("img");
        img.className = "lightbox-img";
        img.src = `assets/images/${photographerId}/${image}`;
        img.alt = title;

        // Supprime tous les enfants de lightboxMedia avant d'ajouter le nouvel élément
        lightboxMedia.innerHTML = "";
        lightboxMedia.appendChild(img);
        lightboxMedia.appendChild(figcaption);
    }

    // Si le média est une vidéo, crée et ajoute l'élément video à l'élément lightboxMedia
    if (video) {
        const videoElement = document.createElement("video");
        videoElement.className = "lightbox-video";
        videoElement.title = title;
        videoElement.controls = true;

        const source = document.createElement("source");
        source.src = `assets/images/${photographerId}/${video}`;
        source.type = "video/mp4";

        // Supprime tous les enfants de lightboxMedia avant d'ajouter le nouvel élément
        lightboxMedia.innerHTML = "";
        videoElement.appendChild(source);
        lightboxMedia.appendChild(videoElement);
        lightboxMedia.appendChild(figcaption);
    }
  }

export async function renderPhotographFooter(object) {
    // Déstructuration de l'objet info photographe pour extraire le prix du photographe
    const { price } = object;
  
    // Calcule le nombre total de likes médiatiques et le stocke dans une variable
    const mediaLikeCount = document.querySelectorAll(".media-like-count");
    let totalMediaLikeCount = 0;
  
    mediaLikeCount.forEach((media) => {
      totalMediaLikeCount += Number(media.textContent);
    });
  
    // Crée l'élément aside pour la section de pied de page
    const footerContainer = document.createElement("div");
    footerContainer.className = "footer-container";
  
    // Crée l'élément span pour afficher le nombre total de likes médiatiques
    const totalLikesSpan = document.createElement("span");
    totalLikesSpan.className = "footer-likes";
    totalLikesSpan.id = "totalLikesCount";
    totalLikesSpan.textContent = totalMediaLikeCount;
  
    // Crée l'icône de cœur
    const heartIcon = document.createElement("i");
    heartIcon.className = "fa-solid fa-heart";
  
    // Ajoute le span et l'icône à la div
    footerContainer.appendChild(totalLikesSpan);
    footerContainer.appendChild(heartIcon);
  
    // Crée l'élément p pour afficher le prix du photographe
    const priceParagraph = document.createElement("p");
    priceParagraph.textContent = `${price} € / jour`;
  
    // Crée l'élément aside pour la section de pied de page
    const photographFooter = document.createElement("aside");
    photographFooter.className = "footer";
  
    // Ajoute la div et le paragraphe à l'élément aside
    photographFooter.appendChild(footerContainer);
    photographFooter.appendChild(priceParagraph);
  
    // Ajoute la section de pied de page à l'élément de pied de page
    const footerEl = document.querySelector("footer");
    footerEl.innerHTML = ""; // Vide le contenu existant
    footerEl.appendChild(photographFooter);
  }

export function nextLightBoxMedia() {
    // Recherche l'index de l'élément multimédia actuel dans le tableau PhotographeMedia
    const currentIndex = photographerMedia.findIndex(
        (media) => media.id == currentLightboxMediaId
    );

    // Si l'élément multimédia actuel n'est pas le dernier élément du tableau, affiche l'élément suivant
    if (currentIndex < photographerMedia.length - 1) {
        const nextMediaId = photographerMedia[currentIndex + 1].id;
        renderLightBoxMedia(nextMediaId);
        // Sinon, affiche le premier élément du tableau
    } else {
        const nextMediaId = photographerMedia[0].id;
        renderLightBoxMedia(nextMediaId);
    }
  }
  
export function previousLightBoxMedia() {
    // Recherche l'index de l'élément multimédia actuel dans le tableau PhotographeMedia
    const currentIndex = photographerMedia.findIndex(
        (media) => media.id == currentLightboxMediaId
    );

    // Si l'élément multimédia actuel n'est pas le premier élément du tableau, affiche l'élément précédent
    if (currentIndex > 0) {
        const previousMediaId = photographerMedia[currentIndex - 1].id;
        renderLightBoxMedia(previousMediaId);
        // Sinon, affiche le dernier élément du tableau
    } else {
        const previousMediaId = photographerMedia[photographerMedia.length - 1].id;
        renderLightBoxMedia(previousMediaId);
    }
  }
  
export function renderLikes() {
    // Récupère le média comme l'élément span
    const mediaLikeSpanEl = this.parentNode.firstElementChild;

    // Récupère le média comme élément d'icône
    const mediaLikeIconEl = this.firstElementChild;

    if (mediaLikeIconEl.classList.contains("fa-regular")) {
        // Convertit un média comme le contenu span en un nombre et le stocke en tant que variable mediaLikeCount
        let mediaLikeCount = Number(mediaLikeSpanEl.textContent);

        // Incrémente la variable mediaLikeCount
        mediaLikeCount++;

        // Définit la valeur mediaLikeCount car les médias aiment le nouveau contenu de l'élément span
        mediaLikeSpanEl.textContent = mediaLikeCount;

        // Render the photographer footer to recalculate the total likes count
        renderPhotographFooter(photographerInfo);

        // Remplace la classe fa-regular par la classe fa-solid
        mediaLikeIconEl.classList.replace("fa-regular", "fa-solid");
    } else if (mediaLikeIconEl.classList.contains("fa-solid")) {
        // Convertit un média comme le contenu span en un nombre et le stocke en tant que variable mediaLikeCount
        let mediaLikeCount = Number(mediaLikeSpanEl.textContent);

        // Diminue la variable mediaLikeCount
        mediaLikeCount--;

        // Définit la valeur mediaLikeCount car les médias aiment le nouveau contenu de l'élément span
        mediaLikeSpanEl.textContent = mediaLikeCount;

        // Affiche le pied de page du photographe pour recalculer le nombre total de likes
        renderPhotographFooter(photographerInfo);

        // Remplace le fa-solid par la classe fa-regular
        mediaLikeIconEl.classList.replace("fa-solid", "fa-regular");
    }
  }
  
export function addLightBoxEventListeners() {
    // Ajoute un écouteur d'événement à chaque bouton de la carte multimédia pour ouvrir la lightbox au clic
    const mediaCardButtons = document.querySelectorAll(".media-card-button");
    mediaCardButtons.forEach((card) => {
        card.addEventListener("click", () => {
        const mediaId = card.parentElement.id;
        renderLightBoxMedia(mediaId);
        displayModal("lightboxModal");
        });
    });

    // Ajoute un écouteur d'événement à chaque bouton de type carte multimédia pour exécuter la fonction renderLikes au clic
    const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
    mediaCardLikeButtons.forEach((button) => {
        button.addEventListener("click", renderLikes);
    });

    // Ajoute un écouteur d'événement au bouton de fermeture dans la lightbox pour la fermer au clic
    const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
    lightboxCloseBtn.addEventListener("click", () => {
        closeModal("lightboxModal");
    });

    // Ajoute un écouteur d'événement au bouton précédent dans la lightbox pour passer au média précédent au clic
    const previousBtn = document.getElementById("lightboxPreviousBtn");
    previousBtn.addEventListener("click", previousLightBoxMedia);

    // Ajoute un écouteur d'événement au bouton suivant dans la lightbox pour passer au média suivant au clic
    const nextBtn = document.getElementById("lightboxNextBtn");
    nextBtn.addEventListener("click", nextLightBoxMedia);


    // ------ Code pour la navigation par le clavier 
    // Ajoute un écouteur d'événement à la page entier pour passer au média précédent/suivant en appuyant sur les touches fléchées gauche/droite du clavier
    document.addEventListener("keydown", (event) => {
        // Recupère l'élément lightboxModal
        const lightboxModal = document.getElementById("lightboxModal");

        // Si la lightbox est ouverte et que la touche fléchée gauche est enfoncée, appel de la fonction previousLightBoxMedia
        if (lightboxModal.open && event.key === "ArrowLeft") {
        previousLightBoxMedia();
        }

        // Si la lightbox est ouvert et que la touche fléchée droite est enfoncée, appel de la fonction nextLightBoxMedia
        if (lightboxModal.open && event.key === "ArrowRight") {
        nextLightBoxMedia();
        }
    });

    // Ajoute un écouteur d'événement au modal contact et lightbox pour la fermer en appuyant sur ESC
    document.addEventListener("keydown", (event) => {
        // Si la lightbox est ouvert et que la touche ESC est enfoncée, appel de la fonction closeModal
        const lightboxModal = document.getElementById("lightboxModal");
        if (lightboxModal.open && event.key === "Escape") {
        closeModal("lightboxModal");
        }

        // Si contactModal est ouvert et que la touche ESC est enfoncée, appel de la fonction closeModal
        const contactModal = document.getElementById("contactModal");
        if (contactModal.open && event.key === "Escape") {
        closeModal("contactModal");
        }
    });
  }
  