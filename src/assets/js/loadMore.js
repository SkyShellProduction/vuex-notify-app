export default function loadMore (res, count = 3) {
    const messages = [];
    let amount = count > 0 ? count : 3;
    let len = res.length > amount ? amount : res.length;
    for (let i = 0; i < len; i++) {
        res[i].main = true;
        messages.push(res[i]);
    }
    return messages;
    // if(res.length > 2) {
    //     for (let i = 0; i < 2; i++) {
    //         res[i].main = true;
    //         messages.push(res[i]);
    //     }
    //     return messages;
    // }
    // else {
    //     for (let i = 0; i < res.length; i++) {
    //         res[i].main = true;
    //         messages.push(res[i]);
    //     }
    //     return messages;
    // }
}