import React, {Component} from 'react';
import {inject} from 'utils/mobx-react';
import {Form, Input, Icon, Button} from 'td-ui';
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
        return (
            <div>
                <div className={'box'}>
                    <Form layout={'vertical'} className={'form-ctr'}>
                        <FormItem label={'用户名'}>
                            <FormControl name={'username'}>
                                <Input prefix={<Icon type='foreach'/>}/>
                            </FormControl>
                        </FormItem>

                        <FormItem label={'密码'}>
                            <FormControl name={'password'}>
                                <Input prefix={<Icon type='login'/>} type='password'/>
                            </FormControl>
                        </FormItem>

                        <FormItem label={null}>
                            <Button type='primary' onClick={() => {
                                this.props.form.validateFields(
                                    ['username', 'password'], (errors, values) => {
                                        if (!errors) {
                                            console.log(values);
                                            globalStore.logIn(values);
                                        }
                                    }
                                );


                            }}>登录</Button>
                            <a style={{marginLeft: 63}}>忘记密码？</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(Loggin);