import { ZoteroExecutor } from './zotero-executor';
import sinon from 'sinon';

class TestCommand {
  getUrl(baseUrl) {
    return baseUrl + '/foo';
  }

  configureRequest(request) {
    request.method = 'GET';
    return request;
  }

  handleResponse(response) {
    return response;
  }
}

describe('ZoteroExecutor', function () {
  let executor = new ZoteroExecutor('/test');

  it('should delegate request configuration to a command', function () {
    let command = new TestCommand();

    let getUrlSpy = sinon.spy(command, 'getUrl');
    let configureSpy = sinon.spy(command, 'configureRequest');

    executor.submit(command);

    getUrlSpy.called.should.be.true;
    configureSpy.called.should.be.true;
  });

  it('should send requests configured by command', function () {
    let server = sinon.fakeServer.create();
    let responseValue = { ok: true };

    server.respondWith('GET', '/test/foo?v=3', [
      200,
      {
        'Content-Type': 'application/json'
      },
      JSON.stringify(responseValue)
    ]);

    let promise = executor.submit(new TestCommand())
      .then(response => {
        response.should.eql(responseValue)
        return response;
      });

    server.respond();
    server.restore();

    return promise
  });
});
