const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib2F3YnZka2dieHV5aWh1eXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4NTE1MzAsImV4cCI6MjAxMjQyNzUzMH0.Iq40XCZG1EvkMh2BD41TMTkAK97Ow5WwUwb_7tDsZeI";
let URL = "https://cboawbvdkgbxuyihuyzj.supabase.co/rest/v1/pets";

// GET request
export async function getPets() {
  let headersList = {
    apikey: apikey,
    Prefer: "return=representation",
  };
  let response = await fetch(URL, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  return data;
}

// POST request
export async function postPet() {
  let headersList = {
    apikey: apikey,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
  let bodyContent = JSON.stringify({
    race: "Labrador",
    dob: "2005-03-26",
    name: "Felix",
    isAlive: true,
    activityLevel: 4,
    traits: ["good boy"],
    species: "Dog",
    image: "doggyFelix.webp",
  });

  let response = await fetch(URL, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
}

//DELETE request
export async function deletePet(id) {
  let headersList = {
    apikey: apikey,
    Prefer: "return=representation",
  };
  let response = await fetch(URL + "?id=eq." + id, {
    method: "DELETE",
    headers: headersList,
  });

  let data = await response.json();
  return data;
}

//PATCH request
export async function patchPet(id, pet) {
  let headersList = {
    apikey: apikey,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  //toggle the pet isAlive state
  if (pet.isAlive === true) {
    let bodyContent = JSON.stringify({
      isAlive: false,
      activityLevel: 0,
    });
    let response = await fetch(URL + "?id=eq." + id, {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    return data;
  } else {
    let bodyContent = JSON.stringify({
      isAlive: true,
      activityLevel: 5,
    });
    let response = await fetch(URL + "?id=eq." + id, {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    return data;
  }
}
