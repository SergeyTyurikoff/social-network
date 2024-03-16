import { FC } from 'react';

import { PostView } from '../PostView';
import './PostListView.css';

export const PostListView = ({ postList }) => {
  return (
    <ul className="post-list">
      {postList.map((post) => (
        <li key={post.id} className="post-list__item">
          <PostView post={post} />
        </li>
      ))}
    </ul>
  );
};
