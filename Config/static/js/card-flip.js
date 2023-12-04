function $(x){
    return document.querySelector(x);
}

function _$(x){
    return document.querySelectorAll(x);
}

function rep(x, y, z){
    x.classList.replace(y,z)
}

function spin(x, y, z) {
    rep(x,y,z)
    setTimeout(()=> {
        if (x.style.backgroundImage == 'url("../../static/img/bet1.png")') {
        x.style.backgroundImage = "url('../../static/img/bet.png')"
    }
    else {
        x.style.backgroundImage = "url('../../static/img/bet1.png')"
    }
    },150)
    
}

//Selecao de elemetos para manipulacao
let card = $('.card-flipper')
let wrapper = $('.wrapper')
let btn = $('.bb-login')
//---------------------------------------------------------
//------- Colocando a imagem de fundo dinamicamente -------
card.style.backgroundImage = "url('../../static/img/bet1.png')";
//----------------------------------------------------------
//----------------------------------------------------------
btn.addEventListener('click', () => {
    if (card.classList.contains('card-inactive') || card.classList.contains('rotate-back')) {
        card.classList.contains('card-inactive') ? spin(card,'card-inactive', 'rotate') : spin(card,'rotate-back', 'rotate')
        setTimeout(() => {
            rep(wrapper,'hide', 'show')
        }, 100);
    } else {
        spin(card,'rotate', 'rotate-back')
        setTimeout(() => {
            rep(wrapper,'show', 'hide')
        }, 100);
    }
})