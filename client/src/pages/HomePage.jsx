import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
export default function HomePage() {
    const { loading, data } = useQuery(QUERY_USER);
    return (
        <>
            <div>This is Home. Logged in: {Auth.loggedIn().toString()}</div>
            {
                !loading && Auth.loggedIn() ? (
                    <ul>
                        <li>First: {data?.user.firstName}</li>
                        <li>Last: {data?.user.lastName}</li>
                        <li>Email: {data?.user.email}</li>
                        <li>ID: {data?.user._id}</li>
                    </ul>
                ) : (
                    <div>Not signed in.</div>
                )
            }
        </>
    );
}