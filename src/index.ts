import fetch from 'node-fetch';
const baseurl = 'https://beta.mymemestore.com/api';
enum SafeSearch {
    on = 'on',
    off = 'off'
};
const version = 'v1';

class Content {
    // height: number;
    id: string;
    // size: number;
    // mimetype: string;
    //nsfw: boolean;
    url: string;
    //width: number;
    isnsfw: boolean;//remove me after update

    constructor(result: any) {
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

export class MMS {
    apikey: string;

    /**
     * Initialize the library with your api key
     * @param apikey 
     */
    constructor(apikey: string) {
        this.apikey = apikey;
    }

    /**
     * Search any content on My Meme Store
     * @param query 
     * @param limit 
     * @param safesearch 
     */
    SearchAny(query: string, limit?: number, safesearch?: SafeSearch): Promise<Content[]> {
        return fetch(`${baseurl}/${this.apikey}/${version}/posts/any?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }

    /**
     * Search only static content
     * @param query 
     * @param limit 
     * @param safesearch 
     */
    SearchImages(query: string, limit?: number, safesearch?: SafeSearch): Promise<Content[]> {
        return fetch(`${baseurl}/${this.apikey}/${version}/posts/image?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }

    /**
     * Search only gifs
     * @param query 
     * @param limit 
     * @param safesearch 
     */
    SearchGifs(query: string, limit?: number, safesearch?: SafeSearch): Promise<Content[]> {
        return fetch(`${baseurl}/${this.apikey}/${version}/posts/gif?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }

    /**
     * Returns a specific content
     * @param id 
     */
    GetSpecific(id: string) {
        return fetch(`${baseurl}/${this.apikey}/${version}/posts/${id}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }

    /**
     * Get all your content
     * @param query 
     * @param limit 
     * @param safesearch 
     */
    SearchAllMyContent(query?: string, limit?: number, safesearch?: SafeSearch): Promise<Content[]> {
        return fetch(`${baseurl}/${this.apikey}/${version}/mystore/any${query ? `?query=${query}` : ''}${limit ? `${query ? '&' : '?'}limit=${limit}` : ''}${safesearch ? `${(!query && !limit) ? '?' : '&'}safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }

    /**
     * Search only static content you posted
     * @param query 
     * @param limit 
     * @param safesearch 
     */
    SearchMyImages(query?: string, limit?: number, safesearch?: SafeSearch): Promise<Content[]> {
        return fetch(`${baseurl}/${this.apikey}/${version}/mystore/image${query ? `?query=${query}` : ''}${limit ? `${query ? '&' : '?'}limit=${limit}` : ''}${safesearch ? `${(!query && !limit) ? '?' : '&'}safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }

    /**
     * Search only gifs you posted
     * @param query 
     * @param limit 
     * @param safesearch 
     */
    SearchMyGifs(query?: string, limit?: number, safesearch?: SafeSearch): Promise<Content[]> {
        return fetch(`${baseurl}/${this.apikey}/${version}/mystore/gif${query ? `?query=${query}` : ''}${limit ? `${query ? '&' : '?'}limit=${limit}` : ''}${safesearch ? `${(!query && !limit) ? '?' : '&'}safesearch=${safesearch}` : ''}`)
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
    SearchWithTags(tag: string, query: string, limit?: number, safesearch?: SafeSearch): Promise<Content[]> {
        return fetch(`${baseurl}/${this.apikey}/${version}/tag/${tag}?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
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
    SearchWithCategory(category: string, query: string, limit?: number, safesearch?: SafeSearch): Promise<Content[]> {
        return fetch(`${baseurl}/${this.apikey}/${version}/category/${category}?query=${query}${limit ? `&limit=${limit}` : ''}${safesearch ? `&safesearch=${safesearch}` : ''}`)
            .then(result => result.json())
            .then(json => ConvertResults(json));
    }

}

/**
 * Converts json results into a Content array
 * @param results 
 */
function ConvertResults(results: any): Content[] {
    const CONTENT: Content[] = results['content'].map((content: any) => new Content(content));
    return CONTENT;
}
