import React from "react";
import { Table } from "react-bootstrap";

class CRC extends React.Component {
  constructor({ arr, handle }) {
    super({ arr, handle });
    this.state = { products: [] };
    this.headers = [
      { key: "id", label: "Id" },
      { key: "name", label: "Tên" },
      { key: "sl", label: "SL" },
    ];
    this.state = { checkedBoxes: [] };
    this.deleteProducts = this.deleteProducts.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  deleteProducts = () => {
    console.log(this.state);
    // this.setState({
    //   products: {
    //     id: 2,
    //     name: 23,
    //     sl: 123,
    //   },
    // });
  };

  toggleCheckbox = (e, item) => {
    if (e.target.checked) {
      let arr = this.state.checkedBoxes;
      arr.push(item.id);

      this.setState = { checkedBoxes: arr };
    } else {
      let items = this.state.checkedBoxes.splice(
        this.state.checkedBoxes.indexOf(item.id),
        1
      );

      this.setState = {
        checkedBoxes: items,
      };
    }
    //console.log(this.state.checkedBoxes);
  };

  componentDidMount() {
    console.log(this.props.arr);
    this.setState({
      products: this.props.arr,
    });
  }

  render() {
    const productFound = this.state.products && this.state.products.length;
    if (productFound) {
      return (
        <div id="container">
          <div id="msg"></div>
          <button type="button" onClick={this.deleteProducts}>
            Delete Selected Product(s)
          </button>
          <Table
            striped
            bordered
            hover
            variant="dark"
            size="sm"
            className="tb-cr"
          >
            <thead>
              <tr>
                {this.headers.map(function (h) {
                  return <th key={h.key}>{h.label}</th>;
                })}
                <th key={"xoa"}>Xoá</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map(
                function (item, index) {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.sl}</td>
                      <td>
                        <input
                          type="checkbox"
                          className="selectsingle"
                          value="{item.id}"
                          checked={this.state.checkedBoxes.find(
                            (p) => p.id === item.id
                          )}
                          onChange={(e) => this.toggleCheckbox(e, item)}
                        />
                      </td>
                    </tr>
                  );
                }.bind(this)
              )}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return <div id="container">No product found</div>;
    }
  }
}

export default CRC;
