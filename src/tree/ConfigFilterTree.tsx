import {Component} from "react";
import {ConfigFilterNode} from "../ConfigFilterNode.tsx";
import {Tree, TreeDataNode} from 'antd';
import {ConfigFilterNodeType} from "../ConfigFilterNodeType.tsx";
import {DownOutlined, FileOutlined, FolderOutlined, FileAddOutlined, FolderAddOutlined, MinusCircleOutlined} from "@ant-design/icons";


interface ConfigFilterTreeProps {
    treeData: ConfigFilterNode[]
}

function toAntTree(treeData: ConfigFilterNode[]): TreeDataNode[] {
    if (!treeData) {
        return [];
    }
    console.log(treeData)
    return treeData.map(value => {
        const {children: aaa} = value ;
        const isFolder = value.type == ConfigFilterNodeType.FOLDER;
        const treeDataNode: TreeDataNode = {
            key: value.name,
            title: <>
                {value.name}
                { isFolder ? (<>
                    <FolderAddOutlined />
                    <FileAddOutlined />
                </>) : (<></>)}
                <MinusCircleOutlined style={{color: "red"}} />
            </>,
            icon: isFolder ? <FolderOutlined /> : <FileOutlined />,
            children: !aaa ? [] : toAntTree(aaa)
        };

        return treeDataNode;
    })
}

export default class ConfigFilterTree extends Component<ConfigFilterTreeProps> {
    constructor(props: ConfigFilterTreeProps) {
        super(props);
    }
    render() {
        const {
            treeData
        } = this.props || {};

        console.log(treeData);

        const treeData2: TreeDataNode[] = toAntTree(treeData);

        return <Tree
            showLine
            showIcon
            defaultExpandAll
            switcherIcon={<DownOutlined />}
            // defaultExpandedKeys={['0-0-0', '0-0-1']}
            // defaultSelectedKeys={['0-0-0', '0-0-1']}
            // defaultCheckedKeys={['0-0-0', '0-0-1']}
            // onSelect={onSelect}
            treeData={treeData2}
        />
    }

    // private toAntTree(treeData: ConfigFilterNode[]) {
    //     treeData.map(item => {
    //         new TreeDataNode()
    //     })
    //     return [];
    // }
}


