import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Card, Button, Row, Col, Form, Input, InputNumber, Upload } from 'td-ui';
import { Link, withRouter } from 'react-router-dom';
import '../styles/tooldetail.css';

@inject('globalStore')
class ToolDetail extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.globalStore.getCurrLocation();
    }
    render(){
        return <div>
            <header style={{fontWeight: 'bold', fontSize: '1.3em'}}>项目简介</header>

            <ul className={'learn-info'}>
                <li>
                    本课题旨在设计一个可以提供文本查重功能的工具，能对大量文档进行处理并对比的功能，具体的功能包括以下几点：
                </li>
                <li className={'line-ctr'}>
                    文件上传、文件解包、文件处理，将要对比的文档进行上传之后，进行相关一系列操作；
                </li>
                <li className={'line-ctr'}>
                    多文件相似度计算及对比，处理之后，通过相关算法得出各文档相似度；
                </li>
                <li className={'line-ctr'}>
                    提供下载结果功能，在得到最终结果之后，输出到excel文件中，同时将结果呈现在界面上，通过下载excel文件保存到本地；
                </li>
                <li className={'line-ctr'}>
                    身份区分，对老师和学生提供不同的功能；
                </li>
                <li className={'line-ctr'}>
                    单文件查重，将学生上传的单个文件和数据库中已有的文档进行对比；
                </li>
            </ul>
        </div>;
    }
}
export default withRouter(ToolDetail);