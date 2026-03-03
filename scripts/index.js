const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "A outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const newPostFormModal = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewNameEl = previewModal.querySelector(".modal__caption");

const modalContainer = document.querySelector(".modal__container");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardTitleEl.textContent = data.name;
  cardImageEl.alt = data.name;
  cardImageEl.src = data.link;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-butn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-butn_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewNameEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings,
  );
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal(editProfileModal);
  }
});

editProfileModal.addEventListener("click", function (event) {
  const editProfileContainer =
    editProfileModal.querySelector(".modal__container");
  const clickedOutside = !editProfileContainer.contains(event.target);
  if (clickedOutside && event.target !== editProfileBtn) {
    closeModal(editProfileModal);
  }
});

newPostBtn.addEventListener("click", function () {
  resetValidation(
    newPostFormModal,
    [newPostLinkInput, newPostCaptionInput],
    settings,
  );
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal(newPostModal);
  }
});

newPostModal.addEventListener("click", function (event) {
  const newPostContainer = newPostModal.querySelector(".modal__container");
  const clickedOutside = !newPostContainer.contains(event.target);
  if (clickedOutside && event.target !== newPostBtn) {
    closeModal(newPostModal);
  }
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal(previewModal);
  }
});

document.addEventListener("click", function (event) {
  const outsideImage = !cardsList.contains(event.target);
  if (outsideImage && event.target !== cardsList) {
    console.log("Hello");
    closeModal(previewModal);
  }
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostLinkInput.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  newPostFormModal.reset();
  disableButton(cardSubmitBtn, settings);

  closeModal(newPostModal);
}

newPostFormModal.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
