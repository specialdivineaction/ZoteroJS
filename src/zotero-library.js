// @flow

import { GetItemCommand } from './commands/get-item';
import { GetLibraryItemsCommand } from './commands/get-library-items';
import { GetCollectionCommand } from './commands/get-collection';
import { GetCollectionsCommand } from './commands/get-collections';
import { GetSubCollectionsCommand } from './commands/get-subcollections';

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

}

export { ZoteroLibrary };
