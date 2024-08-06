import { Button } from "@chakra-ui/react";

interface Props {
  component: React.ReactNode;
  onOpen: () => void;
}

const AddNewButton = ({component, onOpen} : Props) => {
  return (
    <>
      <Button
        bg={"#3FAE3C"}
        color={"white"}
        _hover={{ bg: "green.500" }}
        top={5}
        px={10}
        w={{ base: "full", md: "fit-content" }}
        onClick={onOpen}
      >
        CREAR
      </Button>

      {component}
    </>
  );
};
export default AddNewButton;
