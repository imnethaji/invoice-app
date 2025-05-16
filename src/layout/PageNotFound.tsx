import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center text-4xl text-white">
      <h1>The page you are looking for is not available!</h1>
      <Link to="/" className="m-6">
        <button className="p-4 rounded-md bg-white text-black"> Home</button>
      </Link>
    </div>
  );
};
export default PageNotFound;
