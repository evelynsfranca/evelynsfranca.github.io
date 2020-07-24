function popupActions() {
    var buttonAgree = document.querySelector('#agree')
    
    popupElement.onclick = function(event) {
        event.target.tagName === 'INPUT' || event.target.id === 'agree' ? false : clearPopUp()
    }
    popupElement.onkeydown = function(event) {
        event.keyCode === 13 ? buttonAgree.click() : false
    }    
}

function clearPopUp() {
    let popupContentElement = document.querySelector('#pop-up > div')
    let popupContent = document.querySelectorAll('#pop-up > div > *')
    let btnsElement = document.querySelectorAll('#pop-up #btns > *')
        
    for(element of popupContent) {
        if(element.id === 'btns') {
            for(btn of btnsElement) {
                btn.remove()
            }
            popupContentElement.removeAttribute('style')
            popupElement.removeAttribute('style')
            return
        } else {
            element.remove()
            popupContentElement.removeAttribute('style')
            popupElement.removeAttribute('style')
        }
    }            
}