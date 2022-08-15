
export function closePopup(popup) {
    popup.classList.remove("popup_true");
    document.removeEventListener("keydown", closeWithEscape);
}

export function openPopup(popup) {
    popup.classList.add("popup_true");
    document.addEventListener("keydown", closeWithEscape);
}

export function closeWithEscape(event) {
    if (event.key === "Escape") {
        const openedPopup = document.querySelector(".popup_true");
        closePopup(openedPopup);
    }
}

export function togglePopupCloseEventListeners() {
    const allPopups = [...document.querySelectorAll(".popup")];
    allPopups.forEach((popup) => {
        popup.addEventListener("click", (event) => {
            if (event.target.classList.contains("popup")) {
                closePopup(popup);
            }
        });
    });
}