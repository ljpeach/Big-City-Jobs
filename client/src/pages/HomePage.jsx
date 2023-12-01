import Auth from '../utils/auth'
export default function HomePage() {
    return (
        <div>This is Home. Logged in: {Auth.loggedIn().toString()}</div>
    );
}