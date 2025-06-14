"use client";

import { getMaxListeners } from 'events';
import React, {useState} from 'react';
import { json } from 'stream/consumers';

export const SubmitProfile: React.FC=()=>{
    const [username, setUsername] = useState('');
    const [ouid, setOuid] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try{
            const res = await fetch(`/api/ouid?nickname=${encodeURIComponent(username)}`);
            const data = await res.json();
            if(!res.ok){
                setError(data.error);
                setOuid(null);
            }else{
                setOuid(data.ouid);
                setError(null);
            }
        }
        catch{
            setError('something went wrong with ouid');
            setOuid(null);
        }
        const name = 'johhnny32';
        const email = 'iwant@gmail.com';
        const password = 'jim32';
        const res1 = await fetch('api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: password
            }),
        });
    };

    return(
        <div style={{display: 'flex', gap: '8px'}}>
            <input
                type='text'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                placeholder="Please enter TFD username"
            />
            <button onClick={handleSubmit}>Submit</button>

            {ouid && <p>OUID: {ouid}</p>}
            {error && <p>{error}</p>}
        </div>
    );
}