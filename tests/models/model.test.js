import { expect } from "chai";
import { stub } from "sinon";
import { getAllTasks, getTaskById, getTaskName, createTask } from "../../src/models/model";
import connection, { execute } from "../../src/models/connection";

describe("Busca todas as tarefas do banco de dados", () => {
  describe("Retorna todas as tarefas", async () => {
    const executeResponse = [[]];
    before(() => {
      stub(connection, "execute").resolves(executeResponse);
    });
    after(() => {
      execute.restore();
    });
    it("Retorna um array", async () => {
      const result = await getAllTasks();
      expect(result).to.be.an("array");
    });
    it("Caso o array esteja vazio", async () => {
      const result = await getAllTasks();
      expect(result).to.be.empty;
    });
  });
  describe("Quando existem tarefas no BD", async () => {
    const resultExecute = [
      {
        task_id: 1,
        name_tasks: "teste_1",
      },
      {
        task_id: 2,
        name_tasks: "realihype",
      },
    ];
    before(() => {
      stub(connection, "execute").resolves([resultExecute]);
    });
    after(() => {
      execute.restore();
    });
    it("Retorna um array", async () => {
      const result = await getAllTasks();
      expect(result).to.be.an("array");
    });
    it("O array não está vazio", async () => {
      const result = await getAllTasks();
      expect(result).to.be.not.empty;
    });
    it("O array possui objetos", async () => {
      const [result] = await getAllTasks();
      expect(result).to.be.an("object");
    });
    it("O objeto do array contém os atributos task_id e name_tasks", async () => {
      const [result] = await getAllTasks();
      expect(result).to.be.includes.all.keys("task_id", "name_tasks");
    });
  });
  describe("Verfica a task procurada pelo id", () => {
    describe("A tarefa procurada é encontrada", () => {
      const resultExecute = [
        {
          task_id: 1,
          name_task: "teste_1",
        },
      ];
      before(() => {
        stub(connection, "execute").resolves([resultExecute]);
      });
      after(() => {
        execute.restore();
      });
      it("Retorna um array", async () => {
        const result = await getTaskById();
        expect(result).to.be.an("array");
      });
      it("O objeto contém os atributos task_id e name_task", async () => {
        const [result] = await getTaskById();

        expect(result).to.be.includes.all.keys("task_id", "name_task");
      });
    });
    describe("O id não é encontrado", () => {
      const resultExecute = {};
      const id = 34;
      before(() => {
        stub(connection, "execute").resolves([resultExecute]);
      });
      after(() => {
        execute.restore();
      });
      it("Retorna  objeto, se o id não é encontrado", async () => {
        const result = await getTaskById(id);
        expect(result).to.be.an("object");
      });
    });
    describe("Testa se encontra o produto buscado pelo nome - func getTaskName ", async () => {
      describe("O produto é encontrado", () => {
        const resultExecute = [
          {
            task_id: 5,
            name_task: "fazer tela de cadastro",
          },
        ];
        const name = "tela usuário";

        before(() => {
          stub(connection, "execute").resolves([resultExecute]);
        });
        after(() => {
          execute.restore();
        });
        it("Se um array é encontrado", async () => {
          const result = await getTaskName(name);
          expect(result).to.be.an("array");
        });
        it("Se existe a chave name_task no objeto que vem dentro do array", async () => {
          const [result] = await getTaskName(name);
          expect(result).to.be.includes.all.keys("name_task");
        });
      });
    });
    describe("Criação de uma nova task no Banco de Dados, func createTask", () => {
      describe("Quando um novo produto é inserido", () => {
        const resultExecute = [
          {
            insertId: 1,
          },
        ];

        before(() => {
          stub(connection, "execute").resolves(resultExecute);
        });

        after(() => {
          execute.restore();
        });
        it("O id será um número retornado", async () => {
          const result = await createTask();

          expect(result).to.be.a("number");
        });
      });
    });
  });
});
