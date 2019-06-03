import React, {Component} from 'react';
import {inject} from 'utils/mobx-react';
import {DatePicker, Input, Row, Col, Table, Button} from 'td-ui';
import {Link, withRouter} from 'react-router-dom';
import '../styles/controllers.css';
import {toJS} from 'mobx';

@inject('historySearchStore')
class HistorySearch extends Component {
    constructor(props) {
        super(props)
    }

    column = [
        {
            title: '序号',
            key: 'num',
            dataIndex: 'num',
        },
        {
            title: '用户名称',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: '查询时间',
            key: 'calTime',
            dataIndex: 'calTime'
        },
        {
            title: '查重结果',
            key: 'simResult',
            dataIndex: 'simResult',
            render: (text, record)=>{
                return <a onClick={()=>{
                    console.log(record);
                    localStorage.setItem(record.recordId, record.result);
                    window.location.href='#/resultPage?recordId='+record.recordId;
                }
                }>
                    查看结果
                </a>
            }
        }
    ];

    render() {
        const { historySearchStore } = this.props;

        return (
            <div>
                <header style={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '2%'}}>历史查询</header>

                <Row style={{margin: '2% 0'}}>
                    <Col span="10">
                        <label>日期选择:</label>
                        <DatePicker.RangePicker format="YYYY/MM/DD"
                            onChange={(dates, dateStrings) => {
                                historySearchStore.dateString = dateStrings;
                            }}
                        />
                    </Col>
                    <Col span="2">
                        <Button type="primary"
                        onClick={()=>{
                            historySearchStore.getHistoryRecord(toJS(
                                historySearchStore.dateString
                            ));
                        }}
                        >搜索</Button>
                    </Col>
                </Row>
                <header style={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '2%'}}>查询结果</header>

                <Row>
                    <Table rowKey="num" columns={this.column}
                           dataSource = {toJS(historySearchStore.dataSource)}
                           bordered={true}/>
                </Row>
            </div>
        )
    }
}

export default withRouter(HistorySearch)