/** 
     * Verifica si el parametro es un numero entero
     * @param {string,int , int }
     * @returns {boolean}
     * @author Diego Mendoza
     * */
    const numeroVal = (input, min, max) => {
        //La expresion regular evalua 
        //si la entrada tiene de 1 a 5 numeros
        let expreg = new RegExp("^([0-9]{" + min + "," + max + "})*$");
        if (expreg.test(input) && input !== "") {
            return true;
        } else {
            return false;
        }
    }
    /** 
     * Valida que la cantidad de palabras este dentro del rango minimo
     *  y maximo
     * @param {string , int , int}
     * @returns {boolean}
     * @author Diego Mendoza
     * */
    const cantidadPalabrasVal = (input, minimo, maximo) => {
        //Toma el string lo divide en tokens y cuenta los tokens
        let cantidad = String(input).split(/\s+/g).length ;
        if (cantidad >= minimo && cantidad <= maximo && input !== "") {
            return true;
        } else
            //console.log("La informacion es muy larga o muy corta");
            return false;
    }
    
    /** 
         * Verifica si el parametro es un nombre valido
         * @param {String}
         * @returns {boolean}
         * @author Jahaziel Moreno
         * */
    const nombresVal = (input, min, max) => {
        let expreg = new RegExp("^[A-Z][a-zA-ZñÑíÍáÁéÉóÓúÚ\s]");
        if (expreg.test(input) && input.length >= min && input.length <= max) {
            return true;
        } else {
            return false;
        }
    }
    
    
    
    
    /** 
     * Valida que sea un numero decimal con punto
     * @param {string , min  , max}
     * @returns {boolean}
     * @author {Diego Mendoza , Jahaziel}
     * */
    const puntoDecimalVal =(input , min , max)=>{
        let expreg = new RegExp("^[0-9]*(\.[0-9]+)?$");
        if (expreg.test(input) && String(input).length >= min && String(input).length <= max) {
            return true;
        } else {
            return false;
        }
    }
    
    
    /** 
     * Valida que sea una URL de imagenes
     * @param {string}
     * @returns {boolean}
     * @author {Diego Mendoza , Jahaziel}
     * */
    const urlImagenVal=(input)=>{
        let expreg = new RegExp("(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png|ico|JPG|GIF|PNG|ICO)");
        if (expreg.test(input)) {
            return true;
        } else {
            return false;
        }    
    
    }
    
    /** 
     * Valida que la cantidad de palabras este dentro del rango minimo
     *  y maximo
     * @param {string , int , int}
     * @returns {boolean}
     * @author {Diego Mendoza , Jahaziel}
     * */
    const rangoCaracteresVal = (input, min, max) => {
        if (input.length >= min && input.length <= max) {
            return true;
        } else {
            return false;
        }
    
    }
    export { nombresVal, cantidadPalabrasVal, numeroVal, rangoCaracteresVal ,urlImagenVal , puntoDecimalVal}
    