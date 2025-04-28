import { useEffect } from 'react';
import {useQuery } from '@apollo/client'
import {LOAD_GAMES} from '../graphql/queries'

type GameType  = {
    title: string;
    id: string;
    reviews: {  
        rating: number;
        content: string;    
    } [] 
}

export const GetAllGames =  () => {
    const {error, loading, data} = useQuery(LOAD_GAMES);

    useEffect(() => {
        if (error) {
            console.log('Error fetching games:', error);
        }
        if (loading) {
            console.log('Loading games...');
        }
        if (data) {
            console.log('Fetched games:', data);
        }
    }, [error, loading, data]);

   return <>
        <h2>Games</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        { data ? data.games.map((game: GameType, i: number) => (
            <div key={`${game.id}_${i}`} className="border-4 border-pink-500 p-4 m-2">
                <h2>{game.title}</h2>
                {game?.reviews?.length ? game.reviews.map((review, j) => (
                    <div key={`${review.rating}_${j}`} className="flex gap-2">
                        <p>Rating: {review.rating}</p>
                        <p>Content: {review.content}</p>
                    </div>
                )) : <p>No reviews found</p>}
            </div>
        )) : <p>No games found</p>}
       
   </>
   
}