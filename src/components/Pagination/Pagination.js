import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage } from '../../redux/data/dataSelectors'
import { incrementPage,decrementPage } from '../../redux/data/dataSlice'

import s from './Pagination.module.scss'
export default function Pagination({lengthOfArr }) {
    const dispatch = useDispatch()
    const currentPage = useSelector(state=>getCurrentPage(state))
    const incrementClick = () => {
        if (currentPage >= lengthOfArr) {
            return
        }
        dispatch(incrementPage())
    }
    const decrementClick = () => {
        if (currentPage <= 1) {
            return
        }
        dispatch(decrementPage())
    }
    
    return (
        <>
            <div>
                <div className={s.wrapper}>
                    <button className={s.button} type="button" onClick={decrementClick}>Prev page</button>
                    <span>{currentPage} out of {lengthOfArr}</span>
                    <button className={s.button} type="button" onClick={incrementClick}>Next page</button>
                </div>
            </div>
        </>
    )
}