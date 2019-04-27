import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Card, Button, Row, Col, Form, Input, InputNumber, Upload } from 'td-ui';
import { Link, withRouter } from 'react-router-dom';
import '../styles/controllers.css';

@inject('globalStore')
class UpdateLog extends Component {
    constructor(props){
        super(props);
    } 
    componentWillMount(){
        this.props.globalStore.getCurrLocation();
    }
    render(){
        return <div>
            hello
        </div>
    }
}
export default withRouter(UpdateLog)