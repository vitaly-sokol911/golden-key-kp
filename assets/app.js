const deck=document.getElementById('deck');
const slides=[...document.querySelectorAll('.slide')];
const dotsWrap=document.getElementById('dots');
const prog=document.getElementById('prog');
slides.forEach((s,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Слайд '+(i+1));
  b.onclick=()=>slides[i].scrollIntoView({behavior:'smooth'});dotsWrap.appendChild(b);});
const dots=[...dotsWrap.children];
const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');
  const i=slides.indexOf(e.target);dots.forEach((d,j)=>d.classList.toggle('active',j===i));}});},{threshold:.5});
slides.forEach(s=>io.observe(s));
deck.addEventListener('scroll',()=>{const max=deck.scrollHeight-deck.clientHeight;prog.style.width=(deck.scrollTop/max*100)+'%';},{passive:true});
function cur(){let best=0,bd=1e9;slides.forEach((s,i)=>{const d=Math.abs(s.getBoundingClientRect().top);if(d<bd){bd=d;best=i;}});return best;}
window.addEventListener('keydown',(e)=>{
  if(['ArrowDown','ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();const n=Math.min(cur()+1,slides.length-1);slides[n].scrollIntoView({behavior:'smooth'});}
  if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();const n=Math.max(cur()-1,0);slides[n].scrollIntoView({behavior:'smooth'});}
});
slides[0].classList.add('in');dots[0].classList.add('active');