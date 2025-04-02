window.onload=()=>{
    loadRecipes("Vegetarian")
    setTimeout(gsapAnimInit,2000)
}
async function loadRecipes(category)
{
    const Data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    const Result=await Data.json()
    console.log(Result)
    const dishes = Result.meals.slice(0, 6);
    const container = document.getElementById('recipe');
    if(category && category!=""){
       container.innerHTML=''
    }
    dishes.forEach(dish => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dish.idMeal}`)
        .then(response => response.json())
        .then(detailData => {
           if(!detailData)
          {
            let container=document.getElementById('recipe')
            container.innerText="Technical Error!"
            return
          }
          const recipe = detailData.meals[0];
          createRecipeCard(recipe)
          ScrollTrigger.refresh();
    });
    });
    
}
function createRecipeCard(recipe) {
        const container = document.getElementById('recipe');
        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundColor='black'
        card.style.color='#f5761b'
        card.style.borderRadius='15px'

      
        const img = document.createElement('img');
        img.src = recipe.strMealThumb;
        img.alt = recipe.strMeal;
        card.appendChild(img);
  
       
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
  
        
        const title = document.createElement('h3');
        title.innerText = recipe.strMeal;
        cardContent.appendChild(title);
  
       
        const description = document.createElement('p');
        description.innerText = recipe.strInstructions.slice(0, 100) + '...';
        cardContent.appendChild(description);
        card.appendChild(cardContent);

        const button = document.createElement('button');
        button.innerHTML = 'show more';
        button.style.color = 'black';
        button.style.backgroundColor = 'orange';
        button.style.border = 'none';
        button.style.padding = '10px 20px';
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '5px';
        button.style.marginBottom = '25px';
        button.onclick=()=>{
          let id= recipe.idMeal;
          document.location=`http://127.0.0.1:5500/wholeRecipe.html?id=${id}`
        }
        card.appendChild(button)

        container.appendChild(card)
      }
let searchBtn=document.getElementById('searchBtn')
let Category=document.getElementById('searchText')
searchBtn.addEventListener('click',()=>{
    loadRecipes(Category.value)
    gsap.killTweensof("*")
    gsapAnimInit()
})
let timeLine=new gsap.timeline()
timeLine.from(".navbar .navbar-right p", {
    opacity: 0,
    stagger: 0.2,
    duration: 0.6,
    y: -50,
    ease: "power1.out"
  })
  .from(".navbar img", {
    opacity: 0,
    scale: 0.5,
    duration: 0.5,
    ease: "back.out(1.7)"
  })
  .from(".hero-left-section p,.hero-left-section h1",{
    opacity:0,
    x:-100,
    duration:1
  })
  .from(".hero-right-section img",{
    opacity:0,
    x:100,
    duration:1
  })
  function gsapAnimInit(){
    gsap.from(".AboutUs h1", {
      x: -600, 
      opacity: 0, 
      duration: 5,
      ease: "power2.out", 
      scrollTrigger: {
        trigger: ".AboutUs h1", 
        start: "top 60%", 
        end: "top 20%", 
        scrub: 1,
        toggleActions: "play none none none", 
      },
    })
    gsap.from(".AboutUsText p", {
      x: 600, 
      opacity: 0,
      duration: 5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".AboutUsText p",
        start: "top 85%", 
        end: "top 55%",
        scrub: 1,
        toggleActions: "play none none none",
      },
    });
    gsap.from(".Contact h1", {
      scale: 0.5, 
      opacity: 0, 
      duration: 0.3, 
      ease: "back.out(1.7)", 
      scrollTrigger: {
        trigger: ".Contact h1", 
        start: "top 90%",
        toggleActions: "play none none none",
        scrub:1,
      },
    });
    gsap.from(".Contact p", {
      y: 50, 
      opacity: 0, 
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".Contact p",
        start: "top 85%", 
        toggleActions: "play none none none",
        scrub:1,
      },
    });
    gsap.from(".Contact form", {
      y: 50, 
      opacity: 0, 
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".Contact form",
        start: "top 85%", 
        toggleActions: "play none none none",
        scrub:1,
      },
    });
  }
 