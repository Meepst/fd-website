'use client';

import { PT_Sans } from 'next/font/google';
import { SubmitProfile }from './SubmitProfile';
import { useEffect, useState} from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: {
    username: string;
  };
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const res = await fetch('api/getUserPosts/');
        const data = await res.json();
        setPosts(data);
      }catch(error){
        console.error('failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <main className="p-6">
      <h1 className="tet-4xl font-bold mb-6">The First Descendant Armoury</h1>
      <div className="mb-6">
        <button onClick={()=>alert('redirect to sign in')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Sign In
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Builds</h2>
        {posts.length === 0 ? (
          <p>No builds for now!</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post)=> (
              <li key={post.id} className="border p-4 rounded shadow">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <div className="text-sm text-gray-500 mt-2">
                  Created by {post.user.username} on {' '}
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
