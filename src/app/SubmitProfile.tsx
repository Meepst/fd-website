"use client";

import React, {useState} from 'react';

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