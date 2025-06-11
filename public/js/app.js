console.log("Script çalıştı")

/*
fetch("https://puzzle.mead.io/puzzle").then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


fetch("http://localhost:3000/weather?location=Bursa").then((response)=>{
    response.json().then((data)=>{
        console.log(data)
        console.log(data.location)
        console.log(data.sicaklik)
    })
})
*/


const weatherForm = document.querySelector("form")
const weatherInput = document.querySelector("input")

const p1 = document.querySelector("#p1")
const p2 = document.querySelector("#p2")
const p3 = document.querySelector("#p3")

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = weatherInput.value
    console.log(location)

    fetch("http://localhost:3000/weather?location=" + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                p1.textContent = data.error
            } else{
                console.log(data.location)
                console.log(data.sicaklik)

                p1.textContent = "Location : " + data.location
                p2.textContent = "Temperature : " + data.sicaklik

                if(data.yagis === 0){
                    p3.textContent = "Yağış Olmayacak"
                } else if( data.yagis < 10){
                    p3.textContent = "Hafif Yağiş Bekleniyor"
                }  else if( data.yagis <= 25){
                    p3.textContent = "Yağış Bekleniyor"
                } else if( data.yagis <= 50){
                    p3.textContent = "Sağanak Yağış Bekleniyor"
                } else if( data.yagis <= 100){
                    p3.textContent = "Fırtına Bekliyor"
                } 
            }
        })
    })
})



