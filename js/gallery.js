const breedSelect=document.getElementById('breedSelect');
const gallery=document.getElementById('gallery');
const loadBtn=document.getElementById('loadBtn');
const spinner='<div class="spinner"></div>';

async function loadBreeds(){
  gallery.innerHTML=spinner;
  try{
    const res=await fetch('https://dog.ceo/api/breeds/list/all');
    const breeds=Object.keys((await res.json()).message);
    breedSelect.innerHTML=breeds.map(b=>`<option value="${b}">${b}</option>`).join('');
    gallery.innerHTML='';
  }catch(e){
    gallery.innerHTML='<p style="color:red">Could not load breeds.</p>';
    console.error(e);
  }
}
loadBreeds();

async function loadGallery(){
  const breed=breedSelect.value;
  if(!breed) return;
  gallery.innerHTML=spinner;
  try{
    const res=await fetch(`https://dog.ceo/api/breed/${breed}/images/random/9`);
    const imgs=(await res.json()).message;
    gallery.innerHTML=imgs.map(u=>`<img src="${u}" alt="">`).join('');
  }catch(e){
    gallery.innerHTML='<p style="color:red">Could not fetch images.</p>';
    console.error(e);
  }
}
loadBtn.addEventListener('click',loadGallery);
