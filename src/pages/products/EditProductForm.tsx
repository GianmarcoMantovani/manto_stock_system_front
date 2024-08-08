import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  GridItem,
  HStack,
  SimpleGrid,
  chakra,
  useToast,
} from "@chakra-ui/react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { Product } from "../../api/types";
import { patchResource } from "../../api/api";
import FormikInput from "../../components/FormikInput";

export interface Props {
  onClose: () => void;
  product: Product;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string().nullable(),
  weight: Yup.number().nullable()
});

const EditProductForm = ({ onClose, product }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const initialValues = {
    name: product.name,
    description: product.description,
    weight: product.weight
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await patchProductMutation();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["product"] });
    toast({
      title: "Producto editado",
      status: "success",
      isClosable: true,
    });
    onClose();
  };

  const onError = (err: AxiosError) => {
    toast({
      title: "Error",
      description: <>{err?.response?.data || "Try again later"}</>,
      status: "error",
    });
  };

  const { mutateAsync: patchProductMutation, isPending } = useMutation({
    mutationKey: ["patchProduct"],
    mutationFn: () =>
      patchResource(
        "product",
        product.id,
        getAuthHeader,
        initialValues,
        formik.values
      ),
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <GridItem colSpan={1}>
          <FormikInput
            label="Nombre"
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
              isLoading={isPending}
              isDisabled={isPending}
            >
              Editar
            </Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  );
};

export default EditProductForm;
