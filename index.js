const cp = require('child_process')
const qs = require('querystring')

module.exports.get = function get(url, queries, headers) {
    //return if url is not given
    if (!url) return false

    //query string
    var query_data = qs.stringify(queries)

    //process header object into curl options
    var headers_data = ''
    for (var key in headers) {
        headers_data += `-H "${key}: ${headers[key].replace(/(?<!\\)"|(?<=\\\\)"/g, '\\"')}" `
    }

    var curl;
    try {
        //run curl             silent      headers        url      ? if query data       query data
        curl = cp.execSync('curl -s -S ' + headers_data + url + (query_data ? '?' : '') + query_data, { stdio: 'pipe', encoding: 'utf8' })
    } catch (error) {
        curl = error
    }
    if (typeof curl !== 'object') {
        return curl.toString()
    } else {
        return curl
    }
}

module.exports.post = function post(url, data, headers) {
    //return if url or data is not given
    if (!url || !data) return false

    //curl uses querystring for POST data
    var data_data = qs.stringify(data)

    //process header object into curl options
    var headers_data = ''
    for (var key in headers) {
        headers_data += `-H "${key}: ${headers[key].replace(/(?<!\\)"|(?<=\\\\)"/g, '\\"')}" `
    }

    var curl;
    try {
        //run curl               silent            data          headers        url
        curl = cp.execSync('curl -s -S -d ' + `"${data_data}" ` + headers_data + url, { stdio: 'pipe', encoding: 'utf8' })
    } catch (error) {
        curl = error
    }
    if (typeof curl !== 'object') {
        return curl.toString()
    } else {
        return curl
    }
}

module.exports.direct = function direct(options) {

    var curl;
    try {
        //run curl              silent     options
        curl = cp.execSync('curl -s -S ' + options, { stdio: 'pipe', encoding: 'utf8' })
    } catch (error) {
        curl = error
    }
    if (typeof curl !== 'object') {
        return curl.toString()
    } else {
        return curl
    }
}