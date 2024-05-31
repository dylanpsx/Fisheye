export function mediaFactory(data) {
  // Déstructure l'objet de données pour extraire ses propriétés
  const { id, photographerId, title, image, video, likes } = data;

  // Défini une fonction qui renvoie un élément DOM pour la carte multimédia
  function getMediaCardDOM() {
    // Crée un élément article pour contenir la carte multimédia
    const article = document.createElement("article");
    article.classList.add("media-card");
    article.id = id;

    // Crée un bouton pour ouvrir la lightbox 
    const button = document.createElement("button");
    button.classList.add("media-card-button");
    button.setAttribute("aria-label", "Bouton d'ouverture de lightbox");

    // Crée un élément image si le média est une image
    if (image) {
      const img = document.createElement("img");
      img.classList.add("media-card-img");
      img.src = `assets/images/${photographerId}/${image}`;
      img.alt = title;

      // Ajoute l'image au bouton
      button.appendChild(img);
    }

    // Crée un élément vidéo si le média est une vidéo
    if (video) {
      const videoElement = document.createElement("video");
      videoElement.classList.add("media-card-video");
      videoElement.title = title;

      const source = document.createElement("source");
      source.src = `assets/images/${photographerId}/${video}`;
      source.type = "video/mp4";

      // Ajoute la source au vidéo
      videoElement.appendChild(source);

      // Ajoute la vidéo au bouton
      button.appendChild(videoElement);
    }

    // Crée une section pour les informations sur le média
    const infoSection = document.createElement("section");
    infoSection.classList.add("media-card-info");

    // Crée un titre h2
    const titleElement = document.createElement("h2");
    titleElement.classList.add("media-card-title");
    titleElement.textContent = title;

    // Crée un conteneur pour les likes
    const likeContainer = document.createElement("div");
    likeContainer.classList.add("media-like-container");

    // Crée un span pour afficher le nombre de likes
    const likeCount = document.createElement("span");
    likeCount.classList.add("media-like-count");
    likeCount.textContent = likes;

    // Crée un bouton de likes
    const likeButton = document.createElement("button");
    likeButton.classList.add("media-like-button");
    likeButton.setAttribute("aria-label", "Bouton de likes");

    // Crée une icône de cœur
    const heartIcon = document.createElement("i");
    heartIcon.classList.add("media-like-logo", "fa-heart", "fa-regular");

    // Ajoute l'icône de cœur au bouton de likes
    likeButton.appendChild(heartIcon);

    // Ajoute le span et le bouton de likes au conteneur de likes
    likeContainer.appendChild(likeCount);
    likeContainer.appendChild(likeButton);

    // Ajoute le titre, le conteneur de likes et le bouton au infoSection
    infoSection.appendChild(titleElement);
    infoSection.appendChild(likeContainer);

    // Ajoute le bouton et infoSection à l'article
    article.appendChild(button);
    article.appendChild(infoSection);

    // Renvoie l'élément article
    return article;
  }

  // Renvoie un objet avec la fonction getMediaCardDOM et renderPhotographHeader
  return { getMediaCardDOM };
}
