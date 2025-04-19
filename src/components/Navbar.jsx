import { Button, Container, Flex, HStack, Text, useColorMode} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import {PlusSquareIcon} from "@chakra-ui/icons";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    /* Cái này là cái thanh NavBar cao nhất á nha, thẻ container sẽ chứa hết thanh đó (gồm logo, icon, sukem store...) 
      Cái useColorModeValue trả về màu bg cho container navbar tùy vào lựa chọn màu nền, light mode thì gray.100 và ngược lại
    */
    <Container maxW={"1140px"} px={4}>  
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
      >
        <Text
        fontSize={{base: "22", sm: "28"}}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        >
          <Link to={"/"}> Sukem Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon/> : <LuSun size="20"/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;