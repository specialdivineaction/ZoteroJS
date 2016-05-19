import ZoteroClient from './index';
import { ZoteroAccount } from './zotero-account';
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
});
