import { Link, useNavigate } from "react-router-dom";
import { Box, HStack, Center, VStack, Button, Text } from "@chakra-ui/react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ApplicationUser } from "../api/types";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { IoIosLogOut } from "react-icons/io";
import { FaPeopleCarry } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { TbCandy } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaCashRegister } from "react-icons/fa";
import { PiRowsPlusTopFill } from "react-icons/pi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

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
              <FaPeopleCarry
                size={25}
                opacity={
                  location.pathname.includes("proveedores") ? "1" : "0.5"
                }
              />
            ),
          },
          {
            label: "Compras",
            href: "/compras",
            opacity: location.pathname.includes("compras") ? 1 : 0.5,
            icon: (
              <BiSolidPurchaseTag
                size={25}
                opacity={location.pathname.includes("compras") ? "1" : "0.5"}
              />
            ),
          },
          {
            label: "Clientes",
            href: "/clientes",
            opacity: location.pathname.includes("clientes") ? 1 : 0.5,
            icon: (
              <FaPeopleGroup
                size={25}
                opacity={location.pathname.includes("clientes") ? "1" : "0.5"}
              />
            ),
          },
          {
            label: "Ventas",
            href: "/ventas",
            opacity: location.pathname.includes("ventas") ? 1 : 0.5,
            icon: (
              <FaMoneyBillTrendUp
                size={25}
                opacity={location.pathname.includes("ventas") ? "1" : "0.5"}
              />
            ),
          },
          {
            label: "Productos",
            href: "/productos",
            opacity: location.pathname.includes("productos") ? 1 : 0.5,
            icon: (
              <TbCandy
                size={25}
                opacity={location.pathname.includes("productos") ? "1" : "0.5"}
              />
            ),
          },
          {
            label: "Producciones",
            href: "/producciones",
            opacity: location.pathname.includes("producciones") ? 1 : 0.5,
            icon: (
              <PiRowsPlusTopFill
                size={25}
                opacity={
                  location.pathname.includes("producciones") ? "1" : "0.5"
                }
              />
            ),
          },
          {
            label: "Balance",
            href: "/balance",
            opacity: location.pathname.includes("balance") ? 1 : 0.5,
            icon: (
              <FaCashRegister
                size={25}
                opacity={location.pathname.includes("balance") ? "1" : "0.5"}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <HStack
      bg={"gray.800"}
      width={"20%"}
      height="100vh"
      position="fixed"
      left={0}
      justifyContent="center"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
      spacing={0}
      overflow="hidden"
    >
      <VStack
        width={"100%"}
        color={"whitesmoke"}
        spacing={4}
        alignItems="stretch"
        p={4}
      >
        <VStack spacing={4}>
          <Text fontWeight="bold" color="whitesmoke" fontSize={"xx-large"}>
            MANTO
          </Text>
        </VStack>
        <VStack spacing={3} flex="1" overflow="auto">
          {NAV_ITEMS.map((item, idx) => (
            <Box key={idx} _hover={{ opacity: 0.7 }}>
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
        </VStack>

        <VStack spacing={4} marginTop={3}>
          {currentUser && (
            <Button _hover={{ opacity: 0.7 }} bg={"gray.800"} onClick={logout}>
              <HStack spacing={2} alignItems="center">
                <Text color={"white"}>Salir</Text>
                <IoIosLogOut color={"white"} size={25} />
              </HStack>
            </Button>
          )}
        </VStack>
      </VStack>
    </HStack>
  );
};

export default Sidebar;
