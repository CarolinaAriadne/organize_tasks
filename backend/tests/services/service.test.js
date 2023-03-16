const { expect } = require('chai');
const sinon = require('sinon');
const tasksModel = require('../../src/models/model');
const tasksService = require('../../src/services/service');
const connection = require('./../../src/models/connection');

describe('Busca todas as tarefas no BD', () => {
  describe('Quando não existe task no banco', () => {
    const resultExecute = [[]];
    before(() => {
      sinon.stub(tasksModel, 'getAllTasks').resolves(resultExecute);
    });
    after(() => {
      tasksModel.getAllTasks.restore();
    });

    it('Retorna um array', async () => {
      const result = await tasksService.getAllTasks();
      expect(result).to.be.an('array');
    });
    it('Se o array está vazio', async () => {
      const [result] = await tasksService.getAllTasks();
      expect(result).to.be.empty;
    });
  });
  describe('Quando existem tasks no BD', () => {
    const resultExecute = [
      {
        task_id: 1,
        name_task: 'teste_1',
      },
    ];
    before(() => {
      sinon.stub(tasksModel, 'getAllTasks').resolves(resultExecute);
    });
    after(() => {
      tasksModel.getAllTasks.restore();
    });
    it('Se retorna um array', async () => {
      const result = await tasksService.getAllTasks();
      expect(result).to.be.an('array');
    });
    it('O array não retorna vazio', async () => {
      const result = await tasksService.getAllTasks();
      expect(result).to.be.not.empty;
    });
    it('O array possui objetos', async () => {
      const [result] = await tasksService.getAllTasks();
      expect(result).to.be.an('object');
    });
    it('Objeto do array contém os atributos task_id e name_task', async () => {
      const [result] = await tasksService.getAllTasks();
      expect(result).to.be.includes.all.keys('task_id', 'name_task');
    });
  });
});

describe('Verifica  a task procurada pelo id', () => {
  describe('Quando o id é encontrado', () => {
    const resultExecute = [
      {
        task_id: 1,
        name_task: 'teste_1',
      },
    ];

    before(() => {
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Um objeto é retornado', async () => {
      const [result] = await tasksService.getTaskById();
      expect(result).to.be.an('object');
    });
    it('O objeto contém os atributos task_id e name_task', async () => {
      const [result] = await tasksService.getTaskById();
      expect(result).to.be.includes.all.keys('task_id', 'name_task');
    });
  });
  describe('O id não é encontrado', () => {
    const resultExecute = undefined;

    before(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });
    it('Retorna mensagem Task not found', async () => {
      try {
      } catch (err) {
        expect(err.message).to.be.equal('Task Not Found');
      }
    });
  });
});
describe('Criação de nova task no BD', () => {
  describe('Task inserida', () => {
    const resultGetTaskName = [];
    const resultCreateTask = [
      {
        task_id: 3,
      },
    ];

    before(() => {
      sinon.stub(tasksModel, 'getTaskName').resolves(resultGetTaskName);
      sinon.stub(tasksModel, 'createTask').resolves(resultCreateTask);
    });

    after(() => {
      tasksModel.getTaskName.restore();
      tasksModel.createTask.restore();
    });
    it('Se é retornado um objeto', async () => {
      const result = await tasksService.createTask();

      expect(result).to.be.an('object');
    });
  });
});
