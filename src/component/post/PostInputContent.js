import { React, useState, useRef, useEffect, useCallback } from 'react';
import { useInterval } from '../../comm/comm';
import style from './PostInputContent.scss';


const PostInputContent = () => {
    const [cursorStyle, setCursorStyle] = useState({ top: '0px', height: '27px', left: '40px' })
    const [cursorState, setCursorState] = useState(true);
    const [ani, setAni] = useState(false);
    const [contentText, setContentText] = useState('');
    const [strMap,setStrMap] = useState([]);
    const a = 8;
    const b = a * 2;
    let ctrl = false;



    const setStrPoint = (str,point) => {
        let check = /[a-zA-Z]|[0-9]|[~!@#$%^&*()_+|<>?:{}]/;
        let map = strMap.slice();
        const setting = () => {
            let returnArr = [];
            for (let i = 0; i < str.length; i++) {
                if (check.test(str[i])) {
                    returnArr.push(a)
                } else {
                    returnArr.push(b)
                }
            }
            return returnArr;
        }
        if (map[point] == undefined) {
            let addArr = setting();
            for (let i = 0; i < addArr.length; i++) {
                map[point + i] = (map[point + (i - 1)] + addArr[i]);
            }
            return map;
        } else {
            let temp = map.splice(point)
            let addArr = setting();
            let sum = 0;
            for (let i = 0; i < addArr.length; i++) {
                sum += addArr[i];
                map[point + i] = (map[point + (i - 1)] + addArr[i]);
            }
            for (let i = 0; i < temp.length; i++) {
                temp[i] += sum;
            }
            const remap = map.concat(temp);
            return remap;
        }
    }

    const wrapperRef = useRef(null);
    const textareaRef = useRef(null);
    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            const handleClickOutside = (event) => {
                if (ref.current && ref.current.contains(event.target)) {
                    setAni(true)
                    setCursorState(false)
                    if (event.target.className == style.textTag && event.target?.childNodes[0].nodeName == 'SPAN') {
                        let tag = event.target.childNodes[0];
                        setCursorStyle({ ...cursorStyle, left: tag.offsetWidth + tag.offsetLeft })
                    }
                } else {
                    console.log('outclick')
                    setAni(false)
                    setCursorState(true)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
        useInterval(() => { setCursorState(!cursorState) }, ani ? 450 : null)
    }

    useEffect(
        () => {
            const handleKeyCtrl = (event) => {
                let temp = (event.keyCode == 17 || event.keyCode == 91);
                if (event.type == 'keyup' && temp) {
                    ctrl = false;
                } else if (event.type == 'keydown' && temp) {
                    ctrl = true;
                }
                if ((event.keyCode == 17 || event.keyCode == 91)) event.preventDefault();
                setContentText(textareaRef.current.value);
            }
            const handleKeyDown = (event) => {
                if (event.key == 'Enter') {
                    textareaRef.current.value += '<makeBR/>';
                    setContentText(textareaRef.current.value)
                } else if (ctrl) {
                    if (event.keyCode == 86) {
                        textareaRef.current.value += '<cv/>';
                        setContentText(textareaRef.current.value)
                    } else if (event.keyCode == 65) {
                        textareaRef.current.value += '<ca/>';
                        setContentText(textareaRef.current.value)
                    }
                    event.preventDefault();
                } /*else if (event.code == 'Backspace') {
                    textareaRef.current.value = textareaRef.current.value.slice(0, -1);
                    setContentText(textareaRef.current.value)
                } */else {
                    setStrMap([...setStrPoint(textareaRef.current.value.substr(-1),textareaRef.current.value.length)])
                    setStrMap([...strMap,123])
                    console.log(strMap)
                    setContentText(textareaRef.current.value);
                }
            }

            if (ani) {
                document.addEventListener("keydown", handleKeyCtrl);
                document.addEventListener("keydown", handleKeyDown);
                document.addEventListener("keyup", handleKeyCtrl);
                console.log('포킹')
                return () => {
                    document.removeEventListener("keydown", handleKeyCtrl);
                    document.removeEventListener("keydown", handleKeyDown);
                    document.removeEventListener("keyup", handleKeyCtrl);
                };
            } else {
                console.log('언포킹')
            }
        },
        [ani]
    )

    useOutsideAlerter(wrapperRef);
    return (
        <div className={style.writeZone} ref={wrapperRef} onClick={() => textareaRef.current.focus()}>
            <div className={style.inputZone} style={{ overflow: 'hidden', position: 'relative', width: '3px', height: '0px', top: '4px', left: '48px' }}>
                <textarea ref={textareaRef} style={{ position: 'absolute', bottom: '-1em', padding: '0px', width: '1000px', height: '1em', outline: 'none' }}></textarea>
            </div>
            <div className={style.vscrollbar}>
                <div></div>
            </div>
            <div draggable={false}>
                <div>
                    <div>
                        <div>
                            <div>
                                {contentText == '' && <pre className={style.textTag}><span>당신의 이야기를 적어보세요...</span></pre>}
                                <div className={style.selectZone}>
                                    <div></div>
                                </div>
                                <div className={style.cursor}>
                                    <div>
                                        <div style={cursorState ? { visibility: 'hidden' } : { visibility: 'visible' }}>
                                            <div style={cursorStyle} className={style.activeCursor}>&nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.code}>
                                    <div>
                                        <pre className={style.textTag}><span>{contentText != '' ? contentText : (<>&nbsp;</>)}</span></pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
                <div className={style.gutters}></div>
            </div>
        </div>
    );
}

export default PostInputContent;



/*
텍스트 에디터 원리

빈 텍스트 에리아 한개를
포지션 앱솔루트로 뛰우고
마우스 커서가 위치하는곳으로 보냄

마우스 클릭을 하는 등 커서위치가 변하면 텍스트에리아의 값이 공백('' ) 으로 변함
마우스 드래그를 하면 선택된 글자들이 택스트에리아에 들어감


공백태그 모양
<pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span cm-text="">​</span></span></pre>


영어와 특수문자,숫자의 간격이 같음
나머지는 한글과 간격이 같음
*/