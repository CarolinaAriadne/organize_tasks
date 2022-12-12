// import { expect } from "chai";
// import { stub } from "sinon";
// import {
//   getAllUsers,
//   getUserById,
//   userLogin,
//   createUser,
//   assignmentTask,
//   assignmentTaskUser,
// } from "../../src/models/modelUser";
// import connection, { execute } from "../../src/models/connection";

// describe("Testa model Users", () => {
//   describe("Retorna todos os users", async () => {
//     const executeResponse = [[]];
//     before(() => {
//       stub(connection, "execute").resolves(executeResponse);
//     });
//     after(() => {
//       execute.restore();
//     });
//     it("Retorna um array", async () => {
//       const result = await getAllUsers();
//       expect(result).to.be.an("array");
//     });
//     it("Caso o array esteja vazio", async () => {
//       const result = await getAllUsers();
//       expect(result).to.be.empty;
//     });
//   });
//   describe("Quando existe user no BD", async () => {
//     const resultExecute = [
//       {
//         user_id: 1,
//         name_user: "João",
//         password: "joãosilva",
//         email: "joao@joao.com",
//       },
//       {
//         user_id: 2,
//         name_user: "Natália",
//         password: "natybarros",
//         email: "naty@naty.com",
//       },
//     ];
//     before(() => {
//       stub(connection, "execute").resolves([resultExecute]);
//     });
//     after(() => {
//       execute.restore();
//     });
//     it("Retorna um array", async () => {
//       const result = await getAllUsers();
//       expect(result).to.be.an("array");
//     });
//     it("O array não está vazio", async () => {
//       const result = await getAllUsers();
//       expect(result).to.be.not.empty;
//     });
//     it("O array possui objetos", async () => {
//       const [result] = await getAllUsers();
//       expect(result).to.be.an("object");
//     });
//     it("O objeto do array contém os atributos user_id, name_user, password, email", async () => {
//       const [result] = await getAllUsers();
//       expect(result).to.be.includes.all.keys(
//         "user_id",
//         "name_user",
//         "password",
//         "email"
//       );
//     });
//   });
//   describe("Verfica user procurado pelo id", () => {
//     describe("O user é encontrado", () => {
//       const resultExecute = [
//         {
//           user_id: 2,
//           name_user: "Natália",
//           password: "natybarros",
//           email: "naty@naty.com",
//         },
//       ];
//       before(() => {
//         stub(connection, "execute").resolves([resultExecute]);
//       });
//       after(() => {
//         execute.restore();
//       });
//       it("Retorna um array", async () => {
//         const result = await getUserById();
//         expect(result).to.be.an("array");
//       });
//       it("O objeto contém os atributos user_id, name_user, password, email", async () => {
//         const [result] = await getUserById();

//         expect(result).to.be.includes.all.keys(
//           "user_id",
//           "name_user",
//           "password",
//           "email"
//         );
//       });
//     });
//     describe("O id não é encontrado", () => {
//       const resultExecute = {};
//       const id = 34;
//       before(() => {
//         stub(connection, "execute").resolves([resultExecute]);
//       });
//       after(() => {
//         execute.restore();
//       });
//       it("Retorna  objeto, se o id não é encontrado", async () => {
//         const result = await getUserById(id);
//         expect(result).to.be.an("object");
//       });
//     });
//   });
//   describe("Testa login", () => {
//     describe("Quando o login dá certo e é gerado um token", () => {
//       const resultExecute = [
//         {
//           token:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiam9hb0Bqb2FvLmNvbSJ9LCJpYXQiOjE2NzA3MTQ4MjEsImV4cCI6MTY3NTg5ODgyMX0.gi8JBu0oDi6WMocwtIb3ED8LdX7YLFakkCvTvaWnPUU",
//         },
//       ];

//       before(() => {
//         stub(connection, "execute").resolves(resultExecute);
//       });

//       after(() => {
//         execute.restore();
//       });
//       it("É retornado um objeto", async () => {
//         const result = await userLogin();

//         expect(result).to.be.an("object");
//       });
//       it("O objeto contém a chave token", async () => {
//         const result = await userLogin();

//         expect(result).to.be.includes.all.keys("token");
//       });
//     });
//     describe("Quando o user não é encontrado", () => {
//       const resultExecute = [
//         {
//           message: "Users not found",
//         },
//       ];

//       before(() => {
//         stub(connection, "execute").resolves(resultExecute);
//       });

//       after(() => {
//         execute.restore();
//       });
//       it("É retornado um objeto", async () => {
//         const result = await userLogin();

//         expect(result).to.be.an("object");
//       });
//       it("O objeto contém a chave message", async () => {
//         const result = await userLogin();

//         expect(result).to.be.includes.all.keys("message");
//       });
//     });
//   });
// });
