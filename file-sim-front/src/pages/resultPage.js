import React, {Component} from 'react';
import {inject} from 'utils/mobx-react';
import {Table, Row, Button, Tabs} from 'td-ui';
import {Link, withRouter} from 'react-router-dom';
import {toJS} from 'mobx';
import '../styles/controllers.css';

@inject('toolUseStore')
class ResultPage extends Component {
    constructor(props) {
        super(props)
    }

    // componentWillMount(){
    //     const {toolUseStore} = this.props;
    //     if(localStorage.getItem('vsm')){
    //         toolUseStore.columnList = localStorage.getItem('vsm')[0];
    //         toolUseStore.dataSource = localStorage.getItem('vsm')[1];
    //     }
    // }

    render() {
        const {toolUseStore} = this.props;
        return (<div>
            <Row style={{margin: '0 0 5% 0'}}>
                <header style={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '2%'}}>查重结果
                    <span style={{float: 'right'}}>
                    <Button type="primary">下载结果</Button>
                </span>


                </header>


                <Tabs>
                    <Tabs.TabPane tab="VSM结果" key="vsm">
                        <Table rowKey="key" columns={toJS(toolUseStore.columnList)}
                               dataSource={toJS(toolUseStore.vsmSource)}
                               scroll={{x: toolUseStore.flexScroll}}
                               bordered={true}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="LSI结果" key="lsi">
                        <Table rowKey="key" columns={toJS(toolUseStore.columnList)}
                               dataSource={toJS(toolUseStore.lsiSource)}
                               scroll={{x: toolUseStore.flexScroll}}
                               bordered={true}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="LDA结果" key="lda">
                        <Table rowKey="key" columns={toJS(toolUseStore.columnList)}
                               dataSource={toJS(toolUseStore.ldaSource)}
                               scroll={{x: toolUseStore.flexScroll}}
                               bordered={true}/>
                    </Tabs.TabPane>
                </Tabs>


            </Row>
            <Row style={{margin: '0 0 5% 0'}}>
                <header style={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '2%'}}>结果分析</header>

                <p>结果分析 </p>
            </Row>
        </div>)
    }
}

export default withRouter(ResultPage);