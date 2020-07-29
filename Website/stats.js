const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const form = document.querySelector('form');
const shortLink = document.getElementById('user_link');
const loader = document.getElementById('loader');
const result = document.querySelector('.result');
const link_submitted = document.querySelector('.info-link p');
const link_visits = document.querySelector('.visits-info p');

burger.addEventListener('click',()=>{navLinks.classList.toggle('active');burger.classList.toggle('burger-active')});
form.addEventListener('submit',submitForm);

async function submitForm(e){
    e.preventDefault();
    let fullUrl = shortLink.value;

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

    const res = await fetch('/stats',options);
    const gotData = await res.json();
    if(gotData.Status == 'Fail'){
        loader.style.display = 'none';
       return alert('Sorry Plz Try Again');
    }
    
    let link_clicks = gotData.count;
    link_submitted.textContent = shortLink.value;
    link_visits.textContent = link_clicks;
    loader.style.display = 'none';
    result.style.display = 'flex';
    

}