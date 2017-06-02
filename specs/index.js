let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Global Stats', () => {

  describe('/GET stats', () => {

    it('should return service global data', done => {

      chai.request(server).get('/stats').end((error, response) => {

        response.should.have.status(200);
        response.body.should.be.a('object');
        done();

      });

    });

  });

});

describe('Users', () => {

  const randomUserName = `Rich Hickey ${Math.random()}`;

  describe('/POST users', () => {

    it('should create a new user', done => {

      chai
        .request(server)
        .post('/users')
        .send({
          id: randomUserName
        })
        .end((error, response) => {

          response.should.have.status(201);
          done();

        });

    });

  });

  describe('/DELETE users', () => {

    it('should delete a user', done => {

      chai
        .request(server)
        .delete(`/users/${randomUserName}`)
        .end((error, response) => {

          response.should.have.status(204);
          done();

        });

    });

  });

});

describe('URLs', () => {

  const randomURL = `http://example.com/somePage-${Math.random()}`;
  let urlCode;

  describe('/POST users/:userId/urls', () => {

    it('should create a new URL', done => {

      // o usuário 42 como default
      chai
        .request(server)
        .post('/users/42/urls')
        .send({
          url: randomURL
        })
        .end((error, response) => {

          response.should.have.status(201);
          urlCode = response.body.code;
          done();

        });

    });

    describe('/GET urls/:code', () => {

      it('should send a redirect', done => {

        chai.request(server).get(`/urls/${urlCode}`).end((error, response) => {

          response.should.redirect;
          done();

        });

      });

      describe('/DELETE urls/:code', () => {

        it('should delete a url', done => {

          chai
            .request(server)
            .delete(`/urls/${urlCode}`)
            .end((error, response) => {

              response.should.have.status(204);
              done();

            });

        });

      });

    });

  });

});
