const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("./../../src/models/connection");
const usersModel = require("./../../src/models/modelUser");

describe("Testa model users", () => {
  describe("Retorna todos os users", async () => {
    const executeResponse = [[]];
    before(() => {
      sinon.stub(connection, "execute").resolves(executeResponse);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Retorna um array", async () => {
      const result = await usersModel.getAllUsers();
      expect(result).to.be.an("array");
    });
    it("Caso o array esteja vazio", async () => {
      const result = await usersModel.getAllUsers();
      expect(result).to.be.empty;
    });
  });
  describe("Quando existem users no BD", async () => {
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
    before(() => {
      sinon.stub(connection, "execute").resolves([resultExecute]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Retorna um array", async () => {
      const result = await usersModel.getAllUsers();
      expect(result).to.be.an("array");
    });
    it("O array não está vazio", async () => {
      const result = await usersModel.getAllUsers();
      expect(result).to.be.not.empty;
    });
    it("O array possui objetos", async () => {
      const [result] = await usersModel.getAllUsers();
      expect(result).to.be.an("object");
    });
    it("O objeto do array contém os atributos user_id, name_user, password, email", async () => {
      const [result] = await usersModel.getAllUsers();
      expect(result).to.be.includes.all.keys(
        "user_id",
        "name_user",
        "password",
        "email"
      );
    });
  });
  describe("Verfica o user procurado pelo id", () => {
    describe("O user procurado é encontrado", () => {
      const resultExecute = 
        {
          user_id: 2,
          name_user: "Natália",
          password: "natybarros",
          email: "naty@naty.com",
        }
      
      before(() => {
        sinon.stub(connection, "execute").resolves([resultExecute]);
      });
      after(() => {
        connection.execute.restore();
      });
      it("Retorna um objeto dentro do array", async () => {
        const result = await usersModel.getUserById();
        expect(result).to.be.an("object");
      });
      it("O objeto contém os atributos user_id, name_user, password, email", async () => {
        const result = await usersModel.getUserById();

        expect(result).to.be.includes.all.keys(
          "user_id",
          "name_user",
          "password",
          "email"
        );
      });
    });
    describe("O id não é encontrado", () => {
      const resultExecute = {};
      const id = 34;
      before(() => {
        sinon.stub(connection, "execute").resolves([resultExecute]);
      });
      after(() => {
        connection.execute.restore();
      });
      it("Retorna  objeto, se o id não é encontrado", async () => {
        const result = await usersModel.getUserById(id);
        expect(result).to.be.an("object");
      });
    });
    describe("Criação de um novo user no Banco de Dados, func createUser", () => {
      describe("Quando um novo user é inserido", () => {
        const resultExecute = {
          user_id: 9,
          name_user: "Nina",
          password: "ninalua",
          email: "nina@nina.com",
        };

        before(() => {
          sinon.stub(connection, "execute").resolves([resultExecute]);
        });

        after(() => {
          connection.execute.restore();
        });
        it("É retornada um objeto", async () => {
          const result = await usersModel.createUser();

          expect(result).to.be.an("object");
        });
        it("O objeto contém os atributos user_id, name_user, password, email", async () => {
          const result = await usersModel.userLogin();

          expect(result).to.be.includes.all.keys("user_id", "name_user", "password", "email");
        });
      });
    });
    describe("Login do user existente", () => {
      describe("Quando o user é encontrado", () => {
        const resultExecute = {
          token: "qualquerCoisa",
        };

        before(() => {
          sinon.stub(connection, "execute").resolves([resultExecute]);
        });

        after(() => {
          connection.execute.restore();
        });
        it("É retornado um objeto", async () => {
          const result = await usersModel.userLogin();

          expect(result).to.be.an("object");
        });
        it("O objeto contém os atributos token", async () => {
          const result = await usersModel.userLogin();

          expect(result).to.be.includes.all.keys("token");
        });
      });
    });
  });
});
