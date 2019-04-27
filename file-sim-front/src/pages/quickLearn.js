import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Card, Button, Row, Col, Form, Input, InputNumber, Upload } from 'td-ui';
import { Link, withRouter } from 'react-router-dom';
import '../styles/controllers.css';

@inject('globalStore')
class QuickLearn extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.globalStore.getCurrLocation();
    }
    render(){
        return <div>
            <header>快速上手</header>
            <p>
                目前工具只有一个文本查重的功能，所以使用起来非常简单，只要按照表单要求的内容和格式填写即可。
                在此，您需要了解的是表单要填写的具体内容要求。
            </p>
            <p>
                主题名称：主题名称即为您要比对的文件的统一名称，例如：实验文档一，hash算法的实现。且每一个文
                件必须要有一个唯一的id值，例如：1150307010X-实验文档一。
                因此，主题名称最后应该是这样：‘id+实验文档一’，最终结果中将会以这种格式展示。
            </p>
            <p>
                文件个数：文件个数即为您所要比对的文件个数，不得小于两个。
            </p>
            <p>
                文件上传：上传您打包好的所有要比对的文档，支持格式：zip，rar，gzip。
            </p>
            <p>
                确认提交后，工具将在一定时间内算出每份文档互相之间的相似度，在计算出结果后，您能通过页面直观的看到，
                各文档之间的相似度关系。除此之外，您还可以下载相似度结果。
            </p>
        </div>;
    }
}
export default withRouter(QuickLearn);