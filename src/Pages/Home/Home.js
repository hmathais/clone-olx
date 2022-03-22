import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>

            <Link to={'/about'}>About..</Link>
        </div>
    )
}