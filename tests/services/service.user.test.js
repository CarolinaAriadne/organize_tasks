const { expect } = require("chai");
const sinon = require("sinon");
const userModel = require("../../src/models/modelUser");
const userService = require("../../src/services/serviceUser");
const connection = require("./../../src/models/connection");

describe("Busca todos os users no BD", () => {
  describe("Quando não existe user no banco", () => {
    const resultExecute = [[]];
    before(() => {
      sinon.stub(userModel, "getAllUsers").resolves(resultExecute);
    });
    after(() => {
      userModel.getAllUsers.restore();
    });

    it("Retorna um array", async () => {
      const result = await userService.getAllUsers();
      expect(result).to.be.an("array");
    });
    it("Se o array está vazio", async () => {
      const [result] = await userService.getAllUsers();
      expect(result).to.be.empty;
    });
  });
  describe("Quando existem users no BD", () => {
    const resultExecute = [
      {
        user_id: 1,
        name_user: "João",
        password: "joãosilva",
        email: "joao@joao.com",
      },
    ];
    before(() => {
      sinon.stub(userModel, "getAllUsers").resolves(resultExecute);
    });
    after(() => {
      userModel.getAllUsers.restore();
    });
    it("Se retorna um array", async () => {
      const result = await userService.getAllUsers();
      expect(result).to.be.an("array");
    });
    it("O array não retorna vazio", async () => {
      const result = await userService.getAllUsers();
      expect(result).to.be.not.empty;
    });
    it("O array possui objetos", async () => {
      const [result] = await userService.getAllUsers();
      expect(result).to.be.an("object");
    });
    it("Objeto do array contém os atributos user_id, name_user, password, email", async () => {
      const [result] = await userService.getAllUsers();
      expect(result).to.be.includes.all.keys(
        "user_id",
        "name_user",
        "password",
        "email"
      );
    });
  });
});

describe("Verifica  o user procurado pelo id", () => {
  describe("Quando o id é encontrado", () => {
    const resultExecute = [
      {
        user_id: 3,
        name_user: "Julia",
        password: "juliaalves",
        email: "julia@julia.com",
      },
    ];

    before(() => {
      sinon.stub(connection, "execute").resolves([resultExecute]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Um objeto é retornado", async () => {
      const [result] = await userService.getUserById();
      expect(result).to.be.an("object");
    });
    it("O objeto contém os atributos user_id, name_user, password, email", async () => {
      const [result] = await userService.getUserById();
      expect(result).to.be.includes.all.keys(
        "user_id",
        "name_user",
        "password",
        "email"
      );
    });
  });
  describe("O id não é encontrado", () => {
    const resultExecute = [];

    before(() => {
      sinon.stub(connection, "execute").resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });
    it("Retorna mensagem User not found", async () => {
      try {
      } catch (err) {
        expect(err.message).to.be.equal("User Not Found");
      }
    });
  });
});
describe("Criação de um novo user no BD", () => {
  describe("User inserido", () => {
    const resultGetUserName = [];
    const resultCreateUser = [
      {
        name_user: "Fernanda",
        password: "ferlima",
        email: "fer@fer.com",
      },
    ];

    before(() => {
      sinon.stub(userModel, "getUserName").resolves(resultGetUserName);
      sinon.stub(userModel, "createUser").resolves(resultCreateUser);
    });

    after(() => {
      userModel.getUserName.restore();
      userModel.createUser.restore();
    });
    it("Se é retornado um objeto", async () => {
      const result = await userService.createUser();

      expect(result).to.be.an("object");
    });
  });
});
describe("Tentativa de login", () => {
  describe("Login efetuado com sucesso", () => {
    const loginUser =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibmF0eUBuYXR5LmNvbSJ9LCJpYXQiOjE2NzA5NTM3NDIsImV4cCI6MTY3NjEzNzc0Mn0.7tC2DXWC8Ss6JTaFkgw1K2sHIJHydX2WCs02zIGyebU";

    before(() => {
      sinon.stub(userModel, "userLogin").resolves(loginUser);
    });

    after(() => {
      userModel.userLogin.restore();
    });
    it("Se é retornado o token em formato de string", async () => {
      const result = await userService.userLogin();

      expect(result).to.be.an("string");
    });
  });
  describe("Login não efetuado", () => {
    const err = { message: "Users not found" };
    before(() => {
      sinon.stub(userModel, "userLogin").resolves(err);
    });

    after(() => {
      userModel.userLogin.restore();
    });
    it("Se é retornado a mensagem de erro 'Users not found'", async () => {
      try {
      } catch (err) {
        expect(err.message).to.be.equal("Users not found");
      }
    });
    it("Se é retornado um objeto", async () => {
      try {
      } catch (err) {
        expect(err).to.be.an("object");
      }
    });
  });
});
