import { useGetAllSemestersQuery } from "../../redux/features/academicSemester/academicSemester";


const CreateAdmin = () => {
  const {data, error, isLoading} = useGetAllSemestersQuery(undefined)
  console.log("error",error);
  console.log(data);
  return <>This is CreateAdmin</>;
};

export default CreateAdmin;
