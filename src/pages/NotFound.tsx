import { Link } from "react-router-dom";
import { routes } from "../_utils/Routes";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-10">404</h1>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">The requested page could not be found.</p>

        <Link to={routes.Home} className="btn btn-wide">Go Home</Link>
      </div>
    </div>
  );
}
