import { ZoteroClient } from './zotero-client';
import { ZoteroAccount } from './zotero-account';
import { ZoteroItemType } from './fields/zotero-item-type';
import { ZoteroItemField } from './fields/zotero-item-field';
import { expect } from 'chai';

describe('ZoteroClient', function () {
  const client = new ZoteroClient();

  it('should use the default zotero api endpoint if none is provided', function () {
    client.executor.baseUrl.should.equal('https://api.zotero.org');
  });

  it('should allow a custom endpoint to be provided', function () {
    let baseUrl = '/test';
    let client2 = new ZoteroClient(baseUrl);
    client2.executor.baseUrl.should.equal(baseUrl)
  });

  describe('#getAnonymousAccount', function () {
    it('should get an anonymous account', function () {
      let account = client.getAnonymousAccount();
      account.should.be.ok;
      account.should.be.an.instanceof(ZoteroAccount);
      account.id.should.equal('-1');
      expect(account.authToken).to.not.exist;
    });
  });

  describe('#getUnauthenticatedAccount', function () {
    it('should get an unauthenticated user account', function () {
      let accountId = '475425';
      let account = client.getUnauthenticatedAccount(accountId);
      account.should.be.ok;
      account.should.be.an.instanceof(ZoteroAccount);
      account.id.should.equal(accountId);
      expect(account.authToken).to.not.exist;
    });
  });

  describe('#getUserAccount', function () {
    it('should get an authenticated user account', function () {
      let accountId = '2536190';
      let authToken = 'kQjCccDZF3GIJigH3c7i5TXe';
      let account = client.getUserAccount(accountId, authToken);
      account.should.be.ok;
      account.should.be.an.instanceof(ZoteroAccount);
      account.id.should.equal(accountId);
      account.authToken.should.equal(authToken);
    });
  });

  describe('#getItemTypes', function () {
    this.timeout(4000);

    it('should get a listing of available item types', function () {
      let typesP = client.getItemTypes();
      expect(typesP).to.be.ok;
      return typesP.then(types => {
        types.should.be.an('array');
        types.should.not.be.empty;
        types.every(type => type.should.be.an.instanceof(ZoteroItemType));
      });
    });
  });

  describe('#getItemFields', function () {
    this.timeout(4000);

    it('should get a listing of all fields', function () {
      let fieldsP = client.getItemFields();
      expect(fieldsP).to.be.ok;
      return fieldsP.then(fields => {
        fields.should.be.an('array');
        fields.should.not.be.empty;
        fields.every(field => field.should.be.an.instanceof(ZoteroItemField));
      });
    });

    it('should get a listing of fields for the given item', function () {
      let account = client.getAnonymousAccount();
      let itemType = new ZoteroItemType(account, client.executor, {
        itemType: 'book',
        localized: 'Book'
      });
      let fieldsP = client.getItemFields(itemType);
      expect(fieldsP).to.be.ok;
      return fieldsP.then(fields => {
        fields.should.be.an('array');
        fields.should.not.be.empty;
        fields.every(field => field.should.be.an.instanceof(ZoteroItemField));
      });
    });
  });

  describe('#getCreatorFields', function () {
    this.timeout(10000);

    it('should get a listing of all creator fields', function () {
      let fieldsP = client.getCreatorFields();
      expect(fieldsP).to.be.ok;
      return fieldsP.then(fields => {
        fields.should.be.an('array');
        fields.should.not.be.empty;
        fields.every(field => field.should.be.an.instanceof(ZoteroItemField));
      });
    });
  });
});
