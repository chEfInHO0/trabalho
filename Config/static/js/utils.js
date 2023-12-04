function wrapper(){
            //-----------------------------------------------
            async function getRandomWord() {
                //Gera uma palavra aleatoria
                sessionStorage.timer = 100
                tipButton.innerHTML = "Dica R$ 2.50"
                wordButton.innerHTML = "Mostrar uma Letra R$ 0.50 (cada)"
                walletPlacer.innerHTML = (+walletPlacer.innerHTML).toFixed(2)
                let url = 'https://api.dicionario-aberto.net/random'
                const request = await fetch(url)
                const response = await request.json()
                wordPlacer.innerHTML = response.word
                slicedWord = wordPlacer.innerHTML.split("")
                wordCopy = wordPlacer.innerHTML
                maskWord()
                wordPlacer.classList.remove('hide')
                errorButton.setAttribute("disabled","")
                errorButton.classList.add('disabled')
            }
            //-----------------------------------------------
            //-----------------------------------------------
            async function getDefinition(){
                //Consulta a definicao da palavra e passa como dica
                const r = await setTransaction('2.5')
                if (r == 200){
                    let url = `https://api.dicionario-aberto.net/word/${wordCopy}/1`
                    const request = await fetch(url)
                    const response = await request.json()
                    let pos
                    const res = response[0].xml.split("\n")
                    res.forEach((item,index) => (item==='<def>')? pos = index:false)
                    tipPlacer.innerHTML = res[pos+1]
                    tipButton.setAttribute("disabled","")
                    tipButton.classList.add("disabled")
                }else{
                    msgPlacer.innerHTML = "Saldo insuficiente"
                }
            }
            //-----------------------------------------------
            function maskWord(){
                //Mascara a palavra para iniciar o jogo
                let specialChar = {
                    a: ["á", "â","ã","à","ä","å"],
                    e: ["é", "ê","è","ë"],
                    i: ["í", "î","ì","ï"],
                    o: ["ó", "ô","õ","ò","ö","ø"],
                    u: ["ú", "û","ù","ü"],
                    n : ["ñ"],
                    y : ["ý"]
                }
                let chaves = Object.keys(specialChar)
                let valores = Object.values(specialChar)
                slicedWord.forEach((letra, index) => valores.forEach((val, i) => val.includes(letra) ? slicedWord[index] = chaves[i] : false))
                slicedWord.forEach(letra => {
                    if(['-',"`", "'",",","."].includes(letra)){
                        masked.push(letra)}
                    else
                        {masked.push('_')
                }
                })
                masked = masked.join(" ")
                wordPlacer.innerHTML = masked
            }

            async function setTransaction(amount){
                const request = await fetch(`/jogo/hangman-r/${amount}`)
                const response = await request.json()
                if (response["status"] == 200){ 
                    walletPlacer.innerHTML = response["saldo"].toFixed(2)
                    return response["status"]
                }else{
                    msgPlacer.innerHTML = "Saldo insuficiente"
                    msgPlacer.innerHTML = "Saldo insuficiente"
                    setTimeout(() => {
                        msgPlacer.innerHTML = '' 
                    }, 3000);
                    return response["status"]
                }
            }

            async function addTransaction(amount){
                const request = await fetch(`/jogo/hangman-a/${amount}`)
                const response = await request.json()
                if (response["status"] == 200){ 
                    walletPlacer.innerHTML = response["saldo"]
                    return response["status"]
                }else{
                    msgPlacer.innerHTML = "Erro"
                    setTimeout(() => {
                        msgPlacer.innerHTML = '' 
                    }, 3000);
                    return response["status"]
                }
            }
            //-----------------------------------------------
            function addLetter(letter){
                //Adiciona as letras a lista de letras usadas
                if(letters.includes(letter)){
                    msgPlacer.innerHTML = `${letter} ja foi usado`
                }else{
                    letters.push(letter)
                }
                letterPlacer.innerHTML = letters.join(",")
            }
            
            async function revealLetter(l, curr){
                //Funcao auxiliar as funcoes de revelar letras da palavra
                const custo = 0.5
                const nDeLetras = slicedWord.filter(letra => letra==l)
                let total = (custo * nDeLetras.length).toFixed(2)
                const r = await setTransaction(total)
                if (r == 200){
                    slicedWord.forEach(async (letter,index) => {
                            if(letter == l){
                                curr[index] = wordCopy[index]
                                wordPlacer.innerHTML = curr.join(" ")
                            }
                    })
                    masked = wordPlacer.innerHTML
                    addLetter(l)
                }else{
                    console.log("Sem saldo")
                }
                stopCondition()
            }
            
            function getNextLetter(){
                //Revela a proxima letra da palavra
                let curr = wordPlacer.innerHTML.split(" ")
                for (let letter in curr){
                    if (curr[letter] == "_"){
                        revealLetter(slicedWord[letter],curr)
                        masked = wordPlacer.innerHTML
                        break;
                    }
                }
            }
            
            function revealWord(){
                //Revela toda a palavra
                let curr = wordPlacer.innerHTML.split(" ")
                for (let letter in curr){
                    if (curr[letter] == "_"){
                        revealLetter(slicedWord[letter],curr)
                        masked = wordPlacer.innerHTML
                        setTransaction(0.5)
                    }
                }
                stopCondition()
            }
            
            function disableButtons(){
                tipButton.setAttribute("disabled","")
                tipButton.classList.add("disabled")
                wordButton.setAttribute("disabled","")
                wordButton.classList.add("disabled")
                errorButton.setAttribute("disabled","")
                errorButton.classList.add("disabled")
                timerButton.setAttribute("disabled","")
                timerButton.classList.add("disabled")
            }


            function stopCondition(){
                //Condicoes de parada do programa
                if (errorCounter >=6 || timer.style.width == "0%"){
                    msgPlacer.innerHTML = "Você perdeu"
                    body.removeEventListener('keydown',listenWord)
                    disableButtons()
                    stopTimer()
                }
                if (wordPlacer.innerHTML.split(" ").join("") == wordCopy){
                    msgPlacer.innerHTML = "Você venceu!!!"
                    body.removeEventListener('keydown',listenWord)
                    disableButtons()
                    stopTimer()
                    addTransaction(0.25)
                }
            }
            
            function listenWord(event){
                //Funcao que observa as letras digitadas
                if (/^[a-zA-Z()]+$/.test(event.key) && (event.key != "Enter") && (event.keyCode != 27 && !event.ctrlKey &&  !event.shiftKey && !event.altKey)){
                    addLetter(event.key)
                    if (slicedWord.includes(event.key)){
                        slicedWord.forEach((letra, index) => {
                            if (letra.includes(event.key)){
                                masked = masked.split(" ")
                                masked[index] = wordCopy[index]
                                masked = masked.join(" ")
                                wordPlacer.innerHTML = masked
                            }
                        })
                    }else{
                        errorCounter++
                        errorPlacer.innerHTML = errorCounter
                        errorButton.removeAttribute("disabled")
                        errorButton.classList.remove('disabled')
                    }
                }
                stopCondition()
            }
            
            
            //Timer
            function countdown(){
                //Funcao que controla o tempo de jogo
                if (!sessionStorage.timer){
                    sessionStorage.timer = 100
                }
                let val = 100/120;
                timer.style.width = `${sessionStorage.timer}%`;
                remain = setInterval(()=>{
                    if (sessionStorage.timer > 75){
                        timer.style.backgroundColor = 'green';
                    }
                    if (sessionStorage.timer < 75){
                        timer.style.backgroundColor = 'yellow';
                    }
                    if (sessionStorage.timer <= 25){
                        timer.style.backgroundColor = 'red';
                    }
                    if (sessionStorage.timer > val){
                        sessionStorage.timer = sessionStorage.timer - val;
                        timer.style.width = `${sessionStorage.timer}%`;
                    }else{
                        sessionStorage.timer = 0;
                        timer.style.width = `${sessionStorage.timer}%`;
                    }
                    if (sessionStorage.timer <= 0){
                        sessionStorage.timer = 100
                        clearInterval(remain);
                        stopCondition()
                        setTimeout(() => {
                            window.location.reload()
                        }, 3000);
                    }
                },1000)
            }
            

            async function resetTimer(){
                let total = ((100 - sessionStorage.timer)*0.02).toFixed(2)
                const r = await setTransaction(total)
                console.log(r)
                if (r == 200){
                    sessionStorage.timer = 100
                }else{
                    timerButton.innerHTML = 'Saldo insuficiente'
                    setTimeout(() => {
                        timerButton.innerHTML = 'Reiniciar Tempo' 
                    }, 2500);
                }
            }

            async function reseteErrors(){
                let total = (errorCounter * 1.25).toFixed(2)
                const r = await setTransaction(total)
                console.log(r)
                if (r == 200){
                    errorCounter = 0
                    errorPlacer.innerHTML = 0
                    errorButton.setAttribute("disabled","")
                    errorButton.classList.add('disabled')
                }else{
                    errorButton.innerHTML = 'Saldo insuficiente'
                    setTimeout(() => {
                        errorButton.innerHTML = 'Reiniciar Erros' 
                    }, 2500);
                }
            }

            function attPrices(){
                let totalT = ((100 - sessionStorage.timer)*0.02).toFixed(2)
                let totalE = (errorCounter * 1.25).toFixed(2)
                timerButton.innerHTML = `Reiniciar Tempo R$ ${totalT}`
                errorButton.innerHTML = `Reiniciar Erros R$ ${totalE}`
            }

            function stopTimer(){
                //Para o tempo
                clearInterval(remain);
            }
            
            async function modalToggle(e){
                modalPlacer.classList.toggle('hide')
                if (e.target.id != ''){
                    line.push(e.target.id)
                }
                if (e.target == confirmButton){
                    const action = line.at(-1)
                    if (action != ""){
                        if (action == 'dica'){
                            await getDefinition()
                        }else if (action == 'letra'){
                            getNextLetter()
                        }else if (action == 'timer'){
                            resetTimer()
                        }else if (action == 'error'){
                            reseteErrors()
                        }

                    }
                }
                return e.target
            }

            const costs = {
                tip:2.5,
                letter:0.5,
                timer:0.02,
                error:1.25
            }

            //Constantes para o jogo
            const wordPlacer = document.querySelector('#palavra')
            const tipPlacer = document.querySelector(".dica-texto")
            const msgPlacer = document.querySelector(".msg")
            const errorPlacer = document.querySelector(".erros")
            const walletPlacer = document.querySelector(".saldo")
            const modalPlacer = document.querySelector(".modalH")
            const body = document.querySelector('body')
            const letterPlacer = document.querySelector(".letras")
            const timer = document.querySelector(".timer")
            
            const tipButton = document.querySelector("#dica")
            const wordButton = document.querySelector("#letra")
            const timerButton = document.querySelector("#timer")
            const errorButton = document.querySelector("#error")
            const cancelButton = document.querySelector(".abort")
            const confirmButton = document.querySelector(".confirm")
        
            //Variaves de controle e auxilio
            let letters = []
            let slicedWord
            let wordCopy;
            let masked = []
            let errorCounter = 0
            let remain;
            let line = []
            errorPlacer.innerHTML = errorCounter
            
        
            //Eventos
            tipButton.addEventListener('click', modalToggle)
            wordButton.addEventListener('click', modalToggle)
            timerButton.addEventListener('click', modalToggle)
            errorButton.addEventListener('click', modalToggle)
            cancelButton.addEventListener('click', modalToggle)
            confirmButton.addEventListener('click', modalToggle)

            body.addEventListener('keydown', listenWord)
            
            //Chamada de funcao
            getRandomWord()
            countdown()
            setInterval(() => {
                attPrices()
            }, 1000);
        }


wrapper()

