const sinon = require('sinon');
const { expect } = require('chai');
const serviceTasks = require('../../src/services/service');
const controllerTasks = require('../../src/controllers/controller');

describe('A chamada da controller', () => {
  describe('Quando existem tasks no BD', () => {
    const resultExecute = [
      {
        task_id: 1,
        name_task: 'task_1',
      },
      {
        task_id: 2,
        name_task: 'realihype',
      },
    ];

    const request = {};
    const response = [];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(serviceTasks, 'getAllTasks').resolves(resultExecute);
    });

    after(() => {
      serviceTasks.getAllTasks.restore();
    });
    it('Quando existe task no BD, o status é chamado, passando o código 200', async () => {
      await controllerTasks.getAllTasks(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Se recebe um retorno contendo um array de objetos, com as chaves task_id e name_task', async () => {
      await controllerTasks.getAllTasks(request, response);

      const [product] = resultExecute;

      expect(product).to.have.all.keys('task_id', 'name_task');

      expect(response.json.calledWith(resultExecute)).to.be.equal(true);
    });
  });
  describe('Verifica a task pesquisada pelo id', () => {
    describe('Quando o id é encontrado', () => {
      const request = {};
      const response = [];

      const responseExecute = {
        task_id: 1,
        name_task: 'task_1',
      };

      before(() => {
        request.params = { task_id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(serviceTasks, 'getTaskById').resolves(responseExecute);
      });

      after(() => {
        serviceTasks.getTaskById.restore();
      });
      it('Se é retornado o status 200', async () => {
        await controllerTasks.getTaskById(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
    describe('Quando o id não  é encontrado', () => {
      const request = {};
      const response = [];
      const err = { status: 404, message: 'Task not found' };

      before(() => {
        request.params = { task_id: 50 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(serviceTasks, 'getTaskById').throws(err);
      });

      after(() => {
        serviceTasks.getTaskById.restore();
      });
      it('Retorna a mensagem de erro  "Task not found"', async () => {
        try {
        } catch (err) {
          expect(err.message).to.be.equal('Task not found');
        }
      });
    });
  });
  describe('Criação de uma nova task', () => {
    describe('A task é criada', () => {
      const request = {};
      const response = {};

      const newTask = {
        name_task: 'teste_1',
      };

      before(() => {
        request.body = { name_task: 'teste_1' };
      });

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(serviceTasks, 'createTask').resolves(newTask);

      after(() => {
        serviceTasks.createTask.restore();
      });
      it('Status 200 é retornado se a task é inserida', async () => {
        await controllerTasks.createTask(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
});
