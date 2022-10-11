import React, { useEffect, useState } from 'react';

import Tree, { moveItemOnTree, mutateTree } from '@atlaskit/tree';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { BiQuestionMark } from 'react-icons/bi';

import { CHILDREN_TYPES } from '../constants';

const parseToTreeItem = (item) => {
  const childrenMap = item?.children?.map((child) => child.id) || [];
  return {
    id: item.id,
    children: childrenMap,
    hasChildren: childrenMap?.length > 0,
    isExpanded: true,
    data: {
      ...item,
    },
  };
};

export const parsedTreeData = (data) => {
  const flatten = (data) => {
    let result = [];
    data.forEach((a) => {
      result.push(a);
      if (Array.isArray(a.children)) {
        result = result.concat(flatten(a.children));
      }
    });
    return result;
  };

  const flattenedData = flatten(data);

  const rootLevelItems = data.map((child) => child.id);
  const treeItems = flattenedData.reduce((acc, current) => {
    return {
      ...acc,
      [current.id]: parseToTreeItem(current),
    };
  }, {});

  const tree = {
    rootId: 'root',
    items: {
      root: {
        id: 'root',
        children: rootLevelItems,
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: 'root',
          itemType: CHILDREN_TYPES.folder,
        },
      },
      ...treeItems,
    },
  };

  return tree;
};

const SurveyExplorer = () => {
  const { values } = useFormikContext();
  const [tree, setTree] = useState(parsedTreeData(values.children));
  useEffect(() => {
    setTree(parsedTreeData(values.children));
  }, [values]);

  const getIcon = (item, onExpand, onCollapse) => {
    if (item.data.itemType === CHILDREN_TYPES.folder) {
      return item.isExpanded ? (
        <ChevronDownIcon
          mr="8px"
          _hover={{ cursor: 'pointer' }}
          onClick={() => onCollapse(item.id)}
        />
      ) : (
        <ChevronRightIcon
          mr="8px"
          _hover={{ cursor: 'pointer' }}
          onClick={() => onExpand(item.id)}
        />
      );
    }
    return <Icon as={BiQuestionMark} w="16px" mr="8px" />;
  };

  const renderItem = ({ item, onExpand, onCollapse, provided, snapshot }) => {
    return (
      <Flex
        align="center"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {getIcon(item, onExpand, onCollapse)}
        <Text>{item.data.title ? item.data.title : 'No title'}</Text>
      </Flex>
    );
  };

  const onExpand = (itemId) => {
    setTree((current) => mutateTree(current, itemId, { isExpanded: true }));
  };

  const onCollapse = (itemId) => {
    setTree((current) => mutateTree(current, itemId, { isExpanded: false }));
  };

  const onDragEnd = (source, destination) => {
    if (!destination) {
      return;
    }

    const newTree = moveItemOnTree(tree, source, destination);
    setTree(newTree);
  };

  return (
    <>
      <Text fontSize="14px" color="gray.600" mb="16px">
        Explorer
      </Text>
      <Text fontWeight="bold" mb="8px">
        {values.title.toUpperCase()}
      </Text>
      <Tree
        tree={tree}
        renderItem={renderItem}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        isDragEnabled
      />
    </>
  );
};

export default SurveyExplorer;
