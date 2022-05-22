import axios from '@/lib/axios'
import { useRouter } from 'next/router'

export const useAuth = () => {



    const router = useRouter()


    const register = async ({ setErrors, ...props }) => {
        setErrors([])

        axios
            .post('http://127.0.0.1:8000/register', props)
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
            .post('http://127.0.0.1:8000/register', props)
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
            .post('http://127.0.0.1:8000/login', props)
            .then(res => {
                console.log(res.data)
                if (res.data.success) {
                    console.log(res.data.user.id)
                    if(res.data.user.role === 1){
                    router.push(`/admin?id=${res.data.user.id}`)
                    } else {
                        router.push(`/student?id=${res.data.user.id}`)
                    }
                }
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const logout = async () => {
        const data = await axios.post('http://127.0.0.1:8000/logout')
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
