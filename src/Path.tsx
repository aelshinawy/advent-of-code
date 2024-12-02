import { useLocation, useParams } from "wouter";

export default function Path() {
    const [location, ] = useLocation();
    const params = useParams();
    return <div>{`The current page is: ${location} - params: ${JSON.stringify(params)}`}</div>;
}