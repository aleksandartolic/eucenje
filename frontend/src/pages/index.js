import Link from 'next/link'

export default function Home() {
    return (
        <div className="container">
            <div className="nav">
                <div className="nav__logo">Ademy</div>
                <div className="nav__items">
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                    <Link href="/register">
                        <a>Register</a>
                    </Link>
                </div>
            </div>
            <div className="hero-container">
                <div className="hero">
                    <div className="hero__title">
                        <p className="hero__title--message">
                            Welcome to the Ademy
                        </p>
                        <p className="hero__title--desc">
                            Choose from 185,000 online video courses with new
                            additions published every month
                        </p>
                    </div>
                    <button className="hero__button">Get Started</button>
                </div>
            </div>
        </div>
    )
}
