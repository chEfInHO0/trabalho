$(document).ready (() => {
    span = document.createElement('span')
    span.classList.add('d-none')
    span.id = 'keepalive'
    span.innerHTML = '1200' //TEMPO PARA LOGOUT
    document.body.appendChild(span)

    let windowSizeH = window.innerHeight
    let windowSizeW = window.innerWidth
    console.log(`${windowSizeW}x${windowSizeH}`)
    if ($('#valor')){
        $('#valor').mask('000.000.000,00', {reverse: true});
    }else{
        console.log('Valor não existe')
    }
    
    
    const btn = document.querySelector('#keepalive')
    let time = setInterval(() => {
        let remain = +btn.innerHTML
        btn.innerHTML = --remain
        if (remain == 1){
            clearInterval(time)
            window.location.href = '/user/logout'
        }
    },1000)

})


