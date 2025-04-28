import { gql } from '@apollo/client';

export const ADD_GAME = gql`
    mutation AddGame($game: AddGameInput!) {
    addGame(game: $game) {
      title,
      platform,
      id
    }
  }
`;


