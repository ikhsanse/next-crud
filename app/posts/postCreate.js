"use client";

import React from "react";
import { useForm } from "react-hook-form";
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
  Input,
  Textarea,
  Text
} from "@chakra-ui/react";

const PostCreate = ({ isOpen, onClose, onSubmit }) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
      } = useForm();
    
      const handleFormSubmit = async(data) => {
        await onSubmit({...data, userId: 5});
        reset()
      };
    
      return (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Add Post</ModalHeader>
                <ModalCloseButton />
    
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        type="text"
                        id="title"
                        {...register("title", { required: "Title is required" })}
                      />
                      {errors.title && <Text color='red'>{errors.title.message}</Text>}
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        id="body"
                        {...register("body", { required: "Description is required" })}
                      />
                      {errors.body && <Text color='red'>{errors.body.message}</Text>}
                    </FormControl>
                  </ModalBody>
    
                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" colorScheme="blue">
                      Submit
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </>
  );
};

export default PostCreate;
