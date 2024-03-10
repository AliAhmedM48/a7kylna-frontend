//#region IMPORTS
import { Post } from "../interfaces/post";
import PostComponent from "../components/PostCard";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import axiosClient from "../_utils/axiosClient";
import { endpointsPosts } from "../_utils/ApiEndpoints";
import { routes } from "../_utils/Routes";
//#endregion

// * REACT COMPONENT
export default function Home() {

  // & VARIABLES
  const [posts, setPosts]: [Post[] | null, Dispatch<SetStateAction<Post[] | null>>] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const _axiosClient = axiosClient(auth.token);

  // ^ FETCHING DATA
  const fetchingData = async () => {
    //#region 
    setLoading(true);
    try {

      const posts = (await _axiosClient.get(endpointsPosts.getAll)).data;
      setPosts(posts);
    }
    catch (error) { console.error("Error fetching data:", error); }
    finally { setLoading(false); }
    //#endregion
  };
  console.log(posts);


  // ^ USER EFFECT
  useEffect(() => { fetchingData(); }, []);

  // & HANDLE DELETE POST
  const handleDeletePost = async (id: string) => {
    //#region 
    if (!window.confirm('Are you sure?')) return;
    try {
      await _axiosClient.delete(endpointsPosts.deleteOneById + id);
      // Update the posts after successful deletion
      posts && setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      throw error;
    }
    //#endregion
  };

  // & LOADING SCREEN
  if (loading) return <h1 className="text-center">Loading...</h1>

  // * REACT JSX
  return (
    <>
      <div className="space-y-5 py-5 px-5 md:px-0">
        {posts && posts.length ? posts?.slice().reverse().map(post => (
          <PostComponent user={auth.user} key={post._id} post={post} onDelete={handleDeletePost} />
        )) :
          <h1 className="text-center">No posts yet</h1>
        }

      </div>

      {auth.user &&
        <Link
          to={routes.Add}
          className="group fixed right-10 bottom-24 inline-block focus:outline-none focus:ring" >
          <span
            className="absolute inset-0 translate-x-1.5 rounded-full translate-y-1.5  transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>

          <span
            className="relative inline-block border-2 border-current rounded-full text-sm font-bold uppercase tracking-widest group-active:text-opacity-75"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
          </span>
        </Link>
      }
    </>
  );
}
