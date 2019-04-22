export default function (el) {
    const value = el.toLowerCase()
    if(value=='discount'){
        return 'льготная'
    }else if(value=='double'){
        return 'Двойная'
    }else if(value=='main'){
        return 'Основная'
    }
}