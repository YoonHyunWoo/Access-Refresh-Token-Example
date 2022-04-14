module.exports = (cookieInput) => {
    var cookies = cookieInput.split(';');
    return [cookies[0].split('=')[1],cookies[1].split('=')[1]]
}

