/**
 * This file exists solely for the purpose of housing JSDoc typedefs for the Zotero API data models
 */

/**
 * @typedef ZoteroItemDTO
 * @type {object}
 * @property {string} key Unique identifier for this item.
 * @property {integer} version
 * @property {ZoteroLibraryRefDTO} library
 * @property {object.<string, LinkDTO>} links
 * @property {object} meta
 * @property {string} meta.creatorSummary
 * @property {string} meta.parsedDate
 * @property {integer} meta.numChildren
 * @property {object} data
 * @property {string[]} [data.collections] List of collection ids.
 * @property {object.<string,string[]|string>} [data.relations] Mapping of RDF triples describing relationship between this item and other items.
 * @property {string} [parentItem] Id of parent item, if available.
 * @property {string} itemType
 */

/**
 * @typedef ZoteroCollectionDTO
 * @type object
 * @property {string} key A unique identifier for this collection.
 * @property {integer} version
 * @property {ZoteroLibraryRefDTO} library
 * @property {object} meta
 * @property {integer} meta.numCollections
 * @property {integer} meta.numItems
 * @property {object} data
 * @property {string} data.key
 * @property {integer} data.version
 * @property {string} data.name A display label for this collection.
 * @property {string} data.parentCollection Id of parent collection or false if this collection has no parent.
 * @property {object.<string, LinkDTO>} links
 */

/**
 * @typedef ZoteroLibraryRefDTO
 * @type {object}
 * @property {string} type
 * @property {string} id
 * @property {string} name
 * @property {object.<string, LinkDTO>} links
 */

/**
 * @typedef LinkDTO
 * @type object
 * @property {string} href
 * @property {string} type
 * @property {string} title
 * @property {integer} length
 */

/**
 * @typedef ZoteroGroupDTO
 * @type {object}
 * @property {string} id
 * @property {integer} version
 * @property {object} meta
 * @property {integer} meta.numItems
 * @property {string} meta.created
 * @property {string} meta.lastModified
 * @property {object} data
 * @property {string} data.name
 * @property {string} data.description
 * @property {string} data.url
 * @property {integer} data.owner
 */
