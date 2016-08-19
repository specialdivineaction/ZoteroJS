// @flow
import { ZoteroExecutor } from './zotero-executor';
import { ZoteroAccount } from './zotero-account';
import { GetCreatorFieldsCommand } from './commands/fields/get-creator-fields';
import { GetItemTypesCommand } from './commands/fields/get-item-types';
import { GetItemFieldsCommand } from './commands/fields/get-item-fields';

/*:: import { ZoteroItemField } from './fields/zotero-item-field';*/
/*:: import { ZoteroItemType } from './fields/zotero-item-type';*/

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

  /**
   * @return {Promise.<ZoteroItemType[]>} A list of available item types
   */
  getItemTypes()/*: Promise<ZoteroItemType[]>*/ {
    let account = this.getAnonymousAccount();
    let command = new GetItemTypesCommand(account, this.executor);
    return this.executor.submit(command);
  }

  /**
   * Retrieves a list of all available item fields. If an item type is supplied, retrieves a list of item fields appropriate for the given item type.
   * @param {ZoteroItemType} [itemType] An item type for which to retrieve item fields
   * @return {Promise.<ZoteroItemField[]>} A list of available item fields
   */
  getItemFields(itemType/*: ?ZoteroItemType*/)/*: Promise<ZoteroItemField[]>*/ {
    let account = this.getAnonymousAccount();
    let command = new GetItemFieldsCommand(account, itemType);
    return this.executor.submit(command);
  }

  /**
   * @return Promies.<ZoteroItemField[]> A list of available creator fields
   */
  getCreatorFields()/*: Promise<ZoteroItemField[]>*/ {
    let account = this.getAnonymousAccount();
    let command = new GetCreatorFieldsCommand(account);
    return this.executor.submit(command);
  }
}

export default ZoteroClient;
