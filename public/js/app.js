console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input') 
const para1 =  document.querySelector('#id1')
const para2 =  document.querySelector('#id2')

//console.log(weatherForm)

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //console.log(location)

    const url = 'http://localhost:3000/weather?address=' + location

    para1.textContent = 'Loading...'
    para2.textContent = ' '
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error){
                //console.log(data.error)
                para1.textContent = data.error
            } else {
                para1.textContent = data.location
                para2.textContent = data.forecast
            }
        })
    })
})
