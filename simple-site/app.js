const navItems = [
  {name:'HOME',href:'https://www.amcolhardwarett.com/index.php'},
  {name:'PRODUCTS',href:'/simple-site/products.html'},
  {name:'CONSTRUCTION',href:'https://www.amcolhardwarett.com/construction.php'},
  {name:'INDUSTRIAL',href:'/simple-site/index.html'},
  {name:'DEPARTMENTS',href:'/departments'},
  {name:'CONTACT US',href:'/simple-site/contact.html'},
];

function renderHeader(active){
  const ul = navItems.map(i=>`<li><a class="${i.name===active?'active':''}" href="${i.href}">${i.name}</a></li>`).join('');
  return `<header class="header"><div class="container nav"><ul>${ul}</ul><img class="logo" src="/images/AMCOL_Logo.png" alt="AMCOL Logo"/></div></header>`;
}
function renderFooter(){
  return `<footer class="footer"><div class="container">AMCOL · <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Contact</a></div></footer>`;
}
function mountShell(active){
  document.getElementById('shell-header').innerHTML = renderHeader(active);
  document.getElementById('shell-footer').innerHTML = renderFooter();
}

function setupCarousel(selector, images){
  const root = document.querySelector(selector);
  if(!root) return;
  let idx=0;
  const slides = images.map((img,i)=>`<div class="slide ${i===0?'active':''}" style="background-image:url('${img}')"></div>`).join('');
  const dots = images.map((_,i)=>`<button data-i="${i}" class="${i===0?'active':''}" aria-label="Go to slide ${i+1}"></button>`).join('');
  root.innerHTML = `${slides}<div class="overlay"></div><div class="controls">${dots}</div>`;
  const dotEls=[...root.querySelectorAll('button')];
  const slideEls=[...root.querySelectorAll('.slide')];
  function render(){
    slideEls.forEach((s,i)=>s.classList.toggle('active',i===idx));
    dotEls.forEach((d,i)=>d.classList.toggle('active',i===idx));
  }
  dotEls.forEach(d=>d.addEventListener('click',()=>{idx=+d.dataset.i;render();}));
  setInterval(()=>{idx=(idx+1)%images.length;render();},5000);
}

function setupContactForm(){
  const form=document.getElementById('inquiry-form');
  if(!form) return;
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    console.log('Contact inquiry payload',data);
    alert('Thank you for your inquiry. A representative will contact you shortly.');
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded',()=>setupContactForm());
