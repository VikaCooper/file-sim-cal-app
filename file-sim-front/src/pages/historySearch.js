import React, {Component} from 'react';
import {inject} from 'utils/mobx-react';
import {DatePicker, Input, Row, Col, Table, Button} from 'td-ui';
import {Link, withRouter} from 'react-router-dom';
import '../styles/controllers.css';


class HistorySearch extends Component {
    constructor(props) {
        super(props)
    }
    column = [
        {
            title: '序号',
            key: 'num',
            dataIndex: 'num'
        },
        {
            title: '论文题目',
            key: 'docTitle',
            dataIndex: 'docTitle'
        },
        {
            title: '查询时间',
            key: 'calTime',
            dataIndex: 'calTime'
        },
        {
            title: '查重结果',
            key: 'simResult',
            dataIndex: 'simResult'
        }
    ];
    render() {
        return (
            <div>
                <header style={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '2%'}}>历史查询</header>

                <Row style={{margin: '2% 0'}}>
                    <Col span="10">
                        <label>日期选择:</label>
                        <DatePicker.RangePicker/>
                    </Col>
                    <Col span="12">
                        <label>论文名称:</label>
                        <Input style={{width: 300}}/>
                    </Col>
                    <Col span="2" pull="4">
                        <Button type="primary">搜索</Button>
                    </Col>
                </Row>
               <header style={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '2%'}}>查询结果</header>

                <Row>
                    <Table rowKey="num" columns={this.column} bordered={true}/>
                </Row>
            </div>
        )
    }
}

export default withRouter(HistorySearch)