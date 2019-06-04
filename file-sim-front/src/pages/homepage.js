import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Card, Button, Row, Col } from 'td-ui';
import { Link, withRouter } from 'react-router-dom';
import '../styles/controllers.css';

@inject('globalStore')
class Homepage extends Component {
    componentWillMount(){
        this.props.globalStore.getCurrLocation();
    }
    render(){
        return <div>
            <div className={'jumbotron'}>
                <h1>欢迎使用文档查重工具!</h1>
                <p style={{width: 400}}>
                    在此，您可以查询并计算出存疑的文档之间的相似度，您可以根据结果来判断是否为问题文档。
                    此工具简单易用好上手，仅需几分钟即可得到您想要的结果。
                </p>
                <p>
                    <Button type="primary"><Link to='/tooluse'>开始使用</Link></Button>
                </p>
            </div>
            <div>
                <Row justify="space-around" type="flex">
                    <Col span={6}>
                        <Card hoverable title={'快速上手'} extra={<div><Link to='/quicklearn'>了解更多</Link></div>}>
                            <div>教您如何在5分钟内学会简单的使用此工具。</div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable title={'更新日志'} extra={<div><Link to='/updatelog'>了解更多</Link></div>}>
                            最近一次更新: {Date()}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card hoverable title={'工具详情'} extra={<div><Link to='/tooldetail'>了解更多</Link></div>}>
                            向您介绍此工具涉及到的技术及原理，让您深入了解并掌握此工具的使用方法。
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    }
}
export default Homepage;
