import customApi from "@/api/customApi";
import FormAuth from "@/components/fragments/auth/FormAuth";
import { registerUser } from "@/features/userSlice";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customApi.post("/auth/register", data);
      store.dispatch(registerUser(response.data));
      toast.success("Login successful");
      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      return null;
    }
  };

const RegisterPage = () => {
  return (
    <div>
      <FormAuth isRegister={true} />
    </div>
  );
};

export default RegisterPage;
