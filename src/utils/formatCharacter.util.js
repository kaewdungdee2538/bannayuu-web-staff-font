const formatEng = /[^a-zA-Z0-9]/;
export function isNotEngCharOrNumber(input) {
    if (formatEng.test(input))
        return true;
    return false;
}