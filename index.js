async function loadBreeds() {
  showSpinner();
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    const breeds = Object.keys(data.message);
    breedSelect.innerHTML = breeds.map(b => `<option value="${b}">${b}</option>`).join('');
    imageContainer.innerHTML = '';
  } catch (err) {
    imageContainer.innerHTML = '<p style="color:red;">⚠️ Could not load breed list. Please try again later.</p>';
    console.error("Error fetching breeds:", err);
  }
}
