import { execSync } from 'child_process'
import { stringify } from 'querystring'

export function get(url, queries, headers) {
    //return if url is not given
    if (!url) return false

    //query string
    var query_data = stringify(queries)

    //process header object into curl options
    var headers_data = ''
    for (var key in headers) {
        headers_data += `-H "${key}: ${headers[key].replace(/(?<!\\)"|(?<=\\\\)"/g, '\\"')}" `
    }

    //run curl                  silent      headers        url      ? if query data       query data
    var curl = execSync('curl -s ' + headers_data + url + (query_data ? '?' : '') + query_data)
    if (curl) {
        return curl.toString()
    } else {
        return false
    }
}
export function post(url, data, headers) {
    //return if url or data is not given
    if (!url || !data) return false

    //curl uses JSON for POST data
    var data_data = JSON.stringify(data)

    //process header object into curl options
    var headers_data = ''
    for (var key in headers) {
        headers_data += `-H "${key}: ${headers[key].replace(/(?<!\\)"|(?<=\\\\)"/g, '\\"')}" `
    }

    //run curl                  silent      headers        url      ? if query data       query data
    var curl = execSync('curl -s -d ' + `'${data_data}'` + headers_data + url)
    if (curl) {
        return curl.toString()
    } else {
        return false
    }
}
export function direct(options) {
    //run curl                  silent     options
    var curl = execSync('curl -s ' + options)
    if (curl) {
        return curl.toString()
    } else {
        return false
    }
}