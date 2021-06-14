const formatEng = /[^a-zA-Z0-9]/;
export function isNotEngCharOrNumber(input) {
    if (formatEng.test(input))
        return true;
    return false;
}

export function allnumeric(inputtxt) {
    var numbers = /^[0-9]+$/;
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