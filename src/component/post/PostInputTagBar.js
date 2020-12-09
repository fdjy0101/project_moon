import { React, useState } from 'react';

const PostInputTagBar = () => {
    const [guide, setGuide] = useState('');
    const [tag, setTag] = useState([]);
    const [val, setVal] = useState('');
    const makeTag = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            if (val.replace(/,/, '') != '') {
                setTag([...tag, val]);
                setVal('');
            }
        }
    }
    const changeHandle = (e) => {
        if (e.target.value != ',') {
            setVal(e.target.value);
        }
    }
    return (
        <div>
            {tag.map((e, i) => {
                return (
                    <div key={i}>{e}</div>
                )
            })}
            <div>
                <input
                    type='text'
                    name='tags'
                    onBlur={() => { if (guide != '') setGuide('') }}
                    onSelect={() => setGuide('쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다. 등록된 태그를 클릭하면 삭제됩니다.')}
                    value={val}
                    onChange={changeHandle}
                    onKeyPress={makeTag}
                    placeholder='태그를 입력하세요' />
            </div>
            <div>
                {guide}
            </div>
        </div>
    );
}

export default PostInputTagBar; 