import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_GAME } from '../graphql/mutations';


export type AddGameInput = {
    title: string;
    platform: string;
    id: string;
}

export const AddGame: React.FC = () => {
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [addGame, { data, loading, error }] = useMutation(ADD_GAME);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const id = Math.random().toString(36).substring(2, 15);
            await addGame({ variables: { id, game: {  title, platform }} });
            setTitle('');
            setPlatform('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Add a New Game</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title' >Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="platform">Platform:</label>
                    <input
                        id="platform"
                        type="text"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Game'}
                </button>
            </form>
            {error && <p>Error: {error.message}</p>}
            {data && <p>Game added successfully!</p>}
        </div>
    );
};
