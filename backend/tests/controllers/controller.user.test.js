const sinon = require("sinon");
const { expect } = require("chai");
const serviceUser = require("../../src/services/serviceUser");
const controllerUser = require("../../src/controllers/controllerUser");
// const sandbox = require("sinon").createSandbox();

describe("A chamada da controller Users", () => {
  describe("Quando existem users no BD", () => {
    const resultExecute = [
      {
        user_id: 1,
        name_user: "João",
        password: "joãosilva",
        email: "joao@joao.com",
      },
      {
        user_id: 2,
        name_user: "Natália",
        password: "natybarros",
        email: "naty@naty.com",
      },
    ];

    const request = {};
    const response = [];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(serviceUser, "getAllUsers").resolves(resultExecute);
    });

    after(() => {
      serviceUser.getAllUsers.restore();
    });
    it("Quando existe users no BD, o status é chamado, passando o código 200", async () => {
      await controllerUser.getAllUsers(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it("Recebe um retorno contendo um array de objetos, com as chaves user_id, name_user, password, email", async () => {
      await controllerUser.getAllUsers(request, response);

      const [users] = resultExecute;

      expect(users).to.have.all.keys(
        "user_id",
        "name_user",
        "password",
        "email"
      );

      expect(response.json.calledWith(resultExecute)).to.be.equal(true);
    });
  });
  describe("Verifica o user pesquisado pelo id", () => {
    describe("Quando o id é encontrado", () => {
      const request = {};
      const response = [];

      const responseExecute = {
        user_id: 2,
        name_user: "Natália",
        password: "natybarros",
        email: "naty@naty.com",
      };

      before(() => {
        request.params = { user_id: 2 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(serviceUser, "getUserById").resolves(responseExecute);
      });

      after(() => {
        serviceUser.getUserById.restore();
      });
      it("Se é retornado o status 200", async () => {
        await controllerUser.getUserById(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
    describe("Quando o id não  é encontrado", () => {
      const request = {};
      const response = [];
      const err = { status: 404, message: "User not found" };

      before(() => {
        request.params = { user_id: 50 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(serviceUser, "getUserById").throws(err);
      });

      after(() => {
        serviceUser.getUserById.restore();
      });
      it('Retorna a mensagem de erro  "User not found"', async () => {
        try {
        } catch (err) {
          expect(err.message).to.be.equal("User not found");
        }
      });
    });
  });
  describe("Criação de um novo user", () => {
    describe("O user é criado", () => {
      const request = {};
      const response = {};

      const newUser = {
        name_user: "Fernanda",
        password: "ferlima",
        email: "fer@fer.com",
      };

      before(() => {
        request.body = {
          name_user: "Fernanda",
          password: "ferlima",
          email: "fer@fer.com",
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(serviceUser, "createUser").resolves(newUser);
      });
      it("Status 200 é retornado se o user é inserido", async () => {
        await controllerUser.createUser(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
  describe("Quando um user existente, realiza o login", () => {
    describe("O login é feito com sucesso", () => {
      const request = {};
      const response = {};

      const loginUser = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibmF0eUBuYXR5LmNvbSJ9LCJpYXQiOjE2NzA4NzE4NjAsImV4cCI6MTY3NjA1NTg2MH0._o5hkXLB3oAtxYHHrUOsb9OBi8aMrLv3-8ZfpUWGByE",
      };

      before(() => {
        request.body = {
          email: "naty@naty.com",
          password: "natybarros",
        };
      });

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(serviceUser, "userLogin").resolves(loginUser);

      after(() => {
        serviceUser.userLogin.restore();
      });

      it("É retornado o status 200 se o token é gerado", async () => {
        await controllerUser.loginUser(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
  describe("Quando o token não  é gerado", () => {
    const request = {};
    const response = [];
    const err = { status: 404, message: "Users not found" };

    before(() => {
      request.body = { email: "naty@naty.com", password: "natybaos" };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(serviceUser, "userLogin").throws(err);
    });

    after(() => {
      serviceUser.userLogin.restore();
    });
    it('Retorna a mensagem de erro  "Users not found"', async () => {
      try {
      } catch (err) {
        expect(err.message).to.be.equal("Users not found");
      }
    });
  });
});
