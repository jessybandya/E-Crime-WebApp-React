import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Avatar,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { updateAuthId } from "../../redux/dataSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
 
export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const authId = useSelector((state) => state.authId);
  const dispatch = useDispatch();
  const history = useNavigate();
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const logout = () => {
    auth.signOut();
    dispatch(updateAuthId(''));
    
    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 3500,    
    })
    history('/login')
  }
 
  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
              <a href="/" style={{display:'flex', alignItems:'center'}}>
              <img src="https://flowbite.s3.amazonaws.com/brand/logo-dark/mark/flowbite-logo.png" style={{height:40}} className="App-logo"/>
              <Typography
              className="mr-4 cursor-pointer py-1.5 font-medium"
              style={{fontWeight:'bold'}}
            >
              <i>E-Crime</i>
            </Typography>
              </a>
          <div className="flex items-center gap-4">
          {!authId ? (
            <a href="/login">
            <Button
            variant="gradient"
            size="sm"
            color="blue"
          >
            <span>Sign in</span>
          </Button>
            </a>
          ):(
            <Avatar onClick={logout} className="cursor-pointer" src="https://avatars.githubusercontent.com/u/69303168?v=4" alt="avatar" />
          )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}