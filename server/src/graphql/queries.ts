import { gql } from '@apollo/client'

export const LOAD_GAMES = gql`
  query {
    games  {
        title,
        id,
        reviews {
            rating,
            content
        }
    }   
  }
`