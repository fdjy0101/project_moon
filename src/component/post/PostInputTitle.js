import React from 'react';
import style from "./PostInputTitle.scss";

const PostInputTitle = (props) => {
    return (
        <div>
            <input type='text' name='articleTitle' placeholder='제목을 입력하세요'/>
        </div>
    )
}

export default PostInputTitle;