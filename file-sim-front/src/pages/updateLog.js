import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { Timeline } from 'td-ui';
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
            <Timeline>
                <Timeline.Item>
                    Compelete
                </Timeline.Item>
                <Timeline.Item>
                    2019-3-27 更新
                </Timeline.Item>
                <Timeline.Item>
                    2019-2-25 更新
                </Timeline.Item>
                <Timeline.Item>
                    2018-12-01 创建项目
                </Timeline.Item>
            </Timeline>
        </div>
    }
}
export default withRouter(UpdateLog)