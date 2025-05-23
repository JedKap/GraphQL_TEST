import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";

// data
import db from './_db.js'

// types
import { typeDefs } from "./schema.js";


// resolvers
const resolvers = {
    Query: {
      games() {
        return db.games
      },
      game(_, args) {
        return db.games.find((game) => game.id === args.id)
      },
      authors() {
        return db.authors
      },
      author(_, args) {
        return db.authors.find((author) => author.id === args.id)
      },
      reviews() {
        return db.reviews
      },
      review(_, args) {
        return db.reviews.find((review) => review.id === args.id)
      }
    },
    Game: {
      reviews(parent) {
        return db.reviews.filter((r) => r.game_id === parent.id)
      }
    },
    Review: {
      author(parent) {
        return db.authors.find((a) => a.id === parent.author_id)
      },
      game(parent) {
        return db.games.find((g) => g.id === parent.game_id)
      }
    },
    Author: {
      reviews(parent) {
        return db.reviews.filter((r) => r.author_id === parent.id)
      }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((game) => game.id !== args.id)
            //db.reviews = db.reviews.filter((review) => review.game_id !== args.id)
            return db.games
        },
        addGame(_, args) {
            const newGame = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(newGame)
            //return newGame
            return db.games
        },
        updateGame(_, args) {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return {
                        ...game,
                        ...args.edits
                    }
                }
                return game
            })
            return db.games.find((game) => game.id === args.id)
        },
    }
  }

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);