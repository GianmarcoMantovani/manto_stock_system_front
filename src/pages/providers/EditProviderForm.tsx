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
import { Provider } from "../../api/types";
import { patchResource } from "../../api/api";
import FormikInput from "../../components/FormikInput";
import SyncField from "../../components/Dropdowns/SyncField";

export interface Props {
  onClose: () => void;
  provider: Provider;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  products: Yup.string().required(
    "Es obligatorio ingresar que productos vende el proveedor"
  ),
  cityId: Yup.number().required("La ciudad del proveedor es obligatoria"),
  company: Yup.string().nullable(),
  address: Yup.string().nullable(),
  phoneNumber: Yup.string().nullable(),
  attentionHours: Yup.string().nullable()
});

const EditProviderForm = ({ onClose, provider }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const initialValues = {
    name: provider.name,
    products: provider.products,
    cityId: provider.city.id,
    company: provider.company,
    address: provider.address,
    phoneNumber: provider.phoneNumber,
    attentionHours: provider.attentionHours
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await patchProviderMutation();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["provider"] });
    toast({
      title: "Proveedor editado",
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

  const { mutateAsync: patchProviderMutation, isPending } = useMutation({
    mutationKey: ["patchProvider"],
    mutationFn: () =>
      patchResource(
        "provider",
        provider.id,
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
            label="Productos"
            isRequired={true}
            name={"products"}
            id={"products"}
            value={formik.values.products}
            onChange={formik.handleChange}
            touched={formik.touched.products}
            error={formik.errors.products}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SyncField
            setter={(value: number | null) =>
              formik.setFieldValue("cityId", value, true)
            }
            error={formik.errors.cityId}
            touched={formik.touched.cityId}
            isRequired
            defaultValue={{
              value: formik.values.cityId,
              label: provider.city.name,
            }}
            resource={"provider/cities"}
            title={"Ciudad"}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="Empresa"
            isRequired={false}
            name={"company"}
            id={"company"}
            value={formik.values.company}
            onChange={formik.handleChange}
            touched={formik.touched.company}
            error={formik.errors.company}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="Direccion"
            isRequired={false}
            name={"address"}
            id={"address"}
            value={formik.values.address}
            onChange={formik.handleChange}
            touched={formik.touched.address}
            error={formik.errors.address}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="Numero de telefono"
            isRequired={false}
            name={"phoneNumber"}
            id={"phoneNumber"}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            touched={formik.touched.phoneNumber}
            error={formik.errors.phoneNumber}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="Horarios de atencion"
            isRequired={false}
            name={"attentionHours"}
            id={"attentionHours"}
            value={formik.values.attentionHours}
            onChange={formik.handleChange}
            touched={formik.touched.attentionHours}
            error={formik.errors.attentionHours}
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

export default EditProviderForm;
