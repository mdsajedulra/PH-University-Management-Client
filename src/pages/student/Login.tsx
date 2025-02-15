/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, useFormContext } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { Row } from "antd";

type Inputs = {
  userId: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>({
  //   defaultValues: {
  //     userId: "0001",
  //     password: "admin12345",
  //   },
  // });

  const defaultValues = {
    userId: '0001',
    password: "admin12345"
  }


  // const { register } = useFormContext();

  const [login, { data, error }] = useLoginMutation();

  // console.log(data);

  const onSubmit = async (data: { userId: string; password: string }) => {
    console.log(data);
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      console.log(user);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login Success fully", { id: toastId });
      navigate("/admin/create-faculty");
    } catch (error) {
      if (error) {
        toast.error("something went wrong", { id: toastId });
      }
    }
  };

  return (
< Row justify="center" align="middle" style={{height: "100vh"}}>
    
    <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <PHInput type="text" name="userId" label="ID:" />
      <PHInput name="password" type="text" label="Password" />

      <input type="submit" />
    </PHForm>
  
    </Row>
  
  
  );
}
