export function displayModal(modalName) {
    // Récupère l'élément modal
    const modal = document.getElementById(modalName);
    // Récupère les éléments d'en-tête, principal et de pied de page
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
  
    // Affiche la modal
    modal.showModal();
    modal.style.display = "flex";
    // Défini l'attribut aria-hidden de la modal sur false pour indiquer qu'il est visible
    modal.setAttribute("aria-hidden", "false");
    // Défini l'attribut aria-hidden des éléments header, main et footer sur true pour indiquer qu'ils sont masqués
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    footer.setAttribute("aria-hidden", "true");
  }
  
  export function closeModal(modalName) {
    // Récupère l'élément modal
    const modal = document.getElementById(modalName);
    // Récupère les éléments d'en-tête, principal et de pied de page
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
  
    // Ferme la modal
    modal.close();
    modal.style.display = "none";
    // Défini l'attribut aria-hidden de la modal sur true pour indiquer qu'il est masqué
    modal.setAttribute("aria-hidden", "true");
    // Défini l'attribut aria-hidden des éléments header, main et footer sur false pour indiquer qu'ils sont visibles
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    footer.setAttribute("aria-hidden", "false");
  }