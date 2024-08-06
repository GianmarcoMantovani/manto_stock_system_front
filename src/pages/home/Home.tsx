import { Box, Heading, Img, Text, VStack } from '@chakra-ui/react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { ApplicationUser } from '../../api/types';
import logoManto from '../../assets/images/logo_manto.jpeg';

const Home = () => {
  const currentUser = useAuthUser<ApplicationUser>();

  return (
    <Box
      flex="1"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h={"100%"}
    >
      <Img src={logoManto} alt="Logo" style={{ marginBottom: '20px', maxHeight: '200px' }} />
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" textAlign="center">
          Bienvenid@ {currentUser?.fullName}!
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Aquí podrás administrar Alfajores MANTO.
        </Text>
      </VStack>
    </Box>
  );
};

export default Home;