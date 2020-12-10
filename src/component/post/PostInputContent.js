import { React, useState, useRef, useEffect, useCallback } from 'react';
import { useInterval } from '../../comm/comm';
import { keyMap } from '../../comm/keyMap';
import style from './PostInputContent.scss';


const PostInputContent = () => {
    const [cursorStyle, setCursorStyle] = useState({ left: '40px', top: '0px', height: '27px' })
    const [cursorState, setCursorState] = useState(true);
    const [ani, setAni] = useState(false);
    const [contentText, setContentText] = useState('');
    let korea = false;
    let ctrl = false;

    const wrapperRef = useRef(null);
    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            const handleClickOutside = (event) => {

                if (ref.current && ref.current.contains(event.target)) {
                    setAni(true)
                    setCursorState(false)
                    console.log('inclick')
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

    useOutsideAlerter(wrapperRef);
    const textareaRef = useRef(null);
    useEffect(
        () => {
            const handleKeyPress = (event) => {
                if (event.key == 'Enter') {
                    textareaRef.current.value += '<makeBR/>';
                    setContentText(textareaRef.current.value)
                } else {
                   
                    if(korea){
                        if(event.key.match(/[a-zA-Z]/g)){
                            textareaRef.current.value += keyMap(event.key);
                           
                        }else{
                            textareaRef.current.value += event.key;
                        }
                        setContentText( textareaRef.current.value)
                    }else{
                        textareaRef.current.value += event.key;
                    }
                    setContentText(textareaRef.current.value);
                    console.log(event.key)
                }
            }
            const handleKeyCtrl = (event) => {
                let temp = (event.keyCode == 17 || event.keyCode == 91);

                if (event.type == 'keyup' && temp) {
                    ctrl = false;
                } else if (event.type == 'keydown' && temp) {
                    ctrl = true;
                }

                if ((event.keyCode == 17 || event.keyCode == 91)) event.preventDefault();
                   
            }
            const handleKeyDown = (event) => {
                if(event.keyCode == 21){
                    korea = !korea;
                }
                if (ctrl) {
                    if (event.keyCode == 86) {
                        textareaRef.current.value += '<cv/>';
                        setContentText(textareaRef.current.value)
                    } else if (event.keyCode == 65) {
                        textareaRef.current.value += '<ca/>';
                        setContentText(textareaRef.current.value)
                    }
                    event.preventDefault();
                }else if(event.code =='Backspace'){
                    textareaRef.current.value = textareaRef.current.value.slice(0,-1);
                    setContentText(textareaRef.current.value)
                }

                console.log((event.keyCode));
            }

            if (ani) {
                document.addEventListener("keypress", handleKeyPress);
                document.addEventListener("keydown", handleKeyCtrl);
                document.addEventListener("keydown", handleKeyDown);
                document.addEventListener("keyup", handleKeyCtrl);
                console.log('포킹')
                return () => {
                    document.removeEventListener("keypress", handleKeyPress);
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
    return (
        <div className={style.writeZone}>
            <div className={style.cursor}>
                <div>
                    <div style={cursorState ? { visibility: 'hidden' } : { visibility: 'visible' }}>
                        <div style={cursorStyle} className={style.activeCursor}>&nbsp;</div>
                    </div>
                </div>
            </div>
            <div className={style.code} ref={wrapperRef}>
                <div>
                    <textarea style={{ display: "none" }} ref={textareaRef}></textarea>
                    {contentText != '' ? contentText : <div><pre><span>당신의 이야기를 적어보세요...</span></pre></div>}
                </div>
            </div>
        </div>
    );
}

export default PostInputContent; 