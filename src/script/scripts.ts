export const changeTo = (data: any, arg: '' | null) => {
    type argType = '' | null;

    let argFrom: argType = '';
    let argTo: argType = null

    switch (arg) {
        case null: argFrom = ''; argTo = null; break;
        case '': argFrom = null; argTo = ''; break;
        default: break;
    }

    let formData = JSON.parse(JSON.stringify(data))

    for (let key in formData) {
        if (formData[key] === argFrom) formData[key] = argTo;
    }

    return formData;
}

