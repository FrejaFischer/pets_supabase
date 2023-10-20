import { deletePet, getPets, patchPet, postPet } from "./utils/REST_pets.js";

async function displayPets() {
  const pets = await getPets();
  console.log(pets);
  document.querySelector(".pets").innerHTML = "";

  pets.forEach((pet) => {
    const clone = document.querySelector("template#pet").content.cloneNode(true);

    clone.querySelector("[data-field=name]").textContent = pet.name;
    clone.querySelector("[data-field=species]").textContent = pet.species;
    clone.querySelector("[data-field=race]").textContent = pet.race;
    // clone.querySelector("[data-field=traits]").textContent = pet.traits;
    clone.querySelector(".traits-list").innerHTML += pet.traits.map((trait) => `<dd>${trait}</dd>`).join("");
    clone.querySelector("[data-field=act]").textContent = pet.activityLevel;
    clone.querySelector("[data-field=dob]").textContent = pet.dob;
    if (pet.isAlive === false) {
      clone.querySelector("[data-field=isAlive]").classList.remove("hide");
    }
    if (pet.image) {
      clone.querySelector(".image_container img").src = pet.image;
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
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  let alive = true;
  if (formData.get("isAlive") == "0") {
    alive = false;
  }
  //Makes the first letter in name in uppercase
  let petName = formData.get("name");
  let newName = petName.replace(petName[0], petName[0].toUpperCase());

  //Makes each traits first letter in uppercase
  let traitsArray = formData.get("traits").split("\n");
  let newTraitArray = [];
  traitsArray.forEach((trait) => {
    let newTrait = trait.replace(trait[0], trait[0].toUpperCase());
    console.log(newTrait);
    newTraitArray.push(newTrait);
  });

  const newPet = {
    name: newName,
    species: formData.get("species"),
    race: formData.get("race"),
    traits: newTraitArray,
    activityLevel: formData.get("activityLevel"),
    dob: formData.get("dob"),
    isAlive: alive,
  };
  console.log(newPet);

  await postPet(newPet);
  displayPets();
});
