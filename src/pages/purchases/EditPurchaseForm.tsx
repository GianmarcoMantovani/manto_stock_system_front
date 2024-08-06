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
import { Purchase } from "../../api/types";
import { patchResource } from "../../api/api";
import FormikInput from "../../components/FormikInput";
import SyncField from "../../components/Dropdowns/SyncField";

export interface Props {
  onClose: () => void;
  purchase: Purchase;
}

const validationSchema = Yup.object().shape({
  products: Yup.string().required(
    "Es obligatorio ingresar que productos se compraron"
  ),
  amount: Yup.number().required("El monto de la compra es obligatorio"),
  description: Yup.string().nullable(),
  providerId: Yup.number().required("El proveedor es obligatorio")
});

const EditPurchaseForm = ({ onClose, purchase }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const initialValues = {
    products: purchase.products,
    amount: purchase.amount,
    description: purchase.description,
    providerId: purchase.provider.id
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await patchPurchaseMutation();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["purchase"] });
    toast({
      title: "Compra editada",
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

  const { mutateAsync: patchPurchaseMutation, isPending } = useMutation({
    mutationKey: ["patchPurchase"],
    mutationFn: () =>
      patchResource(
        "purchase",
        purchase.id,
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
            isRequired={true}
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
            defaultValue={{
              value: formik.values.providerId,
              label: purchase.provider.company,
            }}
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

export default EditPurchaseForm;
