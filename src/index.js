// @flow
import { ZoteroExecutor } from './zotero-executor';
import { ZoteroAccount } from './zotero-account';

/**
 * API entry point (Facade).
 */
class ZoteroClient {
  /*:: executor: ZoteroExecutor;*/

  /**
   * @param {string} [baseUrl] URL of Zotero API endpoint.
   */
  constructor(baseUrl/*: string*/) {
    /** @type {ZoteroExecutor} */
    this.executor = new ZoteroExecutor(baseUrl);
  }

  /**
   * @return {ZoteroAccount} a default account that is not tied to any user and is not authenticated.
   */
  getAnonymousAccount()/*: ZoteroAccount*/ {
    return new ZoteroAccount('-1', null, this.executor);
  }

  /**
   * @param  {string} userId
   * @return {ZoteroAccount} an account belonging to the user with the specified ID, but is not authenticated.
   */
  getUnauthenticatedAccount(userId/*: string*/)/*: ZoteroAccount*/ {
    return new ZoteroAccount(userId, null, this.executor);
  }

  /**
   * @param  {string} userId
   * @param  {string} authToken
   * @return {ZoteroAccount} an authenticated account belonging to the user with the specified ID.
   */
  getUserAccount(userId/*: string*/, authToken/*: string*/)/*: ZoteroAccount*/ {
    return new ZoteroAccount(userId, authToken, this.executor);
  }
}

export default ZoteroClient;
