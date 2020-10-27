import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";

import {
  Row,
  Col,
  Button,
  CardHeader,
  Card,
  CardBody,
  Progress,
  TabContent,
  TabPane,
} from "reactstrap";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import {
  AreaChart,
  Area,
  Line,
  ResponsiveContainer,
  Bar,
  BarChart,
  ComposedChart,
  CartesianGrid,
  Tooltip,
  LineChart,
} from "recharts";

import {
  faAngleUp,
  faArrowRight,
  faArrowUp,
  faArrowLeft,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import avatar1 from "../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../assets/utils/images/avatars/2.jpg";
import avatar3 from "../../../assets/utils/images/avatars/3.jpg";
import avatar4 from "../../../assets/utils/images/avatars/4.jpg";

import axios from 'axios';
import _ from 'lodash';

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const data2 = [
  { name: "Page A", uv: 5400, pv: 5240, amt: 1240 },
  { name: "Page B", uv: 7300, pv: 4139, amt: 3221 },
  { name: "Page C", uv: 8200, pv: 7980, amt: 5229 },
  { name: "Page D", uv: 6278, pv: 4390, amt: 3200 },
  { name: "Page E", uv: 3189, pv: 7480, amt: 6218 },
  { name: "Page D", uv: 9478, pv: 6790, amt: 2200 },
  { name: "Page E", uv: 1289, pv: 1980, amt: 7218 },
  { name: "Page F", uv: 3139, pv: 2380, amt: 5150 },
  { name: "Page G", uv: 5349, pv: 3430, amt: 3210 },
];

const api = axios.create({
  baseURL: `https://iot4cast.000webhostapp.com/api/weather/read_all.php`
})

export default class AnalyticsDashboard1 extends Component {
  constructor() {
    super();

    this.state = {
      dropdownOpen: false,
      activeTab1: "11",
      weather : [],
      last_record : [],
      before_last_record : [],
    };
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({
        activeTab1: tab,
      });
    }
  }

  intervalID;

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component. Notice we are calling
      'clearTimeout()` here rather than `clearInterval()` as
      in the previous example.
    */
    clearTimeout(this.intervalID);
  }

  getData = () => {
    fetch(`http://localhost/iot4cast-api/api/read_all.php`)
      .then(response => response.json())
      .then(res => {
        //console.log(res.weather)
        this.setState(
          {
            weather: res.weather,
            last_record : res.weather.slice(-1)[0],
            before_last_record : res.weather.slice(-2)[0],
          })
        // call getData() again in 5 seconds
        this.intervalID = setTimeout(this.getData.bind(this), 5000);
      })
      .catch((error) => console.log({error}), this.intervalID = setTimeout(this.getData.bind(this), 5000));
  }
  

  render() {
    console.log(this.state.before_last_record);
    
    let temp_change = ((this.state.last_record.temp-this.state.before_last_record.temp)/this.state.before_last_record.temp)*100;
    let humidity_change = ((this.state.last_record.humidity-this.state.before_last_record.humidity)/this.state.before_last_record.humidity)*100;
    let pressure_change = ((this.state.last_record.pressure-this.state.before_last_record.pressure)/this.state.before_last_record.pressure)*100;
    let light_change = ((this.state.last_record.light-this.state.before_last_record.light)/this.state.before_last_record.light)*100;


    

    

    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div>
            <PageTitle
              heading="Summary"
              subheading="iot4cast Weather Monitor"
              icon="pe-7s-home icon-gradient bg-malibu-beach"
            />
            <Row>
              {/*<Col md="12" lg="6">
                <Card className="mb-3">
                  <CardHeader className="card-header-tab">
                    <div className="card-header-title">
                      <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">
                        {" "}
                      </i>
                      Percentage Changes
                    </div>
                    <div className="btn-actions-pane-right">
                      <Button
                        outline
                        className={
                          "border-0 btn-pill btn-wide btn-transition " +
                          classnames({ active: this.state.activeTab1 === "11" })
                        }
                        color="primary"
                        onClick={() => {
                          this.toggle1("11");
                        }}
                      >
                        Tab 1
                      </Button>
                      <Button
                        outline
                        className={
                          "ml-1 btn-pill btn-wide border-0 btn-transition " +
                          classnames({ active: this.state.activeTab1 === "22" })
                        }
                        color="primary"
                        onClick={() => {
                          this.toggle1("22");
                        }}
                      >
                        Tab 2
                      </Button>
                      </div>
                  </CardHeader>
                  <TabContent activeTab={this.state.activeTab1}>
                    <TabPane tabId="11">
                      <CardBody className="pt-2">
                        <Row className="mt-3">
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      63%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Temperature Change
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="danger"
                                    value="63"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      32%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Submitted Tickers
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="success"
                                    value="32"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <div className="divider mt-4" />
                        <Row>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      71%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Server Allocation
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="primary"
                                    value="71"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      41%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Generated Leads
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="warning"
                                    value="41"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <div className="widget-chart p-0">
                        <div className="widget-chart-content">
                          <div className="widget-description mt-0 text-warning">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span className="pl-1">175.5%</span>
                            <span className="text-muted opacity-8 pl-1">
                              increased server resources
                            </span>
                          </div>
                        </div>
                        <ResponsiveContainer height={187}>
                          <AreaChart
                            data={data}
                            margin={{ top: -45, right: 0, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id="colorPv2"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="10%"
                                  stopColor="var(--warning)"
                                  stopOpacity={0.7}
                                />
                                <stop
                                  offset="90%"
                                  stopColor="var(--warning)"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <Tooltip />
                            <Area
                              type="monotoneX"
                              dataKey="uv"
                              stroke="var(--warning)"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#colorPv2)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabPane>
                    <TabPane tabId="22">
                      <div className="widget-chart p-0">
                        <ResponsiveContainer height={179}>
                          <ComposedChart data={data2}>
                            <CartesianGrid stroke="#ffffff" />
                            <Area
                              type="monotone"
                              dataKey="amt"
                              fill="#f7ffd0"
                              stroke="#85a200"
                            />
                            <Bar
                              dataKey="pv"
                              barSize={16}
                              fill="var(--primary)"
                            />
                            <Line
                              type="monotone"
                              dataKey="uv"
                              strokeWidth="3"
                              stroke="var(--danger)"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                        <div className="widget-chart-content mt-3 mb-2">
                          <div className="widget-description mt-0 text-success">
                            <FontAwesomeIcon icon={faArrowUp} />
                            <span className="pl-2 pr-2">37.2%</span>
                            <span className="text-muted opacity-8">
                              performance increase
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardBody className="pt-2">
                        <Row>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      23%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Deploys
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="warning"
                                    value="23"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      76%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Traffic
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="info"
                                    value="76"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <div className="divider mt-4" />
                        <Row>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      83%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Servers Load
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="danger"
                                    value="83"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="widget-content">
                              <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-numbers fsize-3 text-muted">
                                      48%
                                    </div>
                                  </div>
                                  <div className="widget-content-right">
                                    <div className="text-muted opacity-6">
                                      Reported Bugs
                                    </div>
                                  </div>
                                </div>
                                <div className="widget-progress-wrapper mt-1">
                                  <Progress
                                    className="progress-bar-sm progress-bar-animated-alt"
                                    color="alternate"
                                    value="48"
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </TabPane>
                  </TabContent>
                </Card>
              </Col>*/}
              <Col md="12" lg="12">
                <Row>
                  <Col md="3">
                    <div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">
                      <div className="icon-wrapper rounded-circle">
                        <div className="icon-wrapper-bg bg-white opacity-10" />
                        <i className="pe-7s-graph3 icon-gradient bg-arielle-smile" />
                      </div>
                      <div className="widget-numbers">{this.state.last_record.temp} °C</div>
                      <div className="widget-subheading">Temperature</div>
                      <div className="widget-description text-white">
                        <FontAwesomeIcon icon={Math.sign(temp_change) == 1 ? faAngleUp : faAngleDown} />
                      <span className="pl-1"> {Math.abs(temp_change).toFixed(2)} %</span>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
                      <div className="icon-wrapper rounded">
                        <div className="icon-wrapper-bg bg-white opacity-10" />
                        <i className="pe-7s-drop icon-gradient bg-warm-flame" />
                      </div>
                      <div className="widget-numbers">{this.state.last_record.humidity} %</div>
                      <div className="widget-subheading">Humidity</div>
                      <div className="widget-description text-white">
                        <FontAwesomeIcon icon={Math.sign(humidity_change) == 1 ? faAngleUp : faAngleDown} />
                        <span className="pr-1"> {Math.abs(humidity_change).toFixed(2)} %</span>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="card mb-3 bg-grow-early widget-chart text-white card-border">
                      <div className="icon-wrapper rounded">
                        <div className="icon-wrapper-bg bg-dark opacity-9" />
                        <i className="pe-7s-stopwatch text-white" />
                      </div>
                      <div className="widget-numbers">{this.state.last_record.pressure} Pa</div>
                      <div className="widget-subheading">Pressure</div>
                      <div className="widget-description text-white">
                        <FontAwesomeIcon icon={Math.sign(pressure_change) == 1 ? faAngleUp : faAngleDown} />
                        <span className="pl-1"> {Math.abs(pressure_change).toFixed(2)} %</span>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="card mb-3 bg-love-kiss widget-chart card-border">
                      <div className="widget-chart-content text-white">
                        <div className="icon-wrapper rounded-circle">
                          <div className="icon-wrapper-bg bg-white opacity-4" />
                          <i className="pe-7s-light" />
                        </div>
                        <div className="widget-numbers">{this.state.last_record.light} lx</div>
                        <div className="widget-subheading">Ambient Light</div>
                        <div className="widget-description">
                          <FontAwesomeIcon
                            className="text-white opacity-5"
                            icon={Math.sign(light_change) == 1 ? faAngleUp : faAngleDown}
                          />
                          <span className="text-white">{Math.abs(light_change).toFixed(2)} %</span>
                        </div>
                      </div>
                      <div className="widget-chart-wrapper">
                        <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                          <LineChart
                            data={data}
                            margin={{ top: 0, right: 5, left: 5, bottom: 0 }}
                          >
                            <Line
                              type="monotone"
                              dataKey="pv"
                              stroke="#ffffff"
                              strokeWidth={3}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <div className="card-header">
                    Last 10 Readings
                    {/*<div className="btn-actions-pane-right">
                      <div role="group" className="btn-group-sm btn-group">
                        <button className="active btn btn-info">
                          Last Week
                        </button>
                        <button className="btn btn-info">All Month</button>
                      </div>
                    </div>*/}
                  </div>
                  <div className="table-responsive">
                    <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">#</th>
                          <th className="text-center">Temperature</th>
                          <th className="text-center">Humidity</th>
                          <th className="text-center">Pressure</th>
                          <th className="text-center">Ambient Light</th>
                        </tr>
                      </thead>

                      <tbody>
                        
                          {_.takeRight(this.state.weather,10).reverse().map(record => 

                                <tr key={record.id}>
                                  <td className="text-center text-muted">{record.id}</td>
                                  <td className="text-center text-muted">{record.temp}°C</td>
                                  <td className="text-center text-muted">{record.humidity}%</td>
                                  <td className="text-center text-muted">{record.pressure}Pa</td>
                                  <td className="text-center text-muted">{record.light}lx</td>

                                  </tr>

                            )}
                          
                        
                        
                      </tbody>
                    </table>
                  </div>
                  <div className="d-block text-center card-footer">
                    {/* <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger">
                      <i className="pe-7s-trash btn-icon-wrapper"> </i>
                    </button>
                    <button className="btn-wide btn btn-success">Save</button> */}
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
