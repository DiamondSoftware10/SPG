import React, { Component } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { Card, Statistic, Icon } from "antd";
export default class InvestmentItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card id="inv-card" title={this.props.title} bordered={false}>
        <div className="stat-grid">
          <Statistic
            title="Inversión"
            value={this.props.pago}
            precision={2}
            suffix="USD"
          />
          <Statistic
            title="Ganancia"
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<Icon type="arrow-up" />}
            suffix="%"
          />

          <Statistic
            title="Ubicacion"
            value={this.props.ubicacion}
            precision={2}
            valueStyle={{ fontSize: "1.25em", fontFamily: "CircularStd" }}
          />
          <Statistic
            title="Fecha"
            value={"22/11/19"}
            valueStyle={{ fontSize: "1.25em", fontFamily: "CircularStd" }}
          />
        </div>
      </Card>
    );
    {
      /*
            <div className="flexbox" id="invest-flex2">
                <div>{this.props.title}</div>
                <div>{this.props.ubicacion}</div>
                <div>${this.props.pago}</div>
                <div>22/11/19</div>
                <div id="ganancia">500$</div>
            </div>
*/
    }
  }
}
