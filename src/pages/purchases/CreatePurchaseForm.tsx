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
import SyncField from "../../components/Dropdowns/SyncField";

interface Props {
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  products: Yup.string().required(
    "Es obligatorio ingresar que productos se compraron"
  ),
  amount: Yup.number().required("El monto de la compra es obligatorio"),
  description: Yup.string().nullable(),
  providerId: Yup.number().required("El proveedor es obligatorio")
});

const initialValues = {
  products: "",
  amount: 0,
  description: "",
  providerId: null
};

const CreatePurchaseForm = ({ onClose }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await postPurchase();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["purchase"] });
    toast({
      title: "Compra creada",
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

  const { mutateAsync: postPurchase, isPending: creationLoading } = useMutation(
    {
      mutationKey: ["postPurchase"],
      mutationFn: () => postResource("purchase", getAuthHeader, formik.values),
      onSuccess: onSuccess,
      onError: onError,
    }
  );

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <GridItem colSpan={1}>
          <FormikInput
            label="Productos"
            name={"products"}
            id={"products"}
            value={formik.values.products}
            onChange={formik.handleChange}
            touched={formik.touched.products}
            error={formik.errors.products}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="Notas"
            isRequired={false}
            name={"description"}
            id={"description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            touched={formik.touched.description}
            error={formik.errors.description}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SyncField
            setter={(value: number | null) =>
              formik.setFieldValue("providerId", value, true)
            }
            error={formik.errors.providerId}
            touched={formik.touched.providerId}
            isRequired
            defaultValue={undefined}
            resource={"provider"}
            title={"Proveedor"}
            labelProp={"company"}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="Monto"
            isRequired={false}
            name={"amount"}
            id={"amount"}
            value={formik.values.amount}
            onChange={formik.handleChange}
            touched={formik.touched.amount}
            error={formik.errors.amount}
            type={"number"}
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

export default CreatePurchaseForm;
