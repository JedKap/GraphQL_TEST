# GraphQL - test
## To Start:
nodemon index

##  Server ready at: http://localhost:4000/


mutation EditGame($edits: EditGameInput!, $id: ID!) {
  updateGame(edits: $edits, id: $id) {
    title,
    platform,
    id
  }
}

query GamesQuery ($id: ID!) {
  game(id: $id) {
    title,
    reviews {
      rating,
      content
    }
  }
}

mutation AddGame($game: AddGameInput!) {
  addGame(game: $game) {
    title,
    platform,
    id
  }
}

mutation DeleteMutation($id: ID!) {
  deleteGame(id: $id) {
    id, 
    title,
    platform
  }
}

query ReviewQuery($id: ID!) {
  review(id: $id) {
    id,
    rating,
    content
  }
}


query GameQuery  {
  games {
    title,
    id,
    reviews {
      rating,
      content
    }
  }
}
