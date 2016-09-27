// @flow

import { GetItemCommand } from './commands/library/get-item';
import { GetLibraryItemsCommand } from './commands/library/get-library-items';
import { GetCollectionCommand } from './commands/library/get-collection';
import { GetCollectionsCommand } from './commands/library/get-collections';
import { GetSubCollectionsCommand } from './commands/library/get-subcollections';
import { LibraryItemSearchCommand } from './commands/library/search';
import { CreateLibraryItemCommand } from './commands/library/create-item';
import { UpdateLibraryItemCommand } from './commands/library/update-item';

/*:: import { ZoteroAccount } from './zotero-account';*/
/*:: import { ZoteroCollection } from './zotero-collection';*/
/*:: import { ZoteroGroup } from './zotero-group';*/
/*:: import { ZoteroItem } from './zotero-item';*/

/**
 * Zotero items are stored in libraries, of which there are two types: user and group.
 */
class ZoteroLibrary {
  /*:: type: string;*/
  /*:: account: ZoteroAccount;*/
  /*:: id: string;*/
  /*:: version: number;*/
  /*:: name: string;*/

  /**
   * @param  {ZoteroAccount} account
   * @param  {ZoteroGroup} group
   */
  constructor(account/*: ZoteroAccount*/, group/*: ?ZoteroGroup*/) {
    /**
     * Library type: 'user' or 'group'
     * @type {string}
     */
    this.type = group ? "group" : "user";

    /** @type {ZoteroAccount} */
    this.account = account;

    /**
     * The inherited account or group identifier for this library depending on the type
     * @type {string}
     */
    this.id = group ? group.id : account.id;

    // TODO these need to come from somewhere
    /**
     * Inherited from group or defaults to -1 if a user library
     * @type {integer}
     */
    this.version = group ? group.version : -1;

    /**
     * Inherited from group name or defaults to 'User library for ${id}' if a user library
     * @type {string}
     */
    this.name = group ? group.name : `User library for ${this.id}`;
  }

  /**
   * Find all items in the current library matching the given query criteria
   * @param {string} query
   * @return {Promise.<ZoteroItem[]>}
   */
  searchItems(query/*: string*/)/*: Promise<ZoteroItem[]>*/ {
    let command = new LibraryItemSearchCommand(this, query);
    return command.execute();
  }

  /**
   * Find all items in the current library and all sub-collections that match the given query criteria
   * @param {string} query
   * @return {Promise.<ZoteroItem[]>}
   */
  searchAllItems(query/*: string*/)/*: Promise<ZoteroItem[]>*/ {
    let command = new LibraryItemSearchCommand(this, query, true);
    return command.execute();
  }

  /**
   * Retrieve all items from the Zotero Library API
   * @return {Promise.<ZoteroItem[]>}
   */
  getItems()/*: Promise<ZoteroItem[]>*/ {
    let command = new GetLibraryItemsCommand(this);
    return command.execute();
  }

  /**
   * Retrieve all items recursively beneath this library.
   * @return {Promise.<ZoteroItem[]>}
   */
  getAllItems()/*: Promise<ZoteroItem[]>*/ {
    let command = new GetLibraryItemsCommand(this, true);
    return command.execute();
  }

  /**
   * Retrieve an item by ID from the Zotero Library API
   * @param  {string} id
   * @return {Promise.<ZoteroItem>}
   */
  getItem(id/*: string*/)/*: Promise<ZoteroItem>*/ {
    let command = new GetItemCommand(this, id);
    return command.execute();
  }

  /**
   * Retrieve all collections
   * @return {Promise.<ZoteroCollection[]>}
   */
  getCollections()/*: Promise<ZoteroCollection[]>*/ {
    let command = new GetCollectionsCommand(this);
    return command.execute();
  }

  /**
   * Retrieve a collection by ID from the Zotero Library API
   * @param  {string} id
   * @return {Promise.<ZoteroCollection>}
   */
  getCollection(id/*: string*/)/*: Promise<ZoteroCollection>*/ {
    let command = new GetCollectionCommand(this, id);
    return command.execute();
  }

  /**
   * Retrieve sub-collections from a collection identified by the given ID
   * @param  {string} parentId
   * @return {Promise.<ZoteroCollection[]>}
   */
  getSubCollections(parentId/*: string*/)/*: Promise<ZoteroCollection[]>*/ {
    let command = new GetSubCollectionsCommand(this, parentId);
    return command.execute();
  }

  /**
   * Saves an item to the Zotero API. If the provided item does not already exist (i.e. have a key),
   * then a new item will be created and a new key assigned.
   * @param {object} item - item properties; this can come from {@link ZoteroItem#properties} or from {@link ZoteroClient#getTemplate}
   * @return {Promise.<ZoteroItem>} - resolves to the created or updated item on success
   */
  saveItem(item/*: Object*/)/*: Promise<ZoteroItem>*/ {
    if (item.key) {
      let command = new UpdateLibraryItemCommand(this, item);
      return command.execute().then(key => this.getItem(key));
    } else {
      let command = new CreateLibraryItemCommand(this, item);
      return command.execute();
    }
  }
}

export { ZoteroLibrary };
