"use client";

import { useEffect, useState } from "react";
import { fetchPosts, createPost, deletePost, updatePost } from "../api/posts";
import { useQuery, useMutation } from "react-query";
import PostCreate from "./postCreate";
import PostDetail from "./postDetail";
import PostEdit from "./postEdit";

import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Box,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const PostList = () => {
  const {
    isOpen: addIsOpen,
    onOpen: openAdd,
    onClose: closeAdd,
  } = useDisclosure();
  const {
    isOpen: detailIsOpen,
    onOpen: openDetail,
    onClose: closeDetail,
  } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onOpen: openEdit,
    onClose: closeEdit,
  } = useDisclosure();
  const [dataState, setDataState] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [maxId, setMaxId] = useState(0);
  const { data: posts, isLoading, isError } = useQuery("posts", fetchPosts);
  const deleteMutation = useMutation(deletePost);
  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      closeAdd();
    },
  });
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      closeEdit();
    },
  });

  useEffect(() => {
    const getMaxId = () => {
      let maxId = 0;
      dataState.forEach((post) => {
        if (post.id > maxId) {
          maxId = post.id;
        }
      });
      return maxId;
    };
    const max = getMaxId();
    setMaxId(max);
  }, [dataState]);

  useEffect(() => {
    if (posts) {
      setDataState(posts);
    }
  }, [posts]);

  const selectDetailPost = (post) => {
    setSelectedPost(post);
    openDetail();
  };
  const selectEditPost = (post) => {
    setSelectedPost(post);
    openEdit();
  };

  const submitHandler = async (data) => {
    const createdPost = await handleCreate(data);
    const updatedCreatedPost = { ...createdPost, id: maxId + 1 };
    const newData = [updatedCreatedPost, ...dataState];
    setDataState(newData);
  };

  const updateHandler = async (data) => {
    await updateHandlerPost(data);
    const postIndex = dataState.findIndex((post) => post.id === data.id);
    if (postIndex === -1) {
      console.error("Post not found");
      return;
    }
    const updatedPost = {
      ...dataState[postIndex],
      title: data.title,
      body: data.body,
    };

    const newDataState = [...dataState];
    newDataState[postIndex] = updatedPost;
    setDataState(newDataState);
  };

  const handleDelete = async (post) => {
    try {
      const updatedPosts = dataState.filter((item) => item.id !== post.id);
      setDataState(updatedPosts);
      await deleteMutation.mutateAsync(post.id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCreate = async (data) => {
    try {
      const response = await createMutation.mutateAsync(data);
      return response;
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const updateHandlerPost = async (data) => {
    try {
      const response = await updateMutation.mutateAsync(data);
      return response;
    } catch (error) {
      closeEdit();
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching posts</p>;
  }

  return (
    <Container maxW="container.lg">
      <Box ml="8" my="5">
        <Text fontSize="2xl">POST MANAGEMENT SYSTEM</Text>
        <br />
        <Button onClick={openAdd} mt="3" colorScheme="blue">
          Add Post
        </Button>
      </Box>
      <PostCreate
        onSubmit={submitHandler}
        onClose={closeAdd}
        isOpen={addIsOpen}
      />
      <PostDetail
        onClose={closeDetail}
        isOpen={detailIsOpen}
        post={selectedPost}
      />
      <PostEdit
        onClose={closeEdit}
        isOpen={editIsOpen}
        post={selectedPost}
        onUpdate={updateHandler}
      />
      <TableContainer>
        <Table size="md" variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>No</Th>
              <Th>Title</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataState?.map((post, idx) => (
              <Tr key={post.id}>
                <Td py={2} isNumeric>
                  {idx + 1}
                </Td>
                <Td py={2}>{post.title}</Td>
                <Td py={2}>
                  <Flex>
                    <Button
                      onClick={() => selectDetailPost(post)}
                      mr={2}
                      colorScheme="green"
                    >
                      Detail
                    </Button>{" "}
                    <Button
                      onClick={() => selectEditPost(post)}
                      mr={2}
                      colorScheme="yellow"
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      onClick={() => handleDelete(post)}
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PostList;
