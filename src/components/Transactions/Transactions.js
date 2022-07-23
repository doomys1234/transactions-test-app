import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getStatus } from "../../redux/auth/authSelectors";
import { getData } from "../../redux/data/dataSlice";
import { getDataStatus, getInitialData, getShowModal } from "../../redux/data/dataSelectors";
import Title from "../Title/Title";
import s from './Transactions.module.scss'
import Table from "../Table/Table";
import Modal from "../Modal/Modal";


export default function Transactions() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => getStatus(state))
    const initialData = useSelector(state => getInitialData(state))
    const isLoaded = useSelector(state => getDataStatus(state))
    const showModal= useSelector(state=>getShowModal(state))

    
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
            toast.warn('Please login to your account')
            return
        }
        dispatch(getData())
    },[isLoggedIn])
    return (
        <>
            <Title title={'Your recent transactions'} />
            {isLoaded && (
                <>
                    <Table dataInfo={initialData}/>
                </>
            )}
            {showModal && (
                <Modal/>
            )}
        </>
    )
}