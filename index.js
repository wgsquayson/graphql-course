import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  # Entry points da api
  type Query {
    helloWorld: String!
    horaCerta: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
  }
`;

const resolvers = {
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url} 🚀`);
});
