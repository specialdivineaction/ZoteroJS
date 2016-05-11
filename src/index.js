import { ZoteroExecutor } from './zotero-executor';
import { ZoteroAccount } from './zotero-account';

/**
 * API entry point (Facade).
 */
class ZoteroClient {
  /**
   * @param {string} [baseUrl] URL of Zotero API endpoint.
   */
  constructor(baseUrl) {
    /** @type {ZoteroExecutor} */
    this.executor = new ZoteroExecutor(baseUrl);
  }

  /**
   * @return {ZoteroAccount} a default account that is not tied to any user and is not authenticated.
   */
  getAnonymousAccount() {
    return new ZoteroAccount(-1, null, this.executor);
  }

  /**
   * @param  {string} userId
   * @return {ZoteroAccount} an account belonging to the user with the specified ID, but is not authenticated.
   */
  getUnauthenticatedAccount(userId) {
    return new ZoteroAccount(userId, null, this.executor);
  }

  /**
   * @param  {string} userId
   * @param  {string} authToken
   * @return {ZoteroAccount} an authenticated account belonging to the user with the specified ID.
   */
  getUserAccount(userId, authToken) {
    return new ZoteroAccount(userId, authToken, this.executor);
  }
}

export default ZoteroClient;
