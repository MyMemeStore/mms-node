"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const baseurl = 'https://beta.mymemestore.com/api';
var SafeSearch;
(function (SafeSearch) {
    SafeSearch["on"] = "on";
    SafeSearch["off"] = "off";
})(SafeSearch || (SafeSearch = {}));
;
const version = 'v1';
class MMS {
    /**
     * Initialize the library with your api key
     * @param apikey
     */
    constructor(apikey) {
        this.apikey = apikey;
    }
    /**
     * Search any content on My Meme Store
     * @param query
     * @param limit
     * @param safesearch
     */
    SearchAny(query, limit, safesearch) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/posts/any?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => {
            console.log('STATUS: ', result.status);
            return result.json();
        })
            .then(json => {
            console.log('CONTENT: ', json);
            return json;
        })
            .catch(error => {
            console.log('GOT ERROR: ', error);
            throw new Error(error);
        });
    }
    /**
     * Search only static content
     * @param query
     * @param limit
     * @param safesearch
     */
    SearchImages(query, limit, safesearch) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/posts/image?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => {
            return result.json();
        });
    }
    /**
     * Search only gifs
     * @param query
     * @param limit
     * @param safesearch
     */
    SearchGifs(query, limit, safesearch) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/posts/gif?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => {
            return result.json();
        });
    }
}
exports.MMS = MMS;
//# sourceMappingURL=index.js.map