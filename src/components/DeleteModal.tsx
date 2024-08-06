import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRef } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { deleteResource } from "../api/api";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  queryKey: string;
  toastMessage: string;
  mutationKey: string;
  resource: string;
}

const DeleteModal = ({
  isOpen,
  onClose,
  id,
  queryKey,
  toastMessage,
  mutationKey,
  resource,
}: Props) => {
  const cancelRef = useRef<any>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const getAuthHeader = useAuthHeader();

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: [queryKey] });
    toast({
      title: toastMessage,
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

  const { mutateAsync: deleteEntity, isPending } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: () => deleteResource(resource, id, getAuthHeader),
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Borrar
          </AlertDialogHeader>

          <AlertDialogBody>
            Estas seguro? No puedes deshacer esta accion
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => deleteEntity()}
              ml={3}
              isLoading={isPending}
            >
              Borrar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteModal;
