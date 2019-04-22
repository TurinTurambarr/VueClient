export default function (El) {
        function TrimStr(s) {
            s = s.replace(/^-/, '');
            return s.replace(/-$/, '');
        }

        const space = '-'; 
        const textElem = El.toLowerCase();
            
        const transl = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 
        'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
        'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
        ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
        '#': space, '$': space, '%': space, '^': space, '&': space, '*': space, 
        '(': space, ')': space,'-': space, '\=': space, '+': space, '[': space, 
        ']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
        '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
        '?': space, '<': space, '>': space, '№':space
        }
                        
        let result = '';
        let curent_sim = '';
                        
        for(let i=0; i < textElem.length; i++) {
            if(transl[textElem[i]] != undefined) {
                if(curent_sim != transl[textElem[i]] || curent_sim != space){
                    result += transl[textElem[i]];
                    curent_sim = transl[textElem[i]];
                }                                                                             
            }
            else {
                result += textElem[i];
                curent_sim = textElem[i];
            }                              
        }          
                        
        result = TrimStr(result);               
                        
        return result;
}  
