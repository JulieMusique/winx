import React from 'react'
import '../../page.css'
function Groupe(){

    return (
        <div className='App'>
            <h1>Présentation du groupe</h1>
            <div className='presentation'>
                <div className='backend'>
                    <div className='card'><img src="./static/images/IMG_1051.jpg" alt="salma" /><h4>Salma Fathoune</h4></div>
                    <div className='card'><img src="../static/images/IMG_1050.jpg" alt="habiba"/><h4>Habiba Chouchane</h4></div>
                    <div className='card'><img src="./static/images/C9C4A4B3-F9C6-4395-9839-DD6BD8A10ACA.JPG" alt="fatou" /><h4>Fatou Thiaw</h4></div>
                </div>
                <div className='frontend'>
                    <div className='card'><img src="./static/images/IMG_1052.jpg" alt="selima" /><h4>Selima Benturkia</h4></div>
                    <div className='card'><img src="./static/images/344650EA-3101-4245-9334-6B6DCC65E9BB.JPG" alt="julie" /><h4>Julie Catteau</h4></div>
                </div>
            </div>
            
        </div>
    )

}

export default Groupe