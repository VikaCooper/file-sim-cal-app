import React, {Component} from 'react';
import {inject} from 'utils/mobx-react';
import {Table, Row, Button} from 'td-ui';
import {Link, withRouter} from 'react-router-dom';
import '../styles/controllers.css';

@inject('toolUseStore')
class ResultPage extends Component {
    constructor(props) {
        super(props)
    }

    column = [
        {
            title: '1130123',
            key: '1130123',
            dataIndex: '1130123'
        },
        {
            title: '11301232',
            key: '11301232',
            dataIndex: '11301232'
        },
        {
            title: '11301233',
            key: '11301234',
            dataIndex: '11301235'
        },
        {
            title: '11301236',
            key: '11301236',
            dataIndex: '11301236'
        },
        {
            title: '113012362',
            key: '113012362',
            dataIndex: '113012362'
        }
    ];

    render() {
        return (<div>
            <Row style={{margin: '0 0 5% 0'}}>
                <header style={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '2%'}}>查重结果
                 <span style={{float: 'right'}}>
                    <Button type="primary">下载结果</Button>
                </span>


                </header>



                <Table rowKey="num" columns={this.column} bordered={true}/>
            </Row>
            <Row style={{margin: '0 0 5% 0'}}>
                <header style={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '2%'}}>结果分析</header>

                <p>结果分析 </p>
            </Row>
        </div>)
    }
}

export default withRouter(ResultPage);