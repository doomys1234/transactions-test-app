import s from './Title.module.scss'

export default function Title({title}) {
    
    return (
        <h2 className={s.text}>{title}</h2>
    )
}