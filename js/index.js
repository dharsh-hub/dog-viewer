const breedSelect   = document.getElementById('breedSelect');
const breedSearch   = document.getElementById('breedSearch');
const imageContainer= document.getElementById('imageContainer');
const getImageBtn   = document.getElementById('getImageBtn');
const spinnerHTML   = '<div class="spinner"></div>';

function showSpinner(){ imageContainer.innerHTML = spinnerHTML; }

/* ---------- load breeds on start ---------- */
async function loadBreeds(){
  showSpinner();
  try{
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const breeds = Object.keys((await res.json()).message);
    breedSelect.innerHTML = breeds.map(b=>`<option value="${b}">${b}</option>`).join('');
    imageContainer.innerHTML='';
  }catch(err){
    imageContainer.innerHTML = `<p style="color:red">⚠️ Could not load breed list.<br>${err.message}</p>`;
    console.error(err);
  }
}
loadBreeds();

/* ---------- live filter ---------- */
breedSearch.addEventListener('input',()=>{
  const q = breedSearch.value.toLowerCase();
  [...breedSelect.options].forEach(o=>o.style.display = o.value.includes(q)?'':'none');
});

/* ---------- fetch random image ---------- */
async function fetchImage(){
  const breed = breedSelect.value;
  if(!breed) return;
  showSpinner();
  try{
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    imageContainer.innerHTML = `<img src="${(await res.json()).message}" alt="${breed} dog">`;
  }catch(err){
    imageContainer.innerHTML = `<p style="color:red">⚠️ Could not fetch image.<br>${err.message}</p>`;
    console.error(err);
  }
}
getImageBtn.addEventListener('click',fetchImage);
