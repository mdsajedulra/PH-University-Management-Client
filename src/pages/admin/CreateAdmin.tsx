import { useGetAllSemestersQuery } from "../../redux/features/admin/academicManagement.api";



const CreateAdmin = () => {
  const {data, error, isLoading} = useGetAllSemestersQuery(undefined)
  console.log("error",error);
  console.log(data);
  return <>This is CreateAdmin</>;
};

export default CreateAdmin;
