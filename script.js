import { catsData } from "./data.js"

const emotionRadios = document.getElementById('emotion-radios')
const imageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModal = document.getElementById("meme-modal")
const closeBtn = document.getElementById("meme-modal-close-btn")



function highlightCheckedOption(e){

    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
    
}

emotionRadios.addEventListener('change', highlightCheckedOption)




function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }   
}



function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1){
        console.log(catsArray[0])
    }else{
        const randomChoice = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomChoice]
    }
    
}

imageBtn.addEventListener('click', renderCat)

function renderCat(){
    const catObject = getSingleCatObject()
    
    console.log(catObject)

    memeModalInner.innerHTML = `
    <img
    class="cat-img"
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >
    `
    memeModal.style.display = 'flex'
}

closeBtn.addEventListener('click', function(){
    memeModal.style.display = 'none'
})



function getEmotionArray(cats){
    
    const emotionArray= []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionArray.includes(emotion)){
                emotionArray.push(emotion)
            }
        }
    }
    return emotionArray
}

function renderEmotionRadios(cats){
    
    let elementItems = ``
    const emotions = getEmotionArray(cats)
    
    for(let emotion of emotions){
        elementItems += `
        <div class='radio'>
        <label for="${emotion}">${emotion}</label> 
        <input type='radio' name='emotions' id='${emotion}' value='${emotion}'>
        </div>`
    }
    emotionRadios.innerHTML = elementItems
    
}

renderEmotionRadios(catsData)






