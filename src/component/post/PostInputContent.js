import { React, useState ,useRef, useEffect } from 'react';
import style from './PostInputContent.scss';
const PostInputContent = () => {
    const [cursorStyle,setCursorStyle] = useState({left: '40px', top: '0px', height: '27px'})
    const [cursorState,setCursorState] = useState(false);
    const cursorEvent = ()=>{
        return setInterval(()=>{setCursorState(!cursorState);console.log(cursorState)},500);
    }
    const wrapperRef = useRef(null);
    const useOutsideAlerter = (ref) =>{
        let e ;
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && ref.current.contains(event.target)) {
                e = cursorEvent();
            }else{
                if(e != undefined)
                clearInterval(e)
                console.log(!cursorState)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }
      
    useOutsideAlerter(wrapperRef);
    return (
        <div className={style.writeZone}>
            <div className={style.cursor}>
                <div>
                    <div style={cursorState?{visibility: 'hidden'}:{visibility:'visible'}}>
                        <div style={cursorStyle} className={style.activeCursor}>&nbsp;</div>
                    </div>
                </div>
            </div>
            <div className={style.code}  onKeyPress={()=>{}} ref={wrapperRef}>
                <div>
                    <pre><span>당신의 이야기를 적어보세요...</span></pre>
                </div>
            </div>
        </div>
    );
}

export default PostInputContent; 