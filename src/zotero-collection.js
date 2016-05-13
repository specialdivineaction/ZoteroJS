/**
 * Zotero allows users to organize items into a hierarchy of collections.
 */
class ZoteroCollection {
  /**
   * @param  {ZoteroLibrary} library
   * @param  {ZoteroCollectionDTO} dto
   */
  constructor(library, dto) {
    /** @type {ZoteroLibrary} */
    this.library = library;

    /** @type {string} */
    this.id = dto.key;

    /** @type {integer} */
    this.version = dto.version;

    /** @type {string} */
    this.name = dto.data.name;

    /** @type {string} */
    this.parentId = dto.data.parentCollection;
  }

  /**
   * @return {boolean} True if this collection has a parent collection.
   */
  hasParent() {
    return this.parentId ? true : false;
  }

  /**
   * @return {Promise.<ZoteroCollection>|null} Resolves to the parent collection or null if this collection has no parent.
   */
  getParent() {
    return this.parentId ? this.library.getCollection(this.parentId) : null;
  }

  /**
   * Retrieves a list of all items belonging to only this collection. This method does not retrieve items recursively in sub-collections.
   * Use {@link ZoteroCollection#getAllItems} to retrieve items recursively instead.
   * @return {Promise.<ZoteroItem[]>} Resolves to a list of all items contained within this collection.
   */
  getItems() {
    // TODO implement
  }

  /**
   * Retrieves a list of all items belonging to this collection and all items in all sub-collections.
   * @return {Promise.<ZoteroItem[]>} Resolves to a list of all items contained within this collection and all sub-collections.
   */
  getAllItems() {
    // TODO implement
  }
}

export { ZoteroCollection };
