import React, { Component } from "react";
import { Grid, Row, Col, Button, Alert } from "react-bootstrap";
import { getHeadline, getAwesomeHeadline } from "../utils/api";

const IMAGE_BASE = "https://http.cat/";

class Main extends Component {
  fetchHeadline() {
    getHeadline().then(resp => resp.data).then((headline) => {
      window.setState({
        imageUrl: `${IMAGE_BASE}200`,
        headline: headline
      });
    });
  }

  fetchAwesomeHeadline() {
    getAwesomeHeadline().catch(resp => resp.response).then((resp) => {
      window.setState({imageUrl: `${IMAGE_BASE}${resp.status}`});
      return resp.data;
    }).then((headline) => {
      window.setState({headline});
      return headline;
    });
  }

  render() {
    return (
        <Grid>
          <Row>
            <Col md={1}></Col>
            <Col md={10} className="text-center">
              <p>Welcome to the headline generator application.  Click on the buttons to get a headline</p>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Row>
            <Col md={12}>
              <Button bsStyle="primary" onClick={this.fetchHeadline}>Get a headline</Button>&nbsp;
              <Button onClick={this.fetchAwesomeHeadline}>Awesome headline</Button>
            </Col>
          </Row>
          <Row><Col>&nbsp;</Col></Row>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <Alert bsStyle="info" style={{overflowWrap: "break-word"}}><span dangerouslySetInnerHTML={{__html: this.props.headline}}></span></Alert>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row>
            <Col md={4} mdOffset={4}>
              <img src={this.props.imageUrl} width="350px" alt="Status code"/>
            </Col>
          </Row>
        </Grid>
    )
  }
}

export default Main;