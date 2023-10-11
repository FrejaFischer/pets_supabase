import { getPets } from "./utils/REST_pets.js";

async function displayPets() {
  const pets = await getPets();
  console.log(pets);

  pets.forEach((pet) => {
    const clone = document.querySelector("template#pet").content.cloneNode(true);

    clone.querySelector("[data-field=name]").textContent = pet.name;
    clone.querySelector("[data-field=species]").textContent = pet.species;
    clone.querySelector("[data-field=race]").textContent = pet.race;
    clone.querySelector("[data-field=traits]").textContent = pet.traits;
    clone.querySelector("[data-field=act]").textContent = pet.activityLevel;
    clone.querySelector("[data-field=dob]").textContent = pet.dob;
    clone.querySelector("[data-field=alive]").textContent = pet.isAlive;

    document.querySelector(".pets").appendChild(clone);
  });
}

displayPets();
