import React, {Fragment} from 'react';
import { TreeSelect } from 'antd';
import style from './style.less'

const treeData = [
    {
      title: "一分公司",
      title1: "一分公司",
      value: "0-0",
      key: "0-0",
      children: [
        {
          title: "运营三所",
          title1: "一分公司-运营3所",
          value: "0-0-1",
          key: "0-0-1",
          children: [
            {
              title: "一班",
              title1: "一分公司-运营3所一班",
              value: "0-0-2",
              key: "0-0-2"
            }
          ]
        },

      ]
    },
  ];

  const valueMap = {};
  function loops(list, parent) {
    return (list || []).map(({ children, value }) => {
      const node = (valueMap[value] = {
        parent,
        value
      });
      node.children = loops(children, node);
      return node;
    });
  }
  
  loops(treeData);
  

export class AddressBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
            showTitle: "title"
        }
    }

    onChange = value => {
        // console.log("Change", getPath(value));
        this.setState({ value });
      };
    
      onSelect = value => {
        // console.log("Select:", getPath(value));
        this.setState({ showTitle: "title1" });
      };
    
    render() {


        return (
            <div className={style.treeSelectBox}>
            <TreeSelect
            style={{ width: 250 }}
            value={this.state.value}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={treeData}
            treeNodeLabelProp={this.state.showTitle}
            placeholder="请输入地址"
            treeDefaultExpandAll
            onChange={this.onChange}
            onSelect={this.onSelect}
            className="treeSelectFix"
          />
        </div>
        )
    }
}
