//@flow

/*:: import { ZoteroAccount } from '../zotero-account';*/

/**
 * Base command class for all resources and REST requests.
 * Everything request must take place in the context of a ZoteroAccount, but it's up to the individual
 * account configuration to decide whether this request should be authenticated.
 */
class ResourceCommand {
  /*:: account: ZoteroAccount;*/

  /**
   * @param {ZoteroAccount} account The acccount to use for this request context.
   */
  constructor(account/*: ZoteroAccount*/) {
    if (!account) {
      throw new Error('No account provided');
    }

    /** @type {ZoteroAccount} */
    this.account = account;
  }

  /**
   * Constructs the target resource URL for this command given a base endpoint URL.
   * @param  {string} baseUrl
   * @return {string}
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    return baseUrl;
  }

  /**
   * Configures request parameters before a request is issued.
   * @param  {object} request
   * @return {object} Updated request parameters
   */
  configureRequest(request/*: Object*/)/*: Object*/ {
    this.account.authenticate(request);
    return request;
  }

  /**
   * Transforms the response into a suitable data structure.
   * @param  {Promise.<object>} response
   * @return {Promise.<object>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<any>*/ {
    return response;
  }

  /**
   * Submits the current resource command for execution.
   * @return {Promise.<object>}
   */
  execute()/*: Promise<any>*/ {
    let executor = this.account.executor;
    return executor.submit(this);
  }
}

export { ResourceCommand };
