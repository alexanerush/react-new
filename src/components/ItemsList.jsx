import { Component } from "react";

export default class ItemsList extends Component {
  render() {
    const { items } = this.props;

    return (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              background: "#fff",
              marginBottom: "10px",
              padding: "10px 15px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }
}
