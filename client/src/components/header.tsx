import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { Box, Flex, Text, Link, Button } from '@chakra-ui/core'
import { FaRegPaperPlane, FaGithub } from 'react-icons/fa'

const Header = ({ siteTitle }) => (
  <Box
    as="header"
    position="fixed"
    top="0"
    bg="red"
    left="0"
    right="0"
    borderBottom="1px solid"
    borderBottomColor="gray.100"
  >
    <Flex alignItems="center" px={5} my={3}>
      <Text
        as={Flex}
        alignItems="center"
        fontSize="2xl"
        fontWeight="bolder"
        color="teal.700"
      >
        <Box as={FaRegPaperPlane} size="32px" mr={3} />
        simple message
      </Text>
      <Flex justifyContent="flex-end" flex="1" alignItems="center">
        <Link as={GatsbyLink} aria-label="signup" to="/signup">
          Sign up
        </Link>
        <Link as={GatsbyLink} aria-label="login" to="/login">
          Log in
        </Link>
        {/* {isLoggedIn && (
          <Button ml={4} onClick={onLogout} data-testid="logout">
            Logout
          </Button> */}
        {/* )} */}
      </Flex>
    </Flex>
  </Box>
)

export { Header }
