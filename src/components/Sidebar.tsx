import { Link, useNavigate } from "react-router-dom";
import { Box, HStack, Center, VStack, Button, Text, Img, Divider } from "@chakra-ui/react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ApplicationUser } from "../api/types";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { IoIosLogOut } from "react-icons/io";
import { BiSolidFoodMenu } from "react-icons/bi";
import logoImagen from "../assets/images/logo_manto.jpeg";

const Sidebar = () => {
  const currentUser = useAuthUser<ApplicationUser>();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const logout = () => {
    signOut();
    navigate("/login");
  };

  const NAV_ITEMS = [
    ...(currentUser?.userType === 0
      ? [
        {
          label: "Proveedores",
          href: "/proveedores",
          opacity: location.pathname.includes("proveedores") ? 1 : 0.5,
          icon: (
            <BiSolidFoodMenu
              size={25}
              opacity={location.pathname.includes("proveedores") ? "1" : "0.5"}
            />
          ),
        },
        {
          label: "Compras",
          href: "/compras",
          opacity: location.pathname.includes("compras") ? 1 : 0.5,
          icon: (
            <BiSolidFoodMenu
              size={25}
              opacity={location.pathname.includes("compras") ? "1" : "0.5"}
            />
          ),
        }
      ]
      : []),
  ];

  return (
    <HStack
      bg={"gray.800"}
      width={"20%"}
      height="100%"
      position="fixed"
      spacing={8}
      top={0}
      left={0}
      justifyContent="center"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
    >
      <VStack width={"100%"} color={"whitesmoke"} >
        <VStack>
        <Link
          to={"/"}
        >
          <Img src={logoImagen} alt="Logo" style={{ marginBottom: '3s0px', maxHeight: '100px' }} />
        </Link>
        <Text fontWeight="bold" color="whitesmoke" fontSize={"xx-large"} mb={20}>
          MANTO
        </Text>
        </VStack>
        
        {NAV_ITEMS.map((item, idx) => (
          <Box
            key={idx}
            _hover={{ opacity: 0.7 }}
          >
            <Link to={item.href}>
              <Box mb={3} mt={3}>
                <Center>{item.icon}</Center>
              </Box>
              <Box>
                <Center color={"FFFFFF"} opacity={item.opacity}>
                  {item.label}
                </Center>
              </Box>
            </Link>
          </Box>
        ))}
        <VStack>
         <Divider mt={20}/>
        {currentUser &&
          <Button _hover={{ opacity: 0.7 }} bg={"gray.800"} onClick={logout}>
            <HStack spacing={2} alignItems="center">
              <Text color={"white"}>Salir</Text>
              <IoIosLogOut color={"white"} size={25} />
            </HStack>
          </Button>
          }
          </VStack>
      </VStack>
    </HStack>
  );
};

export default Sidebar;