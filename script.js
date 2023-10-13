import { deletePet, getPets, patchPet } from "./utils/REST_pets.js";

async function displayPets() {
  const pets = await getPets();
  console.log(pets);
  document.querySelector(".pets").innerHTML = "";

  pets.forEach((pet) => {
    const clone = document.querySelector("template#pet").content.cloneNode(true);

    clone.querySelector("[data-field=name]").textContent = pet.name;
    clone.querySelector("[data-field=species]").textContent = pet.species;
    clone.querySelector("[data-field=race]").textContent = pet.race;
    clone.querySelector("[data-field=traits]").textContent = pet.traits;
    clone.querySelector("[data-field=act]").textContent = pet.activityLevel;
    clone.querySelector("[data-field=dob]").textContent = pet.dob;
    if (pet.isAlive === true) {
      clone.querySelector("[data-field=alive]").textContent = "Yes";
    } else {
      clone.querySelector("[data-field=alive]").textContent = "No";
    }

    const deleteBtn = clone.querySelector("button[data-action=delete]");
    deleteBtn.dataset.id = pet.id;
    const updateBtn = clone.querySelector("button[data-action=update]");
    updateBtn.dataset.id = pet.id;

    deleteBtn.addEventListener("click", async (e) => {
      await deletePet(pet.id);
      displayPets();
    });
    updateBtn.addEventListener("click", async (e) => {
      await patchPet(pet.id, pet);
      displayPets();
    });

    document.querySelector(".pets").appendChild(clone);
  });
}
function addPet() {
  const addBtn = document.querySelector("[data-action='add_pet']");
  const cancelBtn = document.querySelector(".cross");
  const petAction = document.querySelector(".new_pet_action");
  const content = document.querySelector("#content");
  addBtn.addEventListener("click", () => {
    petAction.classList.add("hide");
    content.classList.remove("hide");
    addBtn.setAttribute("aria-expanded", "true");
    content.setAttribute("aria-hidden", "false");
    document.querySelector("main").classList.add("grid_view");

    cancelBtn.addEventListener("click", () => {
      petAction.classList.remove("hide");
      content.classList.add("hide");
      addBtn.setAttribute("aria-expanded", "false");
      content.setAttribute("aria-hidden", "true");
      document.querySelector("main").classList.remove("grid_view");
    });
  });
}
addPet();
displayPets();

const form = document.querySelector(".new_pet_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  let alive = true;
  if (formData.get("isAlive") == "0") {
    alive = false;
  }

  const newPet = {
    name: formData.get("name"),
    race: formData.get("race"),
  };

  console.log(newPet);
});

//Saml formen op
//lytte efter submit, evt.preventDefault()
//samle
// race: "Labrador",
// dob: "2005-03-26",
// name: "Felix",
// isAlive: true,
// activityLevel: 4,
// traits: ["good boy"],
// species: "Dog",
// image: "doggyFelix.webp",
