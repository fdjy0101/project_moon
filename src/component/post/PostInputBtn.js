import React from 'react';
import { FaRegImage } from "react-icons/fa";
import { AiOutlineItalic, AiOutlinePaperClip } from "react-icons/ai";
import { BsTypeBold, BsTypeStrikethrough } from "react-icons/bs";
import { VscCode } from "react-icons/vsc";
import { BiPurchaseTag } from "react-icons/bi";

import style from "./PostInputBtn.scss";

const resetFontSize = (val) => {
    let returnTag = [];
    for (let i = 0; i < val; i++) {
        returnTag.push(<button>H<span>{i + 1}</span></button>)
    }
    return (<div>{returnTag.map((e, i) => {
        return (
            <div key={i} className={style.hBtn}>{e}</div>
        )
    })}</div>);
}

const setIconBtn = (iconArray, callBackArray) => {
    let returnTag = [];
    for (let i = 0; i < iconArray.length; i++) {
        returnTag.push(<button onClick={callBackArray[i]}>{iconArray[i]}</button>)
    }
    return (<div>{returnTag.map((e, i) => {
        return (
            <div key={i} className={style.iconBtn}>{e}</div>
        )
    })}</div>);
}


const PostInputBtn = (props) => {
    return (
        <div>
            <div className={style.BtnGroup}>
                {resetFontSize(4)}
            </div>
            <div className={style.BtnGroup}>
                {setIconBtn([<BsTypeBold />,<AiOutlineItalic />,<BsTypeStrikethrough />],[()=>console.log(1),()=>console.log(2),()=>console.log(3)])}
            </div>
            <div className={style.BtnGroup}>
                {setIconBtn([<BiPurchaseTag />,<AiOutlinePaperClip />,<FaRegImage />,<VscCode />],[()=>console.log(1),()=>console.log(2),()=>console.log(3),()=>console.log(4)])}
            </div>
        </div>
    )
}

export default PostInputBtn;