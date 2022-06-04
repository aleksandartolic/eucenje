import axios from '../lib/axios'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
    const navigate = useNavigate()

    const register = async ({ setErrors, ...props }) => {
        setErrors([])

        axios
            .post('http://127.0.0.1:8001/register', props)
            .then(res => {
                if (res.data.success) {
                    navigate('/login')
                }
                return res
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }
    const addUser = async ({ setErrors, ...props }) => {
        setErrors([])

        axios
            .post('http://127.0.0.1:8001/register', props)
            .then(res => {
                return res
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    // const login = async ({ setErrors, setStatus, ...props }) => {
    //     setErrors([])
    //
    //
    //     axios
    //         .post('http://127.0.0.1:8001/login', props)
    //         .then(res => {
    //             if (res.data.success) {
    //                 if (res.data.user.role === 1) {
    //                     navigate(`/admin?id=${res.data.user.id}`)
    //                 } else if (res.data.user.role === 3) {
    //                     navigate.push(`/student?id=${res.data.user.id}`)
    //                 } else {
    //                     navigate(`/teacher?id=${res.data.user.id}`)
    //                 }
    //             }
    //         })
    //         .catch(error => {
    //             if (error.response.status !== 422) throw error
    //
    //             setErrors(Object.values(error.response.data.errors).flat())
    //         })
    // }

    const logout = async () => {
        await axios.post('http://127.0.0.1:8001/logout')
        window.location.pathname = '/login'
    }

    return {
        register,
        login,
        logout,
        addUser,
    }
}
