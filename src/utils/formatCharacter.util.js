
export function isNotEngCharOrNumber(input) {
    const formatEng = /[^a-zA-Z0-9]/;
    if (formatEng.test(input))
        return true;
    return false;
}

export function allnumeric(inputtxt) {
    const numbers = /^[0-9]+$/;
    if (inputtxt.match(numbers)) {
        return true;
    }
    else {
        return false;
    }
}

export function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    return (false)
}

export function ValidateLine(inputtxt) {
    const formatline = /[`!#$%^&*()+\-={};':"\\|,<>?~]/;
    if (formatline.test(inputtxt)) {
        return false;
    }
    else {
        return true;
    }
}

export function IsProhibitSpecial(input) {
    const formatname = /[`!@#$%^&*()_+\-={};':"\\|,.<>?~]/;
    if (formatname.test(input))
        return true;
    return false;
}

export function IsHomeProbitSpecial(input) {
    const formathome = /[`@#$%^&*;'|<>~]/;
    if (formathome.test(input))
        return true;
    return false;
}
