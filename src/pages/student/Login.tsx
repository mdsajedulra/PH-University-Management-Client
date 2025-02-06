import { useForm, SubmitHandler } from "react-hook-form"
import { useLoginMutation } from "../../redux/api/authApi"


type Inputs = {
  userId: string
  password: string
}


export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      userId: "0001",
      password: "admin12345"
    }
  })


  const [login, {data, error}] = useLoginMutation()
  
  console.log("data", data)
  console.log("error", error);
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userInfo = {
      id: data.userId, 
      password: data.password,
    }
    login(userInfo)
  }
  console.log(watch("userId")) // watch input value by passing the name of it


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