"use client";

import React, { useEffect } from "react";
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
} from "@chakra-ui/react";

const PostEdit = ({ isOpen, onClose, post, onUpdate }) => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    onUpdate(data)
  };

  useEffect(() => {
    reset(post);
  }, [post, reset]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Edit Post</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    id="title"
                    {...register("title", { required: "Title is required" })}
                    defaultValue={post.title}
                  />
                  {errors.title && <span>{errors.title.message}</span>}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    id="body"
                    {...register("body", { required: "Body is required" })}
                    defaultValue={post.body}
                  />
                  {errors.body && <span>{errors.body.message}</span>}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="red" mr={2} onClick={onClose}>
                  Close
                </Button>
                <Button type="submit" colorScheme="blue">
                  Save Changes
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default PostEdit;
