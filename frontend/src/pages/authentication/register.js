import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import image from '../../assets/images/login.webp'
import FormWrapper from '../../components/FormWrapper'
import {
    TextField,
    Typography,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import AuthValidationErrors from '../../components/AuthValidationErrors'
import React from 'react'
import { useEffect } from 'react'
const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const { addToast } = useToasts()

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:8001/getUser/${userId}`)
                .then(response => {
                    if (response.data.user.role === 3) {
                        navigate('/student')
                    }
                    if (response.data.user.role === 2) {
                        navigate('/teacher')
                    }
                    if (response.data.user.role === 1) {
                        navigate('/admin')
                    }
                })
        }
    }, [])

    const submitForm = async event => {
        event.preventDefault()
        axios
            .post('http://127.0.0.1:8001/register', {
                name,
                email,
                password,
                password_confirmation,
                username,
                role,
            })
            .then(res => {
                console.log(res.data.message)
                setErrors([res.data.message])
                if (res.data.success) {
                    addToast('Registered successfully!', {
                        autoDismiss: true,
                        autoDismissTimeout: 5000,
                        appearance: 'success',
                    })
                    navigate('/login')
                }
                return res
            })
            .catch(error => {
                setErrors([error.response.data.message])
            })
    }

    return (
        <LoginLayout image={image}>
            <LoginWrapper>
                <FormWrapper>
                    <Typography
                        style={{
                            marginBottom: '3rem',
                            textAlign: 'center',
                            color: '#6495ED',
                        }}
                        variant="h3">
                        A d e m y
                    </Typography>
                    <AuthValidationErrors
                        style={{ marginBottom: '20px' }}
                        errors={errors}
                    />
                    <form
                        style={{ width: '100%', height: '100%' }}
                        onSubmit={submitForm}>
                        <TextField
                            inputProps={{ style: { fontSize: 17 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            style={{
                                width: '100%',
                                margin: '5px',
                                marginBottom: '2rem',
                            }}
                            label="Name"
                            variant="outlined"
                            id="name"
                            type="name"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={event => setName(event.target.value)}
                            required
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 17 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            style={{
                                width: '100%',
                                margin: '5px',
                                marginBottom: '2rem',
                            }}
                            label="Email"
                            variant="outlined"
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 17 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            style={{
                                width: '100%',
                                margin: '5px',
                                marginBottom: '2rem',
                            }}
                            label="Username"
                            variant="outlined"
                            id="username"
                            type="text"
                            value={username}
                            className="block mt-1 w-full"
                            onChange={event => setUsername(event.target.value)}
                            required
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 17 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            style={{
                                width: '100%',
                                margin: '5px',
                                marginBottom: '2rem',
                            }}
                            label="Password"
                            variant="outlined"
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 17 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            style={{
                                width: '100%',
                                margin: '5px',
                                marginBottom: '2rem',
                            }}
                            label="Confirm Password"
                            variant="outlined"
                            id="password_confirmation"
                            type="password"
                            value={password_confirmation}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />
                        <br />
                        <FormControl
                            style={{
                                width: '100%',
                                margin: '0 5px 10px 5px',
                            }}>
                            <InputLabel
                                style={{
                                    width: '100%',
                                    marginTop: '0px',
                                    fontSize: '13px',
                                }}
                                htmlFor="role">
                                Role
                            </InputLabel>
                            <Select
                                label="Role"
                                variant="outlined"
                                id="role"
                                type="text"
                                value={role}
                                className="block mt-1 w-full"
                                onChange={event => setRole(event.target.value)}
                                required>
                                <MenuItem value={3}>Student</MenuItem>
                                <MenuItem value={2}>Teacher</MenuItem>
                                <MenuItem value={1}>Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <Typography variant="h5">
                            {' '}
                            You already have an account ?{' '}
                            <Link to="/login">Sign In</Link>
                        </Typography>
                        <br />
                        <Button
                            className="ml-4"
                            style={{
                                marginTop: '1rem',
                                fontSize: 10,
                                width: '90px',
                                height: '30px',
                            }}
                            type="submit"
                            variant="contained"
                            color="primary">
                            register
                        </Button>
                    </form>
                </FormWrapper>
            </LoginWrapper>
        </LoginLayout>
    )
}

export default Register

const LoginWrapper = styled.div`
    position: absolute;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const LoginLayout = styled.div`
    background: url(${image});
    background-size: cover;
    width: 100%;
    height: 100vh;
`

// const StyledLink = styled.a`
//     text-decoration: none;
//     color: #93b5f2;
//     :visited {
//         color: #93b5f2;
//     }
// `
