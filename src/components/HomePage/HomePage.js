import { useNavigate } from 'react-router-dom';
import s from './HomePage.module.scss'
import Title from '../Title/Title';

export default function HomePage() {
    const navigate = useNavigate()

    const onTryClick = () => {
        navigate('/register')
    }
    
    return (
        <>
            <Title title={'Welcome to our app'} />
            <div className={s.container}>
                <p className={s.text}>Here you can upload the history of your transactions and manage them</p>
            <button className={s.button} type='button' onClick={onTryClick}>Try it now</button>
            </div>
            
        </>
    )
}