import React from 'react';
import { Layout, Card } from 'antd';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ActivityNew from './components/activity/activityNew'
import ActivityManager from './components/activity/activityManager'
import DomainManager from './components/domain/domainManager'
import ShareNew from './components/share/shareNew'
import VideoNew from './components/video/videoNew'
import TemplateNew from './components/template/templateNew'
import TemplateManager from './components/template/templateManager'
import PopularManager from './components/popular/popularManager'
import './App.css';
import Menu from './menu';

const { Sider, Content } = Layout


function App() {
  return (
    <Router>
      <Layout>
        <Sider style={{ minHeight: '900px'}}>
          <Menu />
        </Sider>
        <Layout>
          <Content>
            <Card style={{ minHeight: '900px'}}>
              <Switch>
                <Route path="/activity/new" component={ActivityNew} />
                <Route path="/activity/manager" component={ActivityManager} />
                <Route path="/domain/manager" component={DomainManager} />
                <Route path="/share/new" component={ShareNew} />
                <Route path="/video/new" component={VideoNew} />
                <Route path="/template/new" component={TemplateNew} />
                <Route path="/template/manager" component={TemplateManager} />
                <Route path="/popular/manager" component={PopularManager} />
              </Switch>
            </Card>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
