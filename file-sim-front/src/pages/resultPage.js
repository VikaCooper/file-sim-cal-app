import React, {Component} from 'react';
import {inject} from 'utils/mobx-react';
import {Table, Row, Button, Tabs, Tooltip, Icon, Dialog} from 'td-ui';
import {Link, withRouter} from 'react-router-dom';
import {toJS} from 'mobx';
import '../styles/controllers.css';


const columns = [{
                key: 'num',
                dataIndex: 'num',
                title: '序号'
            }, {
                key: 'docId',
                dataIndex: 'docId',
                title: '文档Id'
            }, {
                key: 'simResult',
                dataIndex: 'simResult',
                title: '相似度',
            }];
@inject('toolUseStore')
class ResultPage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {toolUseStore} = this.props;
        const recordId = window.location.hash.split('?')[1];
        if (recordId) {
            toolUseStore.getRecordById(recordId.split('=')[1]).then(
                (success) => {
                    toolUseStore.showHistoryResult(
                        toolUseStore.singleResult
                    );
                }
            );
        }
        else if (localStorage.getItem('recordId') && toolUseStore.fileType === 'pack') {
            toolUseStore.getRecordById(localStorage.getItem('recordId')).then(
                (success) => {
                    toolUseStore.showHistoryResult(
                        toolUseStore.singleResult
                    );
                }
            );
        }
    }

    render() {
        const {toolUseStore} = this.props;
        const tooltip_content = <ul style={{listStyleType: 'none'}}>
            <li><span style={{color: 'red'}}>红色：有抄袭嫌疑</span></li>
            <li><span style={{color: 'orange'}}>橙色：为无用值</span></li>
            <li><span style={{color: 'green'}}>绿色：无抄袭嫌疑</span></li>

        </ul>;
        return (<div>
            <Row style={{margin: '0 0 5% 0'}}>
                <header style={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '2%'}}>查重结果
                    <span style={{float: 'right'}}>
                    <Button type="primary"
                            onClick={
                                () => {

                                    toolUseStore.createResultExcel().then(
                                        (success) => {

                                            if (toolUseStore.isCreated) {
                                                Dialog.confirm(
                                                    {
                                                        title: '保存文件',
                                                        content: '结果文件生成成功，是否保存到本地？',
                                                        onOk: () => {
                                                            toolUseStore.getResultExcel();
                                                        },
                                                        maskClosable: true
                                                    }
                                                );
                                            }


                                        }
                                    );

                                }
                            }


                    >下载结果</Button>
                </span>


                </header>


                <Tabs>


                    <Tabs.TabPane tab="VSM结果" key="vsm">
                        <Table
                            loading={toolUseStore.loading}
                            rowKey={record => record.key}
                            columns={
                                toolUseStore.fileType ==='doc'?
                                    columns:
                                toJS(toolUseStore.columnList)
                            }
                             dataSource={
                                 toolUseStore.fileType ==='doc'?
                                    toJS(toolUseStore.docSource)
                                     :
                                 toJS(toolUseStore.vsmSource)
                             }
                            scroll={{x: toolUseStore.flexScroll}}
                            bordered={true}/>
                    </Tabs.TabPane>

                    {toolUseStore.fileType === 'doc' ?
                        null :
                        <Tabs.TabPane tab="LSI结果" key="lsi">
                            <Table
                                loading={toolUseStore.loading}
                                rowKey={(record) => {
                                    return record.key;
                                }} columns={toJS(toolUseStore.columnList)}
                                dataSource={toJS(toolUseStore.lsiSource)}
                                scroll={{x: toolUseStore.flexScroll}}
                                bordered={true}/>
                        </Tabs.TabPane>
                    }
                    {toolUseStore.fileType === 'doc' ?
                        null :
                        <Tabs.TabPane tab="LDA结果" key="lda">
                            <Table
                                loading={toolUseStore.loading}
                                rowKey={(record) => {
                                    return record.key;
                                }} columns={toJS(toolUseStore.columnList)}
                                dataSource={toJS(toolUseStore.ldaSource)}
                                scroll={{x: toolUseStore.flexScroll}}
                                bordered={true}/>
                        </Tabs.TabPane>
                    }


                </Tabs>


            </Row>
            {
                toolUseStore.fileType === 'pack' &&
                <Row style={{margin: '0 0 5% 0'}}>
                    <header style={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '2%'}}>结果分析
                        <Tooltip
                            content={tooltip_content}
                        ><Icon type="question-circle-o" style={{fontSize: 16}}/></Tooltip>

                    </header>

                    <Table
                        loading={toolUseStore.loading}
                        rowKey={(record) => {
                            return record.key;
                        }} columns={toJS(toolUseStore.columnList)}
                        dataSource={toJS(toolUseStore.resultSource)}
                        scroll={{x: toolUseStore.flexScroll}}
                        bordered={true}/>
                </Row>
            }


        </div>)
    }
}

export default withRouter(ResultPage);