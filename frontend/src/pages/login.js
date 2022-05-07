import AuthValidationErrors from '@/components/AuthValidationErrors'
import { useAuth } from '@/hooks/auth'
import styled from 'styled-components'
import image from '../assets/images/backgroundLogin.jpg'
import FormWrapper from '../components/FormWrapper'
import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'

const Login = () => {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const submitForm = async event => {
        setLoading(true)
        event.preventDefault()
        login({ email, password, setErrors, setStatus })
        setLoading(false)
    }
    if (loading) {
        return <p>Loading</p>
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
                            inputProps={{ style: { fontSize: 16 } }} // font size of input text
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
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
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
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <br />

                        <Typography variant="h5">
                            {' '}
                            You don't have an account ?{' '}
                            <Link prefetch href="/register">
                                <StyledLink href="/register">
                                    Register
                                </StyledLink>
                            </Link>
                        </Typography>
                        <br />
                        <Button
                            style={{
                                fontSize: 10,
                                width: '90px',
                                height: '30px',
                            }}
                            type="submit"
                            variant="contained"
                            color="primary">
                            login
                        </Button>
                    </form>
                </FormWrapper>
            </LoginWrapper>
        </LoginLayout>
    )
}

export default Login

const LoginWrapper = styled.div`
    position: absolute;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const LoginLayout = styled.div`
    background: url(${props => props.image.src});
    background-size: cover;
    width: 100%;
    height: 100vh;
`
const StyledLink = styled.a`
    text-decoration: none;
    color: #93b5f2;
    :visited {
        color: #93b5f2;
    }
`
