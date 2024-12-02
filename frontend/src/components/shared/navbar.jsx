import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
        if (res.data.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

  return (
    <div className="bg-dark-blue text-white">
      <div className="flex items-center  justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Hire<span className="text-light-blue">Us</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>

          </ul>
          {
            !user?
              (
                  <div className="flex items-center gap-2">
                      <Link to="/Login"><Button className="bg-light-background text-dark-blue hover:bg-slate-250">Login</Button></Link>
                      <Link to="/Signup"><Button className="bg-light-blue hover:bg-slate-350 text-dark-blue">SignUp</Button></Link>
                </div>)
            :
            (
            <Popover>
      <PopoverTrigger asChild>
      <Avatar className='cursor-pointer'>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    </Avatar>
      </PopoverTrigger>
      <PopoverContent  flex items-center className="w-70 bg-white text-dark-blue">
<div className='flex items-center  gap-4 space-y-2'>
<Avatar className='cursor-pointer'>
      <AvatarImage src="{user?.profile?.profilePhoto}" alt="@shadcn" />
    </Avatar>
    <div>
    <h4 className="font-medium">
      Palak Kumrawat
    </h4>
    <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
    </div>
    
</div>
<div className="flex flex-row items-center text-dark-blue gap-5 m-5">
    <div className="flex w-fit items-center  cursor-pointer" >
          
          <Button className="bg-dark-blue" > <User2/><Link to='/profile'>Profile</Link></Button>
    </div>
    <div className="flex w-fit items-center  cursor-pointer" >
        
          <Button onClick={logoutHandler} className="bg-dark-blue">   <LogOut/>LogOut</Button>
    </div>
</div>
      </PopoverContent>
            </Popover>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
