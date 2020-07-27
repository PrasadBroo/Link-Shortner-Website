const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const form = document.querySelector('form');
const full_url = document.getElementById('user_link');
const copy_btn = document.querySelector('.copyBtn');
const fullLink = document.getElementById('full-link');
const shortLink = document.getElementById('short-link');
const loader = document.getElementById('loader');
const result = document.querySelector('.result');

form.addEventListener('submit',submitForm);
copy_btn.addEventListener('click',copyLink);
burger.addEventListener('click',()=>{navLinks.classList.toggle('active');burger.classList.toggle('burger-active')});


async function submitForm(e){
    e.preventDefault();
    let fullUrl = full_url.value;
    if(fullUrl.trim() == ''){
       return alert('plz enter valid url');
    }

    loader.style.display = 'block';
    let data = {
        fullurl:fullUrl
    }

    let options = {
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-type':'application/json'
        }
    }

    const res = await fetch('/shortme',options);
    const gotData = await res.json();
    if(gotData.Status == 'Fail'){
        loader.style.display = 'none';
       return alert('Sorry Plz Try Again');
    }
    fullLink.textContent = gotData.Full_Url;
    shortLink.textContent = gotData.Short_Url;
    shortLink.setAttribute('href',gotData.Short_Url);
    loader.style.display = 'none';
    result.style.display = 'flex';
}

function copyLink(){
    var copyText = document.getElementById("short-link");
    navigator.clipboard.writeText(copyText.textContent);
    alert('Copied Successfully...')
}