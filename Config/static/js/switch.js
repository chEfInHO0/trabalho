
async function req(event){
    const target = event.target
    const id = target.dataset.id
    const request = await fetch(`/jogo/status-change/${id}`)
    const response = request.status
    if (response == "200"){
        const attr = target.getAttributeNames()
        if (attr.includes("checked")){
            target.removeAttribute("checked")
        }else{
            target.setAttribute("checked","")
        }
    }
}

const sliders = document.querySelectorAll(".status")
const arraySliders = Array.from(sliders)
arraySliders.forEach(elem => elem.addEventListener('click', req))
console.log('teste')