import React, { useState } from 'react';
import {Layout, theme, Splitter, Tree, Switch, Form, Checkbox, Input, Select, ColorPicker, Collapse} from 'antd';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SyntaxHighlighter from 'react-syntax-highlighter';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { DownOutlined, FolderOutlined, FileOutlined } from '@ant-design/icons';

import type { TreeDataNode, TreeProps, CollapseProps  } from 'antd';

import filterText from '../other/filter2.yaml?raw';
import filterTreeJson from '../other/filter-tree.json?raw';
import ConfigFilterTree from "./tree/ConfigFilterTree.tsx";
import {ConfigFilterNode} from "./ConfigFilterNode.tsx";
import { ConfigFilterNodeType } from './ConfigFilterNodeType.tsx';

const  {Content, Footer, Header} = Layout;

const treeData: TreeDataNode[] = [
    {
        title: 'tags',
        key: 'tags',
        icon: <FolderOutlined />,
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                icon: <FolderOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        disableCheckbox: true,
                        icon: <FileOutlined />
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                        icon: <FileOutlined />
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                icon: <FileOutlined />,
                children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
            },
        ],
    },
    {
        title: 'Filter blocks',
        key: 'filter-blocks',
        icon: <FolderOutlined />,
    }
];



function App2() {

    const [treeData, setTreeData] = useState(
        JSON.parse(filterTreeJson).filterBlocks.map((item) => Object.assign(new ConfigFilterNode(), item))
    );

    const { token: {colorPrimary} } = theme.useToken();

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };

    const updateTreeData = (
        treeData: ConfigFilterNode[], 
        parentKey: string, 
        newNode: ConfigFilterNode
    ): ConfigFilterNode[] => {
        return treeData.map((node) => {
            if (node.name === parentKey) {
                node.children = [ ...(node.children || []), newNode ];
            } else if (node.children) {
                node.children = updateTreeData(node.children, parentKey, newNode);
            }
            return node;
        });
    };

    const handleAdd = (parentKey: string, name: string, type: ConfigFilterNodeType) => {
        const newNode: ConfigFilterNode = {
            name,
            type, // Это тип новой папки
            children: []// Папка не содержит дочерних элементов по умолчанию
        };
        const updatedTreeData = updateTreeData(treeData, parentKey, newNode);
        
        setTreeData(updatedTreeData);
    };

    return (
        <Layout className="Container">
            <Header>
                <div style={{color: colorPrimary}}>Poe2FilterGen</div>
            </Header>
            <Content style={{minHeight: '70vh'}}>
                <Splitter>
                    <Splitter.Panel>
                        <Collapse items={
                            [
                                {
                                    key: '1',
                                    label: 'Sounds',
                                    children: '',
                                },
                                {
                                    key: '2',
                                    label: 'Global filter blocks',
                                    children: <ConfigFilterTree
                                        treeData={ treeData }
                                        onAdd={ handleAdd }
                                    />,
                                },
                                // {
                                //     key: '3',
                                //     label: 'Config filter',
                                //     children: <Tree
                                //         showLine
                                //         showIcon
                                //         defaultExpandAll
                                //         switcherIcon={<DownOutlined />}
                                //         // defaultExpandedKeys={['0-0-0', '0-0-1']}
                                //         // defaultSelectedKeys={['0-0-0', '0-0-1']}
                                //         // defaultCheckedKeys={['0-0-0', '0-0-1']}
                                //         onSelect={onSelect}
                                //         treeData={treeData}
                                //     />,
                                // },
                            ]
                        } defaultActiveKey={['3', '1', '2']}/>
                    </Splitter.Panel>
                    <Splitter.Panel style={{maxHeight: '70vh'}}>
                        {/*<Form*/}
                        {/*    labelCol={{ span: 6 }}*/}
                        {/*    wrapperCol={{ span: 12 }}*/}
                        {/*    layout="horizontal"*/}
                        {/*    style={{ maxWidth: 600 }}*/}
                        {/*>*/}
                        {/*    <Form.Item label="Enable" name="enable" valuePropName="checked">*/}
                        {/*        <Switch defaultValue={true}/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Show" name="show" valuePropName="checked">*/}
                        {/*        <Switch defaultValue={true}/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Class" name="_class">*/}
                        {/*        <Input/>*/}
                        {/*        /!*<Input addonBefore={<Form.Item name="prefix" noStyle>*!/*/}
                        {/*        /!*    <Select style={{ width: 70 }}>*!/*/}
                        {/*        /!*        <Option value="">=</Option>*!/*/}
                        {/*        /!*        <Option value="==">==</Option>*!/*/}
                        {/*        /!*    </Select>*!/*/}
                        {/*        /!*</Form.Item>}/>*!/*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Base type" name="baseType">*/}
                        {/*        <Input/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Rarity" name="rarity">*/}
                        {/*        <Select defaultValue={"Normal"}>*/}
                        {/*            <Option value="Normal">Normal</Option>*/}
                        {/*            <Option value="Magic">Magic</Option>*/}
                        {/*            <Option value="Rare">Rare</Option>*/}
                        {/*            <Option value="Uniq">Uniq</Option>*/}
                        {/*        </Select>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Area level" name="areaLevel">*/}
                        {/*        <Input/>*/}
                        {/*        <Input/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Stack size" name="stackSize">*/}
                        {/*        <Input/>*/}
                        {/*        <Input/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Item level" name="itemLevel">*/}
                        {/*        <Input/>*/}
                        {/*        <Input/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Sockets" name="sockets">*/}
                        {/*        <Input/>*/}
                        {/*        <Input/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Quality" name="quality">*/}
                        {/*        <Input/>*/}
                        {/*        <Input/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="WaystoneTier" name="waystoneTier">*/}
                        {/*        <Input/>*/}
                        {/*        <Input/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="FontSize" name="fontSize">*/}
                        {/*        <Input/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="FontSize" name="textColor">*/}
                        {/*        <ColorPicker defaultValue="#1677ff" defaultFormat="rgb" disabledFormat showText  />*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Text color" name="textColor">*/}
                        {/*        <ColorPicker defaultValue="#1677ff" defaultFormat="rgb" disabledFormat showText  />*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Border color" name="borderColor">*/}
                        {/*        <ColorPicker defaultValue="#1677ff" defaultFormat="rgb" disabledFormat showText  />*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Background color" name="backgroundColor">*/}
                        {/*        <ColorPicker defaultValue="#1677ff" defaultFormat="rgb" disabledFormat showText  />*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Sound" name="playAlertSound">*/}
                        {/*        <Select defaultValue={"Normal"}>*/}
                        {/*            <Option value="Normal">TODO</Option>*/}
                        {/*            <Option value="Magic">TODO</Option>*/}
                        {/*            <Option value="Rare">TODO</Option>*/}
                        {/*            <Option value="Uniq">TODO</Option>*/}
                        {/*        </Select>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Minimap icon" name="minimapIcon">*/}
                        {/*        <Select defaultValue={"-1"}>*/}
                        {/*            <Option value="-1">Off</Option>*/}
                        {/*            <Option value="0">0</Option>*/}
                        {/*            <Option value="1">1</Option>*/}
                        {/*            <Option value="2">2</Option>*/}
                        {/*        </Select>*/}
                        {/*        <Select defaultValue={"Circle"}>*/}
                        {/*            <Option value="Circle">Circle</Option>*/}
                        {/*            <Option value="Diamond">Diamond</Option>*/}
                        {/*            <Option value="Hexagon">Hexagon</Option>*/}
                        {/*            <Option value="Square">Square</Option>*/}
                        {/*            <Option value="Star">Star</Option>*/}
                        {/*            <Option value="Triangle">Triangle</Option>*/}
                        {/*            <Option value="Cross">Cross</Option>*/}
                        {/*            <Option value="Moon">Moon</Option>*/}
                        {/*            <Option value="Raindrop">Raindrop</Option>*/}
                        {/*            <Option value="Kite">Kite</Option>*/}
                        {/*            <Option value="Pentagon">Pentagon</Option>*/}
                        {/*            <Option value="UpsideDownHouse">UpsideDownHouse</Option>*/}
                        {/*        </Select>*/}
                        {/*        <Select defaultValue={"Red"}>*/}
                        {/*            <Option value="Red">Red</Option>*/}
                        {/*            <Option value="Green">Green</Option>*/}
                        {/*            <Option value="Blue">Blue</Option>*/}
                        {/*            <Option value="Brown">Brown</Option>*/}
                        {/*            <Option value="White">White</Option>*/}
                        {/*            <Option value="Yellow">Yellow</Option>*/}
                        {/*            <Option value="Cyan">Cyan</Option>*/}
                        {/*            <Option value="Grey">Grey</Option>*/}
                        {/*            <Option value="Orange">Orange</Option>*/}
                        {/*            <Option value="Pink">Pink</Option>*/}
                        {/*            <Option value="Purple">Purple</Option>*/}
                        {/*        </Select>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item label="Beam" name="beam">*/}
                        {/*        <Select defaultValue={"Off"}>*/}
                        {/*            <Option value="Off">Off</Option>*/}
                        {/*            <Option value="Red">Red</Option>*/}
                        {/*            <Option value="Green">Green</Option>*/}
                        {/*            <Option value="Blue">Blue</Option>*/}
                        {/*            <Option value="Brown">Brown</Option>*/}
                        {/*            <Option value="White">White</Option>*/}
                        {/*            <Option value="Yellow">Yellow</Option>*/}
                        {/*            <Option value="Cyan">Cyan</Option>*/}
                        {/*            <Option value="Grey">Grey</Option>*/}
                        {/*            <Option value="Orange">Orange</Option>*/}
                        {/*            <Option value="Pink">Pink</Option>*/}
                        {/*            <Option value="Purple">Purple</Option>*/}
                        {/*        </Select>*/}
                        {/*        Temp: <Checkbox/>*/}
                        {/*    </Form.Item>*/}
                        {/*</Form>*/}
                    </Splitter.Panel>
                    <Splitter.Panel style={{maxHeight: '70vh'}}>
                        <SyntaxHighlighter
                            language="plaintext"
                            style={monokaiSublime}
                            showLineNumbers="true"
                        >
                            {filterText}
                        </SyntaxHighlighter>
                    </Splitter.Panel>
                </Splitter>
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    )
}

export default App2