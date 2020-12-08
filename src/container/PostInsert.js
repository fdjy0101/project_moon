import React from 'react';
import PostInputBtn from '../component/post/PostInputBtn';
import PostInputTitle from '../component/post/PostInputTitle';

import style from './PostInsert.scss';
const PostInsert = () => {
    return (
        <div>
            <div className={style.leftLayout}>
                <PostInputTitle/>
                <PostInputBtn />
            </div>
            <div className={style.rightLayout}>

            </div>
        </div>
    );
}

export default PostInsert;