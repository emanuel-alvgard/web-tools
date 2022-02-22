let xml_data = "<Name><First>Jonatan</First><hej><korv></korv></hej><hejs></hejs><Last>Nielsen</Last></Name>";

// @DONE
function parse_xml(data) {

    let result = '';
    let state = 0;

    let len = data.length;
    let i = 0;
    while (i < len) {

        // CLOSING TAG
        if (data[i] === "<" && data[i + 1] === "/") {
            i++;
            if (state === 0 && data[i - 2] === ">") { result += '""'; }
            if (state === 1) { result += '}'; }

            while (data[i] !== ">") { i++; }
            i++;
            state = 1;
            continue;
        }

        // OPENING TAG
        if (data[i] === "<") {
            i++;
            if (state === 0) { result += '{' }
            if (state === 1) { result += ','; }

            result += '"';
            while (data[i] !== ">") { result += data[i]; i++; }
            result += '"';
            result += ':'
            i++;
            state = 0;
            continue;
        }

        // DATA
        result += '"';
        while (data[i] !== "<") {
            if (data[i] === "&") {

                if (data[i + 1] === "l" &&
                    data[i + 2] === "t" &&
                    data[i + 3] === ";") { result += '<'; i += 4; continue; }

                if (data[i + 1] === "g" &&
                    data[i + 2] === "t" &&
                    data[i + 3] === ";") { result += '>'; i += 4; continue; }

                if (data[i + 1] === "a" &&
                    data[i + 2] === "m" &&
                    data[i + 3] === "p" &&
                    data[i + 4] === ";") { result += '&'; i += 5; continue; }

                if (data[i + 1] === "a" &&
                    data[i + 2] === "p" &&
                    data[i + 3] === "o" &&
                    data[i + 4] === "s" &&
                    data[i + 5] === ";") { result += "'"; i += 6; continue; }

                if (data[i + 1] === "q" &&
                    data[i + 2] === "u" &&
                    data[i + 3] === "o" &&
                    data[i + 4] === "t" &&
                    data[i + 5] === ";") { result += '"'; i += 6; continue; }
            }
            result += data[i];
            i++;
        }
        result += '"';
    }

    result += '}';
    return JSON.parse(result);
};

console.log(parse_xml(xml_data));

