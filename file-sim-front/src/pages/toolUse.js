import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Select, Button, Row, Col, Form, Input, InputNumber, Upload } from 'td-ui';
import { Link, withRouter } from 'react-router-dom';
import '../styles/controllers.css';

const FormItem = Form.Item;
const FormControl = Form.Control;

const selectBefore = (
    <Select defaultValue="student_id" style={{ width: 150 }}>
      <Option value="student_id">student_id</Option>
      <Option value="id_number">id_number</Option>
      <Option value="phone_number">phone_number</Option>
    </Select>
  );

@Form.create()
@inject('globalStore')
class ToolUse extends Component {
    constructor(props){
        super(props);
        this.state={
            fileList: []
        }
    }
    componentWillMount(){
        this.props.globalStore.getCurrLocation();
    }
    
    render(){
        return <div style={{
            margin: '0 10%', textAlign: 'center'
        }}>
            <h2>超杀的文本查重工具</h2>
            <div style={{
                margin: '5% 10% 0% 10%', textAlign: 'left'
            }}>
            <h3>资料填写</h3>
            <Form layout='vertical' >
                <FormItem required hasFeedback label="主题名称">
                    <FormControl rules={[{
                        min: 3,
                        max: 10,
                        message: '长度在3～10之间！'
                    },{
                        whitespace: true,
                        message: '名称中不能含有空格！'
                    },{
                        required: true,
                        message: '主题名称为必填项！'
                    }]} name="theme">
                        <Input addonBefore={selectBefore} placeholder="请输入本类文档的主题，3-10字"/>
                    </FormControl>
                </FormItem>

                <FormItem required hasFeedback label="文件上传">
                    <FormControl 
                    rules={[{
                        required: true,
                        message: '压缩文档未上传！'
                    }]}
                    name="fileUpload">
                        <Upload accept={["zip","rar","gzip"]}
                            note='选择需要上传的压缩包'
                            showType="name"
                            fileList={this.state.fileList}
                            onChange={(file)=>{
                                this.setState({
                                    fileList: file
                                })
                            }}
                            showProgress={true}
                        />
                    </FormControl>
                </FormItem>
            </Form>
            <Row type={'flex'} justify={'center'}>
                <Button type='primary' style={{marginRight: '20px'}} onClick={()=>{
                    this.props.form.validateFields((errors, values)=>{
                        if(!errors)
                            console.log('success');
                    })
                }}>确认提交</Button>
                <Button type='warning' onClick={
                    ()=>{
                        this.props.form.resetFields();
                    }
                }>重置表单</Button>
            </Row>
            </div>
        </div>;
    }
}
export default withRouter(ToolUse);