import {
  chakra,
  SimpleGrid,
  useToast,
  GridItem,
  HStack,
  Button,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postResource } from "../../api/api";
import FormikInput from "../../components/FormikInput";

interface Props {
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string().nullable(),
  weight: Yup.number().nullable()
});

const initialValues = {
  name: "",
  description: "",
  weight: 0
};

const CreateProductForm = ({ onClose }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await postProduct();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["product"] });
    toast({
      title: "Producto creado",
      status: "success",
      isClosable: true,
    });
    onClose();
  };

  const onError = (err: AxiosError) => {
    console.log(err);
    toast({
      title: "Error",
      description: <>{err?.response?.data || "Try again later"}</>,
      status: "error",
    });
  };

  const { mutateAsync: postProduct, isPending: creationLoading } = useMutation(
    {
      mutationKey: ["postProduct"],
      mutationFn: () => postResource("product", getAuthHeader, formik.values),
      onSuccess: onSuccess,
      onError: onError,
    }
  );

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <GridItem colSpan={1}>
          <FormikInput
            label="Nombre"
            isRequired={false}
            name={"name"}
            id={"name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            touched={formik.touched.name}
            error={formik.errors.name}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="Peso"
            name={"weight"}
            id={"weight"}
            value={formik.values.weight}
            onChange={formik.handleChange}
            touched={formik.touched.weight}
            error={formik.errors.weight}
            type={"number"}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="Descripcion"
            name={"description"}
            id={"description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            touched={formik.touched.description}
            error={formik.errors.description}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <HStack w="full" justifyContent={"flex-end"} spacing={5} p={5}>
            <Button type="button" onClick={onClose} variant="ghost">
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme={"orange"}
              isLoading={creationLoading}
              isDisabled={creationLoading}
            >
              Crear
            </Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  );
};

export default CreateProductForm;
