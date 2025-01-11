import React, { useState } from "react";
import { Tree, TreeDataNode, Modal, Input } from "antd";
import {
  FileOutlined,
  FolderOutlined,
  FileAddOutlined,
  FolderAddOutlined,
  MinusCircleOutlined,
  DownOutlined
} from "@ant-design/icons";
import { ConfigFilterNode } from "../ConfigFilterNode.tsx";
import { ConfigFilterNodeType } from "../ConfigFilterNodeType.tsx";

interface ConfigFilterTreeProps {
  treeData: ConfigFilterNode[];
  onAdd?: (parentKey: string, folderName: string, type: ConfigFilterNodeType) => void | undefined;
  onDeleteItem?: (parentKey: string, itemName: string) => void | undefined; 
}

export function toAntTree(
  data: ConfigFilterNode[],
  onAddFolder: (parentKey: string, folderName: string) => void,
  showAddModal: (parentKey: string, type: ConfigFilterNodeType) => void
): TreeDataNode[] {
  if (!data) {
    return [];
  }

  return data.map((value) => {
    const { children } = value;
    const isFolder = value.type === ConfigFilterNodeType.FOLDER;

    const treeDataNode: TreeDataNode = {
      key: value.name,
      title: (
        <>
          {value.name}
          {isFolder ? (
            <>
              <FolderAddOutlined
                onClick={() => {
                    showAddModal(value.name, ConfigFilterNodeType.FOLDER);
                }}
              />
              <FileAddOutlined 
                onClick={() => {
                    showAddModal(value.name, ConfigFilterNodeType.FILTER_BLOCK);
                }} />
            </>
          ) : null}
          <MinusCircleOutlined
            style={{ color: "red" }}
            onClick={() => console.log("Click: Delete")}
          />
        </>
      ),
      icon: isFolder ? <FolderOutlined /> : <FileOutlined />,
      children: children ? toAntTree(children, onAddFolder, showAddModal) : [],
    };

    return treeDataNode;
  });
}

const ConfigFilterTree = ({ treeData, onAdd }: ConfigFilterTreeProps) => {
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ folderName, setFolderName ] = useState('');
    const [ parentKey, setParentKey ] = useState<string | null>(null);
    const [ typeAdd, setTypeAdd ] = useState<ConfigFilterNodeType>(ConfigFilterNodeType.FILTER_BLOCK);
  
    const showAddModal = (parentKey: string, type: ConfigFilterNodeType) => {
        setParentKey(parentKey);
        setIsModalVisible(true);
        setTypeAdd(type);
    };
  
    const handleModalOk = () => {
        if (folderName && parentKey) {
            onAdd(parentKey, folderName, typeAdd);
        }
        setIsModalVisible(false); // Закрываем модальное окно
        setFolderName(''); // Сбрасываем имя папки
    };
  
    const handleModalCancel = () => {
        setIsModalVisible(false);
        setFolderName(''); // Сбрасываем имя папки
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value);
    };
  
    const treeDataNodes = toAntTree(treeData, onAdd, showAddModal); // Передаем функцию для показа модалки
  
    return (
      <div>
        <Tree
            showLine
            showIcon
            defaultExpandAll
            switcherIcon={<DownOutlined />}
            // defaultExpandedKeys={['0-0-0', '0-0-1']}
            // defaultSelectedKeys={['0-0-0', '0-0-1']}
            // defaultCheckedKeys={['0-0-0', '0-0-1']}
            // onSelect={onSelect}
            treeData={treeDataNodes}
        />
        <Modal
            title="Добавить"
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
        >
            <Input
                placeholder="Введите название"
                value={folderName}
                onChange={handleInputChange}
            />
        </Modal>
      </div>
    );
};

export default ConfigFilterTree;
