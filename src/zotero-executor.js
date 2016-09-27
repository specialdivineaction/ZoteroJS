// @flow
import $ from 'jquery';
/*:: import { ResourceCommand } from './commands/resource-command';*/

/**
 * A basic wrapper for executing Zotero-based REST API requests.
 * This wrapper allows for shared settings, handling, auth configuration, rate-limiting/backoff, etc.
 */
class ZoteroExecutor {
  /*:: baseUrl: string;*/
  /*:: apiVersion: number;*/

  /**
   * @param {string} [baseUrl='https://api.zotero.org'] URL to Zotero API endpoint
   */
  constructor(baseUrl/*: string*/ = 'https://api.zotero.org') {
    /**
     * URL to Zotero API endpoint.
     * @type {string}
     */
    this.baseUrl = baseUrl;

    /**
     * Zotero API version
     * @constant
     * @default
     */
    this.apiVersion = 3;
  }

  /**
   * Submits a request
   * @param  {ResourceCommand} resourceCommand
   * @return {Promise.<object>}
   */
  submit(resourceCommand/*: ResourceCommand*/)/*: Promise<any>*/ {
    let request = this.makeRequest(resourceCommand);

    // append query string
    if (request.query) {
      let qs = $.param(request.query);
      if (qs.trim().length > 0) {
        request.url += '?' + qs;
      }
    }

    // set content type of body
    if (request.data && typeof request.data === 'object') {
      request.contentType = 'application/json; charset=UTF-8';
      request.data = JSON.stringify(request.data);
    }

    let response = $.ajax(request);
    let filteredResponse = this.interceptResponse(response);
    return resourceCommand.handleResponse(filteredResponse);
  }

  /**
   * Creates a jQuery request configuration object
   * @private
   * @param  {ResourceCommand} resourceCommand
   * @return {object}
   */
  makeRequest(resourceCommand/*: ResourceCommand*/)/*: Object*/ {
    let request = {
      url: resourceCommand.getUrl(this.baseUrl),
      // HACK Zotero server doesn't handle HTTP headers properly; send as query params instead
      // headers: {
      //   'Zotero-API-Version': this.apiVersion
      // },
      query: {
        v: 3
      }
    };

    return resourceCommand.configureRequest(request);
  }

  /**
   * Reads response value and performs any required rate limiting or backoff
   * @private
   * @param  {Promise.<object>}
   * @return {Promise.<object>}
   */
  interceptResponse(response/*: Promise<Object>*/)/*: Promise<Object>*/ {
    // TODO rate-limiting / backoff implementation
    return response;
  }
}

export { ZoteroExecutor };
