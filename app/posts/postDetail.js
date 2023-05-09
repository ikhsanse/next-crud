"use client";

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";

const PostDetail = ({ isOpen, onClose, post }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Detail Post</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Text>{post.title}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Text>{post.body}</Text>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default PostDetail;
