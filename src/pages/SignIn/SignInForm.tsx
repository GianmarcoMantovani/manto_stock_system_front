import { Button, chakra, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput";
import { useSignInMutation } from "../../hooks/UseSignInMutation";
import { signInFormStyles } from "./styles";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const initialValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      await signIn();
    },
  });

  const { mutateAsync: signIn, isPending } = useSignInMutation(
    formik.values.email,
    formik.values.password
  );

  return (
    <chakra.form {...signInFormStyles.form} onSubmit={formik.handleSubmit}>
      <VStack {...signInFormStyles.vStack}>
        <FormikInput
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
          touched={formik.touched.email}
          labelTextColor="whitesmoke"
          height="44px"
          width="276px"
          autoFocus
        />
        <FormikInput
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
          touched={formik.touched.password}
          type="password"
          labelTextColor="whitesmoke"
          height="44px"
          width="276px"
        />
        <Button
          bgColor={"black"}
          _hover={{color: "white", bgColor: "black"}}
          isDisabled={isPending}
          isLoading={isPending}
          width="276px"
          variant="primary"
          type="submit"
          color={"white"}
        >
          Ingresar
        </Button>
      </VStack>
    </chakra.form>
  );
};
export default SignInForm;