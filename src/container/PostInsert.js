import React from 'react';
import PostInputBtn from '../component/post/PostInputBtn';
import PostInputContent from '../component/post/PostInputContent';
import PostInputTagBar from '../component/post/PostInputTagBar';
import PostInputTitle from '../component/post/PostInputTitle';

import style from './PostInsert.scss';
const PostInsert = () => {
    return (
        <div>
            <div className={style.leftLayout}>
                <PostInputTitle/>
                <PostInputTagBar/>
                <PostInputBtn />
                <PostInputContent/>
            </div>
            <div className={style.rightLayout}>

            </div>
        </div>
    );
}

export default PostInsert;