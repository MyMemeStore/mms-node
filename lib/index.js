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
class Content {
    constructor(result) {
        //this.height = result.height;
        this.id = result.id;
        //this.size = result.imagesize;
        //this.mimetype = result.contenttype;
        //this.nsfw = result.isnsfw;
        this.url = result.downloadurl;
        //this.width = result.width;
        this.isnsfw = result.isnsfw;
    }
}
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
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/content/any?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }
    /**
     * Search only static content
     * @param query
     * @param limit
     * @param safesearch
     */
    SearchImages(query, limit, safesearch) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/content/image?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }
    /**
     * Search only gifs
     * @param query
     * @param limit
     * @param safesearch
     */
    SearchGifs(query, limit, safesearch) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/content/gif?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }
    /**
     * Returns a specific content
     * @param id
     */
    GetSpecific(id) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/content/${id}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }
    /**
     * Get all your content
     * @param query
     * @param limit
     * @param safesearch
     */
    SearchAllMyContent(query, limit, safesearch) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/mystore/any${query ? `?query=${query}` : ''}${limit ? `${query ? '&' : '?'}limit=${limit}` : ''}${safesearch ? `${(!query && !limit) ? '?' : '&'}safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }
    /**
     * Search only static content you posted
     * @param query
     * @param limit
     * @param safesearch
     */
    SearchMyImages(query, limit, safesearch) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/mystore/image${query ? `?query=${query}` : ''}${limit ? `${query ? '&' : '?'}limit=${limit}` : ''}${safesearch ? `${(!query && !limit) ? '?' : '&'}safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }
    /**
     * Search only gifs you posted
     * @param query
     * @param limit
     * @param safesearch
     */
    SearchMyGifs(query, limit, safesearch) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/mystore/gif${query ? `?query=${query}` : ''}${limit ? `${query ? '&' : '?'}limit=${limit}` : ''}${safesearch ? `${(!query && !limit) ? '?' : '&'}safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }
    /**
     * Search all posts within a certain tag
     * @param tag
     * @param query
     * @param limit
     * @param safesearch
     */
    SearchWithTags(tag, query, limit, safesearch) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/tag/${tag}?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }
    /**
     * Search all posts within a certain category
     * @param category
     * @param query
     * @param limit
     * @param safesearch
     */
    SearchWithCategory(category, query, limit, safesearch) {
        return node_fetch_1.default(`${baseurl}/${this.apikey}/${version}/category/${category}?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }
}
exports.MMS = MMS;
/**
 * Converts json results into a Content array
 * @param results
 */
function ConvertResults(results) {
    const CONTENT = results['content'].map((content) => new Content(content));
    return CONTENT;
}
//# sourceMappingURL=index.js.map