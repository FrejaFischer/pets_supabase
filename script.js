import { deletePet, getPets, patchPet } from "./utils/REST_pets.js";

async function displayPets() {
  const pets = await getPets();
  console.log(pets);
  document.querySelector(".pets").innerHTML = "<article><h2>Add new pet</h2><button>Add</button></article>";

  pets.forEach((pet) => {
    const clone = document.querySelector("template#pet").content.cloneNode(true);

    clone.querySelector("[data-field=name]").textContent = pet.name;
    clone.querySelector("[data-field=species]").textContent = pet.species;
    clone.querySelector("[data-field=race]").textContent = pet.race;
    clone.querySelector("[data-field=traits]").textContent = pet.traits;
    clone.querySelector("[data-field=act]").textContent = pet.activityLevel;
    clone.querySelector("[data-field=dob]").textContent = pet.dob;
    clone.querySelector("[data-field=alive]").textContent = pet.isAlive;

    const deleteBtn = clone.querySelector("button[data-action=delete]");
    deleteBtn.dataset.id = pet.id;
    const updateBtn = clone.querySelector("button[data-action=update]");
    updateBtn.dataset.id = pet.id;

    deleteBtn.addEventListener("click", async (e) => {
      await deletePet(pet.id);
      displayPets();
    });
    updateBtn.addEventListener("click", async (e) => {
      await patchPet(pet.id);
      displayPets();
    });

    document.querySelector(".pets").appendChild(clone);
  });
}

displayPets();
