/**
 * Wrapper around an item returned by the Zotero API with helper methods for retrieving related data.
 */
class ZoteroItem {
  /**
   * @param {ZoteroLibrary} library [description]
   * @param {ZoteroItemDTO} dto [description]
   */
  constructor(library, dto) {
    /** @type {ZoteroLibrary} */
    this.library = library;

    /** @type {string} */
    this.id = dto.key;

    /** @type {integer} */
    this.version = dto.version;

    /** @type {string} */
    this.type = dto.data.itemType;

    /** @type {string} */
    this.parentId = dto.data.parentItem;

    /**
     * A list of collection ids to which this item belongs.
     * @type {string[]}
     */
    this.collectionIds = dto.data.collections;

  }

  /**
   * @return {boolean} True if this item has a parent item.
   */
  hasParent() {
    return this.parentId ? true : false;
  }

  /**
   * @return {Promise.<ZoteroItem>|null} Resolves to parent item or null if this item has no parent.
   */
  getParent() {
    return this.parentId ? this.library.getItem(this.parentId) : null;
  }

  /**
   * @return {boolean} True if this item belongs to at least one collection.
   */
  hasCollection() {
    return this.collectionIds && this.collectionIds.length > 0;
  }

  /**
   * @return {Promise.<ZoteroCollection[]>} Resolves to a list of all collections that contain this item.
   */
  getCollections() {
    if (!this.collectionIds) {
      return Promise.resolve([]);
    }

    let promises = this.collectionIds.map((id) => this.library.getCollection(id));

    return Promise.all(promises);
  }
}

export { ZoteroItem };
