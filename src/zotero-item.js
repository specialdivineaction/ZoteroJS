// @flow

/*:: import { ZoteroCollection } from './zotero-collection';*/
/*:: import { ZoteroLibrary } from './zotero-library';*/

/**
 * Wrapper around an item returned by the Zotero API with helper methods for retrieving related data.
 */
class ZoteroItem {
  /*:: library: ZoteroLibrary;*/
  /*:: id: string;*/
  /*:: version: number;*/
  /*:: type: string;*/
  /*:: parentId: string;*/
  /*:: collectionIds: string[];*/
  /*:: meta: { [key: string]: any };*/
  /*:: properties: { [key: string]: any };*/

  /**
   * @param {ZoteroLibrary} library [description]
   * @param {ZoteroItemDTO} dto [description]
   */
  constructor(library/*: ZoteroLibrary*/, dto/*: Object*/) {
    /** @type {ZoteroLibrary} */
    this.library = library;

    /** @type {string} */
    this.id = dto.key;

    /** @type {integer} */
    this.version = dto.version;

    /** @type {object} */
    this.meta = dto.meta;

    if (dto.data) {
      /** @type {string} */
      this.type = dto.data.itemType;

      /** @type {string} */
      this.parentId = dto.data.parentItem;

      /**
       * A list of collection ids to which this item belongs.
       * @type {string[]}
       */
      this.collectionIds = dto.data.collections;

      /**
       * Arbitrary key/value item data pairs
       * @type {object}
       */
      this.properties = dto.data;
    }
  }

  /**
   * @return {boolean} True if this item has a parent item.
   */
  hasParent()/*: boolean*/ {
    return this.parentId ? true : false;
  }

  /**
   * @return {Promise.<ZoteroItem>|null} Resolves to parent item or null if this item has no parent.
   */
  getParent()/*: ?Promise<ZoteroItem>*/ {
    return this.parentId ? this.library.getItem(this.parentId) : null;
  }

  /**
   * @return {boolean} True if this item belongs to at least one collection.
   */
  hasCollection()/*: boolean*/ {
    return this.collectionIds && this.collectionIds.length > 0;
  }

  /**
   * @return {Promise.<ZoteroCollection[]>} Resolves to a list of all collections that contain this item.
   */
  getCollections()/*: Promise<ZoteroCollection[]>*/ {
    if (!this.collectionIds) {
      return Promise.resolve([]);
    }

    let promises = this.collectionIds.map(id => this.library.getCollection(id));

    return Promise.all(promises);
  }

  /**
   * @override
   * @return {string}
   */
  toString()/*: string*/ {
    let parts/*: string[]*/ = [];

    let creatorSummary = this.meta && this.meta.creatorSummary && this.meta.creatorSummary.trim()
    if (creatorSummary) {
      parts.push(creatorSummary);
    }

    let parsedDate = this.meta && this.meta.parsedDate && this.meta.parsedDate.trim();
    if (parsedDate) {
      parts.push(`(${parsedDate})`);
    }

    let title = this.properties && this.properties.title;
    if (title) {
      parts.push(`<em>${title}</em>`);
    }

    if (parts.length === 0) {
      parts.push('[unknown title]');
    }

    return parts.join(' ');
  }
}

export { ZoteroItem };
