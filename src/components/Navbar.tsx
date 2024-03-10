import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { routes } from "../_utils/Routes";

function Navbar() {


  const auth = useAuth();

  const userAvatar = () => {
    return (
      <>
        <div className="flex gap-5 items-center">
          <span className="text-2xl">{auth.user?.fullName}</span>
          <figure className=" w-16 h-16 overflow-hidden rounded-full">
            <img tabIndex={0} role="button" className="w-full h-full object-cover" src={auth.user?.avatar} alt="" />
          </figure>
        </div>
      </>
    )

  }
  return (
    <>
      <div className="navbar bg-base-100">

        {/* start */}
        <div className="navbar-start">
          <Link to={routes.Home} className="btn btn-ghost text-xl hover:bg-transparent">A7kylna 👀</Link>
        </div>

        {/* center */}
        <div className="navbar-center hidden sm:flex">
          {/* <label className="flex cursor-pointer gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
            <input type="checkbox" value="synthwave" className="toggle theme-controller" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </label> */}
        </div>

        {/* end */}
        <div className="navbar-end gap-2 h-20 mr-3 flex items-center">

          <div className="dropdown">
            <div tabIndex={0} role="button" className="sm:hidden ">
              {auth.user ?
                userAvatar()
                :
                <div className="btn btn-ghost sm:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>

                </div>
              }

            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content right-0  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

              {/* {!auth.user && */}
              <>
                <li>
                  <NavLink to={routes.Register}>Register</NavLink>
                </li>
                <li>
                  <NavLink to={routes.Login}>Login</NavLink>
                </li>
              </>
              {/* } */}
              {auth.user &&
                <li>
                  <button onClick={() => { auth.logout() }} >Logout</button>
                </li>
              }
            </ul>
          </div>

          {!auth.user ?
            <>
              <NavLink to={routes.Login} className="btn hidden sm:inline-flex">Login</NavLink>
              <NavLink to={routes.Register} className="btn hidden sm:inline-flex">Register</NavLink>
            </>
            :
            // <button onClick={() => { auth.logout() }} className="btn hidden sm:inline-flex" >Logout</button>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="hidden sm:block">
                {auth.user ?
                  userAvatar()
                  : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                }
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content right-0  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                {!auth.user &&
                  <>
                    <li>
                      <NavLink to={routes.Register}>Register</NavLink>
                    </li>
                    <li>
                      <NavLink to={routes.Login}>Login</NavLink>
                    </li>
                  </>
                }
                {auth.user &&
                  <li>
                    <button onClick={() => { auth.logout() }} >Logout</button>
                  </li>
                }
              </ul>
            </div>
          }


        </div>
      </div>
    </>
  );
}

export default Navbar;

// {
//   auth.user &&
//   <>
//     <div className="dropdown">
//       <img tabIndex={0} role="button" className="w-16" src="https://avatar.iran.liara.run/public/boy" alt="" />
//       <ul tabIndex={0} className="menu menu-sm right-0 dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//         <>
//           {!auth.user &&
//             <>
//               <li>
//                 <NavLink to={routes.Register}>Register</NavLink>
//               </li>
//               <li>
//                 <NavLink to={routes.Login}>Login</NavLink>
//               </li>
//             </>
//           }
//           {auth.user &&
//             <li>
//               <button onClick={() => { auth.logout() }} >Logout</button>
//               {/* <button onClick={() => { auth.logout() }} className="btn hidden sm:inline-flex">Logout</button> */}
//             </li>
//           }
//         </>
//       </ul>
//     </div>
//   </>
// }