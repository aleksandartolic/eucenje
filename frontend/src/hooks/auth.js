import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { useAppContext } from "../../state"
export const useAuth = () => {

    const { state, dispatch } = useAppContext();
    const router = useRouter()
    console.log(state);

    const register = async ({ setErrors, ...props }) => {
        setErrors([])

        axios
            .post('http://127.0.0.1:8001/register', props)
            .then(res => {
                if (res.data.success) {
                    router.push('/login')
                }
                return res
            })
            .catch(error => {
                console.log(error.response.data)
                // console.log(error)
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
                console.log(error.response.data)
                // console.log(error)
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })

    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        axios
            .post('http://127.0.0.1:8001/login', props)
            .then(res => {
                console.log(res.data)
                if (res.data.success) {
                    router.push('/admin')
                }
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const logout = async () => {
        const data = await axios.post('http://127.0.0.1:8001/logout')
        console.log(data)
        window.location.pathname = '/login'
    }

    return {
        register,
        login,
        logout,
        addUser,
    }
}
