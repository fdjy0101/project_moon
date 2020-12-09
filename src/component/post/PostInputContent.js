import { React, useState, useRef, useEffect } from 'react';
import { useInterval } from '../../comm/comm';
import style from './PostInputContent.scss';


const PostInputContent = () => {
    const [cursorStyle, setCursorStyle] = useState({ left: '40px', top: '0px', height: '27px' })
    const [cursorState, setCursorState] = useState(true);
    const [ani, setAni] = useState(false);
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
                } else {
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
                    <textarea style={{display:"none"}}></textarea>
                    <div>
                        <pre><span>당신의 이야기를 적어보세요...</span></pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostInputContent; 