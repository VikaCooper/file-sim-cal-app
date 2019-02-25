import React from 'react';
import { Input, Row, Col, Select } from 'td-ui';

const InputGroup = Input.Group;
const Option = Select.Option;

/**
 * 自定义组件有两个输入框，其值分别为fieldA、fieldB
 * 第二个输入框带有下拉框，其值为optionB
 * fieldA、fieldB、optionB将整体作为1个value与表单双向绑定
 *
 */
export default class CustomFormComponent extends React.Component {
  constructor(props) {
    super(props);
    // 缓存组件内部状态值
    this.state = this.props.value || {};
  }

  componentWillReceiveProps(nextProps) {
    // 表单值更新时，会通过value传递到组件内部，此时更新组件内部状态值
    // 与onChange方法配合，即可达到双向绑定的效果
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(Object.assign({ // 值不存在则置空
        fieldA: '',
        fieldB: '',
        optionB: undefined
      }, value));
    }
  }

  handleInputChange = field => e => {
    const value = e.target.value;
    if (!('value' in this.props)) {
      this.setState({ [field]: value });
    }
    this.triggerChange({ [field]: value });
  };

  handleSelectChange = field => value => {
    if (!('value' in this.props)) {
      this.setState({ [field]: value });
    }
    this.triggerChange({ [field]: value });
  };

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    // onChange用于双向绑定，讲组件内部的值更新到表单中
    if (onChange) {
      // 合并变化的与未变化的值，将fieldA、fieldB、optionB作为整体更新到表单中
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { fieldA, fieldB, optionB } = this.state;
    return (
      <Row gutter={10}>
        <Col span={8}><Input placeholder="Field A" value={fieldA} onChange={this.handleInputChange('fieldA')}/></Col>
        <Col span={8}>
          <InputGroup>
            <Select
              style={{ width: 240 }}
              value={optionB}
              onChange={this.handleSelectChange('optionB')}
              placeholder="Select placeholder"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="zhengfengyao">Zhengfeng Yao</Option>
            </Select>
            <Input placeholder="Field B" value={fieldB} onChange={this.handleInputChange('fieldB')}/>
          </InputGroup>
        </Col>
      </Row>
    );
  }
}
