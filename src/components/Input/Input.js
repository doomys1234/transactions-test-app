import React from "react";
import s from "./Input.module.scss"


export default function Input({register,label,required,placeholder}) {
    
    return (
        <>
            <input className={s.input}
            
            {...register(label, { required:required})} placeholder={placeholder}
          ></input>
        </>
    )
}