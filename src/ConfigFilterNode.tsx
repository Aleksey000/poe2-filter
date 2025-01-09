import {ConfigFilterNodeType} from "./ConfigFilterNodeType.tsx";
import {FilterBlock} from "./FilterBlock.tsx";

export class ConfigFilterNode {
    type: ConfigFilterNodeType = ConfigFilterNodeType.FILTER_BLOCK;
    name: string = "";
    filterBlock?: FilterBlock;
    children?: Array<ConfigFilterNode>;
}