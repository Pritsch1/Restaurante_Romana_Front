function copy_only_numbers(string) {
    let value_inputed = string;
    let value_inputed_copy = "";
    let i, ascii;
    i = ascii = 0;

    for (i = 0; i < value_inputed.length; i++) {
        ascii = value_inputed.charCodeAt(i);
        if (ascii > 47 && ascii < 58) {
            value_inputed_copy += value_inputed[i];
        }
    }

    return value_inputed_copy;
}

export function count_digits(e) {
    let value_inputed = "";
    let value_inputed_length = 0;

    value_inputed = e.target.value;
    value_inputed = copy_only_numbers(value_inputed);
    value_inputed_length = value_inputed.length;
    //console.log(value_inputed_length);
    return value_inputed_length;
}

export function allow_only_numbers(e) {
    let value_inputed = e.target.value;
    return copy_only_numbers(value_inputed);
}

export function zip_auto_correct(e) {
    let value_inputed, value_inputed_numbers, zip = "";
    value_inputed = value_inputed_numbers = zip = "";
    let i, l, cursor_position;
    i = l = cursor_position = 0;

    cursor_position = e.target.selectionStart; 
    value_inputed = e.target.value;
    value_inputed_numbers = copy_only_numbers(value_inputed);    
    l = value_inputed_numbers.length

    if (l > 8) { l = 8; } //limits input size

    //add formating to zip code "00000-000"
    for (i = 0; i < l; i++) {
        if (i === 5) { zip += "-"; }
        zip += value_inputed_numbers[i];
    }

    e.target.value = zip;   //This is not redundant. It's for correcting the cursor placement.

    /*
    
    As of now I think this does the job. I still need to check for possible errors.
    For the best of my knowledge it is placing the cursor correctly. I need a break tho...
    Type a number at the phone field. The array makes the formatting char disapear.
    Maybe use an array again with zip variable;

    */


    //places the cursor correctly
    if ((e.target.selectionEnd === 6 || e.target.selectionEnd === 7) && e.nativeEvent.inputType !== "deleteContentBackward" && zip[7] === undefined) {
        cursor_position++;
    }
    e.target.selectionStart = cursor_position; 
    e.target.selectionEnd = cursor_position;
    if (e.target.selectionStart === 6 && e.nativeEvent.inputType !== "deleteContentBackward") {
        e.target.selectionStart = 7;
        e.target.selectionEnd = 7;
    }

    return zip; //Must return zip
}

export function phone_auto_correct(e) {
    let value_inputed = e.target.value;
    let value_inputed_copy = "";
    /*let phone_format = [["(", "", "", ")", "", "", "", "", "-", "", "", "", ""], ["(", "", "", ")", "", "", "", "", "", "-", "", "", "", ""]];
    let i, j, k, l;
    i = j = k = l = 0;*/
    value_inputed_copy = copy_only_numbers(value_inputed);
    //prevents wrong chars from being printed at 'copy formated number'
    /*l = value_inputed_copy.length

    //format phone
    if (value_inputed_copy.length < 12) {
        //land or mobile?
        if (value_inputed_copy.length < 11) { k = 0; }
        else { k = 1; }

        j = 0;
        for (i = 0; i < value_inputed_copy.length; i++) {
            if (phone_format[k][j] !== "" && phone_format[k][j] !== undefined) { j++; l++; }
            phone_format[k][j] = value_inputed_copy[i];
            j++;
        }

        //copy formated number
        value_inputed_copy = "";
        for (i = 0; i < l; i++) {
            //add space between ')' and next digit
            if (i === 4) { value_inputed_copy += " "; }
            value_inputed_copy += phone_format[k][i];
        }
    }*/

    return value_inputed_copy;
}