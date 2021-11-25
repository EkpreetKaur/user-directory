import validator from "validator/es";

export const isNotEmpty = (value) =>{
    console.log("typeof value", typeof(value), value)

    if(!value){
        return false;
    }
    else if(value.length <= 0 || (typeof(value)=== 'string' && value.trim().length === 0) ){
        return false;
    }
    else return true;
}

//valid email
export const isValidEmail = (email) => {
    if(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        return true;
    }
    else return false;
}

//alpha
export const isAlpha = (email) => {
    if(email.match(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/)){
        console.log('inside valid username---')
        return true;
    }
    else return false;
}

//alpha numeric
export const isAlphaNumeric = (name) => {
    if(name.match(/^[a-z0-9]+$/i)){
        return true;
    }
    else return false;
}
//valid name
export const isValidName = (name) => {

    // if(name.match(/^[A-Za-z\d\s]+$/)){
    // if(name.match(/[A-Za-z]+[. ]*([A-Za-z]+[ ]*)*/)){
    if(name.match(/^[A-Za-z0-9_@./#&+-?~`!$%^]*$/)){
        return true;
    }
    else return false;
}
//alpha numeric with space, -, _ 
export const isAlphaNumericwithspace = (name) => {
    if(name.match(/^[a-z\d\-_\s]+$/i)){
        return true;
    }
    else return false;
}

//valid username
export const isValidUserName = (email) => {
    if(email.match(/^([\w.%+-]+)$/i)){
        console.log('inside valid username---')
        return true;
    }
    else return false;
}

//valid phone no
export const isValidPhoneNo = (phone) => {
    var numberPattern = new RegExp(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/);
    if(!numberPattern.test(phone) || phone.length > 30){
        return false;
    }
    else return true;
}

//numbers
export const isNumber = (number) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(!pattern.test(number) || number === '0' || number < 0){
        return false;
    }
    else return true;
}
//numbers
export const isPositiveNumber = (number) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(!pattern.test(number)){
        return false;
    }
    else return true;
}

//tag removal
export const removeTags = (para) => {
    let newPara = para.replaceAll('<','').replaceAll('>','');
    return newPara;
}

//web url 
export const isWebURL = (link) => {
    if(removeTags(link).match(/^(?:https?:\/\/(?:www\.)?|www\.)[a-z0-9]+(?:[-.][a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/\S*)?$/)){
        return true;
    }
    else return false;
}

