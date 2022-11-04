import { stub, match } from "sinon";
import { expect } from "chai";
import tasksService, { getAllTasks, getTaskById } from "../../src/services/service";
import { getAllTasks as _getAllTasks, getTaskById as _getTaskById, createTask } from "../../src/controllers/controller";

describe("A chamada da controller", () => {
  describe("Quando existem tasks no BD", () => {
    const resultExecute = [
      {
        task_id: 1,
        name_task: "task_1",
      },
      {
        task_id: 2,
        name_task: "realihype",
      },
    ];

    const request = {};
    const response = [];

    before(() => {
      response.status = stub().returns(response);
      response.json = stub().returns();

      stub(tasksService, "getAllTasks").resolves(resultExecute);
    });

    after(() => {
      getAllTasks.restore();
    });
    it("Quando existe produto no BD, o status é chamado, passando o código 200", async () => {
      await _getAllTasks(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it("Se o método json é retornado contendo um array", async () => {
      await _getAllTasks(request, response);

      expect(response.json.calledWith(match.array)).to.be.equal(true);
    });
    it("Se recebe um retorno contendo um array de objetos, com as chaves task_id e name_task", async () => {
      await _getAllTasks(request, response);

      const [product] = resultExecute;

      expect(product).to.have.all.keys("task_id", "name_task");

      expect(response.json.calledWith(resultExecute)).to.be.equal(true);
    });
  });
  describe("Verifica a task pesquisada pelo id", () => {
    describe("Quando o id é encontrado", () => {
      const request = {};
      const response = [];

      const responseExecute = {
        task_id: 1,
        name_task: "task_1",
      };

      before(() => {
        request.params = { task_id: 1 };
        response.status = stub().returns(response);
        response.json = stub().returns();

        stub(tasksService, "getTaskById").resolves(responseExecute);
      });

      after(() => {
        getTaskById.restore();
      });
      it("Se é retornado um objeto", async () => {
        await _getTaskById(request, response);

        expect(response.json.calledWith(match.object)).to.be.equal(true);
      });
      it("Se é retornado o status 200", async () => {
        await _getTaskById(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
    describe("Quando o id não  é encontrado", () => {
      const request = {};
      const response = [];
      const err = { status: 404, message: "Task not found" };

      before(() => {
        request.params = { task_id: 50 };
        response.status = stub().returns(response);
        response.json = stub().returns();

        stub(tasksService, "getTaskById").throws(err);
      });

      after(() => {
        getTaskById.restore();
      });
      it('Retorna a mensagem de erro  "Task not found"', async () => {
        try {
        } catch (err) {
          expect(err.message).to.be.equal("Task not found");
        }
      });
    });
  });
  describe("Criação de uma nova task", () => {
    describe("A task é criada", () => {
      const request = {};
      const response = {};

      const newTask = {
        name_task: "teste_1",
      };

      before(() => {
        request.body = { name_task: "teste_1" };

        response.status = stub().returns(response);
        response.json = stub().returns();

        stub(tasksService, "createTask").resolves(newTask);
      });
      it("Se o método json é  retornado contendo um objeto", async () => {
        await createTask(request, response);

        expect(response.json.calledWith(match.object)).to.be.equal(true);
      });
    });
  });
});
