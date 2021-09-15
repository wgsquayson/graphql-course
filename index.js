import { ApolloServer, gql } from "apollo-server";

const usuarios = [
  {
    id: 1,
    nome: "Will",
    email: "will@teste.com",
    idade: 22,
    perfil_id: 2,
  },
  {
    id: 2,
    nome: "Adria",
    email: "adria@teste.com",
    idade: 20,
    perfil_id: 2,
  },
  {
    id: 3,
    nome: "Dio",
    email: "dio@teste.com",
    idade: 21,
    perfil_id: 1,
  },
];

const perfis = [
  {
    id: 1,
    nome: "Comum",
  },
  {
    id: 2,
    nome: "Administrador",
  },
];

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
    perfil: Perfil!
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  type Perfil {
    id: Int!
    nome: String!
  }

  # Entry points da api
  type Query {
    helloWorld: String!
    horaCerta: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
    usuarios: [Usuario]!
    usuario(id: ID): Usuario
    perfis: [Perfil]!
    perfil(id: Int): Perfil
  }
`;

const resolvers = {
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    },
    perfil(usuario) {
      return perfis.find((perfil) => perfil.id === usuario.perfil_id);
    },
  },
  Produto: {
    precoComDesconto({ preco, desconto }) {
      return desconto ? preco * (1 - desconto) : preco;
    },
  },
  Query: {
    helloWorld() {
      return "Hello World!";
    },
    horaCerta() {
      return new Date();
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: "MD Chefe",
        email: "modacasualdeluxo@gmail.com",
        idade: 22,
        salario_real: 11414134135.1,
        vip: true,
      };
    },
    produtoEmDestaque() {
      return {
        nome: "Produto top",
        preco: 1349.9,
        desconto: 0.2,
      };
    },
    numerosMegaSena() {
      const orderByNumberAsc = (a, b) => a - b;

      return Array(6)
        .fill(0)
        .map((n) => parseInt(Math.random() * 60 + 1))
        .sort(orderByNumberAsc);
    },
    usuarios() {
      return usuarios;
    },
    usuario(_, args) {
      const usuario = usuarios.find((usuario) => usuario.id == args.id);
      return usuario;
    },
    perfis() {
      return perfis;
    },
    perfil(_, { id }) {
      return perfis.find((perfil) => perfil.id === id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url} 🚀`);
});
