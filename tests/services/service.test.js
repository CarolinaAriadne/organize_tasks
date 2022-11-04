import { expect } from "chai";
import { stub as _stub } from "sinon";
import tasksModel, { getAllTasks, getTaskName, createTask } from "../../src/models/model";
import { getAllTasks as _getAllTasks, getTaskById, createTask as _createTask } from "../../src/services/service";
import { execute } from "../../src/models/connection";
import connection, { execute as _execute } from "../../src/models/connection";
import { stub } from "sinon";

describe("Busca todas as tarefas no BD", () => {
  describe("Quando não existe produto no banco", () => {
    const resultExecute = [[]];
    before(() => {
      _stub(tasksModel, "getAllTasks").resolves(resultExecute);
    });
    after(() => {
      getAllTasks.restore();
    });

    it("Retorna um array", async () => {
      const result = await _getAllTasks();
      expect(result).to.be.an("array");
    });
    it("Se o array está vazio", async () => {
      const [result] = await _getAllTasks();
      expect(result).to.be.empty;
    });
  });
  describe("Quando existem produtos no BD", () => {
    const resultExecute = [
      {
        task_id: 1,
        name_task: "teste_1",
      },
    ];
    before(() => {
      _stub(tasksModel, "getAllTasks").resolves(resultExecute);
    });
    after(() => {
      getAllTasks.restore();
    });
    it("Se retorna um array", async () => {
      const result = await _getAllTasks();
      expect(result).to.be.an("array");
    });
    it("O array não retorna vazio", async () => {
      const result = await _getAllTasks();
      expect(result).to.be.not.empty;
    });
    it("O array possui objetos", async () => {
      const [result] = await _getAllTasks();
      expect(result).to.be.an("object");
    });
    it("Objeto do array contém os atributos task_id e name_task", async () => {
      const [result] = await _getAllTasks();
      expect(result).to.be.includes.all.keys("task_id", "name_task");
    });
  });
});

describe("Verifica  o produto procutado pelo id", () => {
  describe("Quando o id é encontrado", () => {
    const resultExecute = [
      {
        task_id: 1,
        name_task: "teste_1",
      },
    ];

    before(() => {
      _stub(connection, "execute").resolves([resultExecute]);
    });
    after(() => {
      _execute.restore();
    });
    it("Um objeto é retornado", async () => {
      const [result] = await getTaskById();
      expect(result).to.be.an("object");
    });
    it("O objeto contém os atributos task_id e name_task", async () => {
      const [result] = await getTaskById();
      expect(result).to.be.includes.all.keys("task_id", "name_task");
    });
  });
  describe("O id não é encontrado", () => {
    const resultExecute = undefined;

    before(() => {
      _stub(connection, "execute").resolves(resultExecute);
    });

    after(() => {
      _execute.restore();
    });
    it("Retorna mensagem Task not found", async () => {
      try {
      } catch (err) {
        expect(err.message).to.be.equal("Task Not Found");
      }
    });
  });
});
describe("Criação de novo produto no BD", () => {
  describe("Produto inserido", () => {
    const resultGetTaskName = [];
    const resultCreateTask = [
      {
        task_id: 3,
      },
    ];

    before(() => {
      _stub(tasksModel, "getTaskName").resolves(resultGetTaskName);
      _stub(tasksModel, "createTask").resolves(resultCreateTask);
    });

    after(() => {
      getTaskName.restore();
      createTask.restore();
    });
    it("Se é retornado um objeto", async () => {
      const result = await _createTask();

      expect(result).to.be.an("object");
    });
  });
});
