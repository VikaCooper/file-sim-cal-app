import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Table } from 'td-ui';
import { Link, withRouter } from 'react-router-dom';
import '../styles/controllers.css';

@inject('toolUseStore')
class ResultPage extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div>
            <Table/>
        </div>)
    }
}
export default withRouter(ResultPage);