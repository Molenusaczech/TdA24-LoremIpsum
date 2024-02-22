let username = "TdA";
let password = "d8Ef6!dGG_pv";

let authString = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

export { authString };