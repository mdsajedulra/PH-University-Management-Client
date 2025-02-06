import { useForm } from "react-hook-form"
import { useLoginMutation } from "../../redux/api/authApi"
import { useAppDispatch } from "../../redux/hooks"
import { setUser } from "../../redux/features/auth/authSlice"
import { verifyToken } from "../../utils/verifyToken"


type Inputs = {
  userId: string
  password: string
}


export default function Login() {



  const dispatch = useAppDispatch()



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      userId: "0001",
      password: "admin12345"
    }
  })


  const [login, {data, error}] = useLoginMutation()
  

  // console.log(data);
  
  const onSubmit = async (data:{   userId: string,
    password: string}) => {
    const userInfo = {
      id: data.userId, 
      password: data.password,
    }
    
   const res= await login(userInfo).unwrap()
   const user = verifyToken(res.data.accessToken)
   console.log(user)
   dispatch(setUser({user: user, token: res.data.accessToken}))
   console.log(res);
    
  }
 


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("userId")} />


      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}


      <input type="submit" />
    </form>
  )
}