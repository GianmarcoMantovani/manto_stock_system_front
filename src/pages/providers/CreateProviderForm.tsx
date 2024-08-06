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

const initialValues = {
  name: "",
  products: "",
  cityId: 0,
  company: "",
  address: "",
  phoneNumber: "",
  attentionHours: ""
};

const CreateProviderForm = ({ onClose }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await postProvider();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["provider"] });
    toast({
      title: "Proveedor creado",
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

  const { mutateAsync: postProvider, isPending: creationLoading } = useMutation(
    {
      mutationKey: ["postProvider"],
      mutationFn: () => postResource("provider", getAuthHeader, formik.values),
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
            label="Productos"
            isRequired={false}
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
            defaultValue={undefined}
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

export default CreateProviderForm;
