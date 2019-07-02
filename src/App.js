import React from 'react';
import { Layout, Card } from 'antd';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ActivityNew from './components/activity/activityNew'
import AdsNew from './components/ads/adsNew'
import ShareNew from './components/share/shareNew'
import VideoNew from './components/video/videoNew'
import TemplateNew from './components/template/templateNew'
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
                <Route path="/ads/new" component={AdsNew} />
                <Route path="/share/new" component={ShareNew} />
                <Route path="/video/new" component={VideoNew} />
                <Route path="/template/new" component={TemplateNew} />
              </Switch>
            </Card>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
