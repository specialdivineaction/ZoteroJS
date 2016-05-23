import { ZoteroItem } from './zotero-item';
import { ZoteroCollection } from './zotero-collection';
import ZoteroClient  from './index';
import * as mock from './zotero-item.mock';
import { expect } from 'chai';

describe('ZoteroItem', function () {
  it('should populate fields correctly', function () {
    let item = new ZoteroItem(null, mock.ITEM_DTO_TWO_COLLECTIONS);
    item.id.should.equal('DZ7P8B6R');
    item.version.should.equal(89);
    item.type.should.equal('journalArticle');
    expect(item.parentId).to.be.empty;
    expect(item.hasParent()).to.be.false;
    expect(item.getParent()).to.be.null;
    item.collectionIds.should.deep.equal(['6P4N3B3E', 'GE2NDIIU']);
  });

  describe('#getCollections', function () {
    let client = new ZoteroClient();
    let account = client.getUserAccount('2536190', 'kQjCccDZF3GIJigH3c7i5TXe');
    let library = account.getUserLibrary();
    this.slow(4000);

    it('should retrieve an array of collections', function () {
      let itemP = library.getItem('DZ7P8B6R');
      expect(itemP).to.be.ok;

      return itemP.then((item) => {
        let collectionsP = item.getCollections();
        expect(collectionsP).to.be.ok;

        return collectionsP.then((collections) => {
          collections.should.be.an('array');
          collections.every((collection) => collection.should.be.an.instanceof(ZoteroCollection));
        });
      });
    });
  });

  describe('#hasCollection', function () {
    it('should return false if the item does not belong to any collection', function () {
      let item = new ZoteroItem(null, mock.ITEM_DTO_NO_COLLECTIONS);
      expect(item.hasCollection()).to.be.false;
    });

    it('should return true if the item belongs to one collection', function () {
      let item = new ZoteroItem(null, mock.ITEM_DTO_ONE_COLLECTION);
      expect(item.hasCollection()).to.be.true;
    });

    it('should return true if the item belongs to more than one collection', function () {
      let item = new ZoteroItem(null, mock.ITEM_DTO_TWO_COLLECTIONS);
      expect(item.hasCollection()).to.be.true;
    });
  });
});
