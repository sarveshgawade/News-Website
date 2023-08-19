let apiKey = '861f2d6cd6e645cc9fe242133fbcea05'
let url = 'https://newsapi.org/v2/everything?q='


document.addEventListener('load',fetchNews('India'))

async function fetchNews(query){
    let response = await fetch(`${url}${query}&apiKey=${apiKey}`)
    let data = await response.json()
    console.log(data.articles);
    bindDataToCard(data.articles)
}

function bindDataToCard(articles){
    const cardContainer = document.querySelector('#main')
    const cardTemplate = document.querySelector('#template')

    cardContainer.innerHTML = ''

    articles.forEach(element => {
        if(!element.urlToImage){
            return
        }
        const cardClone = cardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone,element)
        cardContainer.appendChild(cardClone)
    });
}

function fillDataInCard(cardClone,element){
    const newsImage = cardClone.querySelector('#img')
    const newsHeading = cardClone.querySelector('#heading')
    const newsSource = cardClone.querySelector('#website')
    const newsDescription = cardClone.querySelector('#description')
    const newsDate = cardClone.querySelector('#time')

    newsImage.src = element.urlToImage
    newsHeading.innerHTML = element.title
    newsDescription.innerHTML = element.description
    newsSource.innerHTML = element.source.name
    newsDate.innerHTML =  new Date(element.publishedAt).toLocaleString('en-US',{
        timeZone: 'Asia/Jakarta'
    })

    //  card click
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(element.url,'_blank')
    })
}

// anchor tag reload
document.querySelector('#anchorTag').addEventListener('click',()=>{
    window.location.reload()
})


// list item onClick
document.querySelector('#list').addEventListener('click',(e)=>{
    switch(e.target.innerHTML){
        case 'IPL' :  fetchNews('ipl') ;
                      break ;
        case 'Cars' : fetchNews('cars') ; 
                      break ;
        case 'Politics' : fetchNews('politics') ;  
                           break ;
        default: console.log('default');
                 break;
    }
})

//  search box card loading
document.querySelector('#button').addEventListener('click',()=>{
    const query = document.querySelector('#search-box').value
    fetchNews(query)
})


