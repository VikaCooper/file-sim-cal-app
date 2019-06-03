import React, {Component} from 'react';
import {inject} from 'utils/mobx-react';
import {Form, Input, Icon, Button, Tabs, Select} from 'td-ui';
import {Link, withRouter} from 'react-router-dom';
import '../styles/loggin.css';

const FormItem = Form.Item;
const FormControl = Form.Control;

@Form.create()
@inject('globalStore')
class Loggin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {globalStore} = this.props;
        const {getFieldDecorator} = this.props.form;
        getFieldDecorator('username');
        getFieldDecorator('password');
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '50px 0 0 0'
            }}>

                <Tabs className={'box'} defaultActiveKey="login" type="card">
                    <Tabs.TabPane tab="登录" key="login">
                        <Form layout={'vertical'} className={'form-ctr'}>
                            <FormItem label='用户名' required
                                      help='用户名必须为数字或者字母，且长度在5～10之间'
                            >
                                <FormControl name={'username'}
                                             rules={[{required: true, message: '请输入用户名！'}
                                                 , {min: 5, message: '用户名长度在5～10之间！'}
                                                 , {max: 10, message: '用户名长度在5～10之间！'}
                                                 , {whitespage: true, message: '不能包含空格！'}
                                                 , {pattern: /[0-9a-zA-Z]*/, message: '用户名必须为字母或者数字！'}
                                             ]}
                                >
                                    <Input prefix={<Icon type='foreach'/>} placeholder="请输入用户名"/>
                                </FormControl>
                            </FormItem>

                            <FormItem label={'密码'} required
                                      help={'密码长度必须在6～16之间'}
                            >
                                <FormControl name={'password'}
                                             rules={[{required: true, message: '请输入密码！'}
                                                 , {min: 6, message: '密码长度在6～16之间！'}
                                                 , {max: 16, message: '密码长度在6～16之间！'}
                                                 , {whitespage: true, message: '不能包含空格！'}
                                                 , {pattern: /[0-9a-zA-Z]*/, message: '密码必须为字母或者数字！'}
                                             ]}
                                >
                                    <Input prefix={<Icon type='login'/>} type='password'/>
                                </FormControl>
                            </FormItem>
                            <FormItem label={'用户类型'} required
                            >
                                <FormControl name={'usertype'}
                                >
                                    <Select placeholder = '请选择身份类型' style = {{width: 100}}>
                                        <Select.Option value = 's'>学生</Select.Option>
                                        <Select.Option value = 't'>教师</Select.Option>
                                    </Select>
                                </FormControl>
                            </FormItem>

                            <FormItem label={null}>
                                <Button type='primary'
                                        loading = {globalStore.loading}
                                        onClick={() => {
                                    this.props.form.validateFields(
                                        ['username', 'password','usertype'], (errors, values) => {
                                            if (!errors) {
                                                globalStore.logIn(values);
                                            }
                                        }
                                    );


                                }}>登录</Button>
                                <a style={{marginLeft: 63}}>忘记密码？</a>
                            </FormItem>
                        </Form>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="注册" key="create">
                        <Form layout={'vertical'} className={'form-ctr'}>
                            <FormItem label='用户名' required
                                      help='用户名必须为数字或者字母，且长度在5～10之间'
                            >
                                <FormControl name={'username'}
                                             rules={[{required: true, message: '请输入用户名！'}
                                                 , {min: 5, message: '用户名长度在5～10之间！'}
                                                 , {max: 10, message: '用户名长度在5～10之间！'}
                                                 , {whitespage: true, message: '不能包含空格！'}
                                                 , {pattern: /[0-9a-zA-Z]*/, message: '用户名必须为字母或者数字！'}
                                             ]}
                                >
                                    <Input prefix={<Icon type='foreach'/>} placeholder="请输入用户名"/>
                                </FormControl>
                            </FormItem>

                            <FormItem label={'密码'} required
                                      help={'密码长度必须在6～16之间'}
                            >
                                <FormControl name={'password'}
                                             rules={[{required: true, message: '请输入密码！'}
                                                 , {min: 6, message: '密码长度在6～16之间！'}
                                                 , {max: 16, message: '密码长度在6～16之间！'}
                                                 , {whitespage: true, message: '不能包含空格！'}
                                                 , {pattern: /[0-9a-zA-Z]*/, message: '密码必须为字母或者数字！'}
                                             ]}
                                >
                                    <Input prefix={<Icon type='login'/>} type='password'/>
                                </FormControl>
                            </FormItem>
                            <FormItem label={'用户类型'} required
                            >
                                <FormControl name={'usertype'}
                                >
                                    <Select placeholder = '请选择身份类型' style = {{width: 100}}>
                                        <Select.Option value = 's'>学生</Select.Option>
                                        <Select.Option value = 't'>教师</Select.Option>
                                    </Select>
                                </FormControl>
                            </FormItem>

                            <FormItem label={null}>
                                <Button onClick={() => {
                                    this.props.form.validateFields(
                                        ['username', 'password', 'usertype'], (errors, values) => {
                                            if (!errors) {
                                                globalStore.createAccount(values);
                                            }
                                        }
                                    );
                                }}>注册</Button>
                            </FormItem>
                        </Form>
                    </Tabs.TabPane>

                </Tabs>


            </div>
        )
    }
}

export default withRouter(Loggin);