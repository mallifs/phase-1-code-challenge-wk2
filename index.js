const section = document.querySelector('section')

fetch('http://localhost:3000/characters')
.then(function (res){
    return res.json()
})
.then(function(res){
    console.log(res)
    console.log(res[4])
    let output = ""
    for(let i = 0; i<res.length; i++){
        output += `<div class="singleAnimal">
        <h2 class="animalName">${res[i].name}</h2>
       
    </div>`

    }
    section.innerHTML = output
    const animalNames = document.querySelectorAll('.animalName')
    const singleAnimal = document.querySelectorAll('.singleAnimal')
    let itemIndex, description
    animalNames.forEach(function (element,index){
        element.addEventListener('click', function (){
            if(itemIndex >= 0){
                singleAnimal[itemIndex].removeChild(description)
            }
            itemIndex = index
            const div = document.createElement("div")
            div.classList.add('description')
            
            div.innerHTML = `<img src="${res[index].image}" alt="">
            <p>votes: <span class="votesNumber">${res[index].votes}</span></p>
            <button type="button">add vote</button>`
            singleAnimal[index].append(div)
            description = document.querySelector('.description')
            itemID = index
            const btn = document.querySelector('button')
            console.log(index)
            const numVotes = document.querySelector('.votesNumber')
            btn.addEventListener('click', function (){
                fetch(`http://localhost:3000/characters/${index+1}`,{
                    method: 'PATCH',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        'votes':parseInt(numVotes.textContent)+1
                    })
                })
                .then(res => res.json())
                .then(res => {
                    numVotes.textContent = res.votes
                })
            })
        })
        
    
    })
   
    
    
})