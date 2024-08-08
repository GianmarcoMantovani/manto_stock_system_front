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
import { Client } from "../../api/types";
import { getClientTypes, patchResource } from "../../api/api";
import FormikInput from "../../components/FormikInput";
import SyncField from "../../components/Dropdowns/SyncField";
import LabeledReactSelectInput from "../../components/Dropdowns/LabeledReactSelectInput";

export interface Props {
  onClose: () => void;
  client: Client;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  cityId: Yup.number().required("La ciudad del proveedor es obligatoria"),
  clientTypeEnum: Yup.number().required("El tipo de cliente es obligatorio"),
  address: Yup.string().nullable(),
  phoneNumber: Yup.string().nullable(),
  attentionHours: Yup.string().nullable()
});

const EditClientForm = ({ onClose, client }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const initialValues = {
    name: client.name,
    cityId: client.city.id,
    clientTypeEnum: client.clientTypeEnum,
    address: client.address,
    phoneNumber: client.phoneNumber,
    attentionHours: client.attentionHours
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await patchClientMutation();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["client"] });
    toast({
      title: "Cliente editado",
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

  const { mutateAsync: patchClientMutation, isPending } = useMutation({
    mutationKey: ["patchClient"],
    mutationFn: () =>
      patchResource(
        "client",
        client.id,
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
          <SyncField
            setter={(value: number | null) =>
              formik.setFieldValue("cityId", value, true)
            }
            error={formik.errors.cityId}
            touched={formik.touched.cityId}
            isRequired
            defaultValue={{
              value: formik.values.cityId,
              label: client.city.name,
            }}
            resource={"provider/cities"}
            title={"Ciudad"}
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
        <GridItem colSpan={1}>
          <LabeledReactSelectInput
            name="clientTypeEnum"
            value={formik.values.clientTypeEnum}
            error={formik.errors.clientTypeEnum}
            touched={formik.touched.clientTypeEnum}
            isClearable={false}
            label="Tipo de Cliente"
            options={getClientTypes().map((ct) => ({
              value: ct.id,
              label: ct.code,
            }))}
            setter={(value: any) => formik.setFieldValue("clientTypeEnum", value, true)}
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

export default EditClientForm;
