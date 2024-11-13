import React, {  useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { toast } from '@/hooks/use-toast'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "", 
    role: "",
    file: ""
});
const navigate = useNavigate();

const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
}
const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
}
const submitHandler = async (e) => {
    e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast .success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } 
        }

   
  return (
    
    <div>
    <Navbar />
    <div className='flex items-center justify-center max-w-7xl mx-auto text-dark-blue'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 bg-light-blue'>
            <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
            <div className='my-2'>
                <Label>Full Name</Label>
                <Input
                    type="text"
                     value={input.fullname}
                    name="fullname"
                            onChange={changeEventHandler}                    

                    placeholder="John Doe"
                />
            </div>
            <div className='my-2'>
                <Label>Email</Label>
                <Input
                    type="email"
                    
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}                    
                    placeholder="abc@gmail.com"
                />
            </div>
            <div className='my-2'>
                <Label>Phone Number</Label>
                <Input
                    type="text"
                    
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}                    
                    placeholder="8080808080"
                />
            </div>
            <div className='my-2'>
                <Label>Password</Label>
                <Input
                    type="password"
                    
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}                    
                    placeholder="abc123"
                />
            </div>
            <div className='flex items-center justify-between'>
                <RadioGroup className="flex items-center gap-4 my-5">
                    <div className="flex items-center space-x-2">
                        <Input
                            type="radio"
                            name="role"
                            value="student"
                            checked={input.role === 'student'}
                         onChange={changeEventHandler}
                            
                            className="cursor-pointer"
                        />
                        <Label htmlFor="r1">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="radio"
                            name="role"
                            value="recruiter"
                            checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                            
                            className="cursor-pointer"
                        />
                        <Label htmlFor="r2">Recruiter</Label>
                    </div>
                </RadioGroup>
                <div className='flex items-center gap-2'>
                    <Label>Profile</Label>
                    <Input
                        accept="image/*"
                        type="file"
                        onChange={changeFileHandler}
                        className="cursor-pointer"
                    />
                </div>
            </div>
            
                 <Button type="submit" className="w-full my-4">Signup</Button>
            
            <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
    </div>
</div>
)
}

export default Signup
