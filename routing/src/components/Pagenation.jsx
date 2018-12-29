import React from "react";
import { Link } from "react-router-dom";

//Mariami
//class to number the pages
class Pagenation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      todosPerPage: 6
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
    window.scrollTo(0, 0);
  }

  render() {
    const { currentPage, todosPerPage } = this.state;

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.props.arr.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );
    const renderTodos = currentTodos.map((todo, index) => {
      // return <li key={index}>{todo}</li>;
      return (
        <div key={index} className="container--product--wrapper">
          <Link to={`/products/${todo.id}`} key={index}>
            <div className="image">
              <img alt="NO" src={todo.url} />
            </div>
          </Link>
          <div className="line" />
          <div className="proPrice">{todo.price}₾</div>
          <div className="proName">{todo.name}</div>
        </div>
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.arr.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} className="page-item">
          <div className="page-link" onClick={this.handleClick} id={number}>
            {number}
          </div>
        </li>
      );
    });

    return (
      <div>
        <div className="container--product--container">
          <div className="container--product">{renderTodos}</div>
        </div>

        <nav aria-label="...">
          <ul className="pagination">
            <li className="page-item" id="1">
              <div className="page-link" id="1" onClick={this.handleClick}>
                First
              </div>
            </li>
            {renderPageNumbers}
            <li className="page-item" id={pageNumbers.length}>
              <div
                className="page-link"
                id={pageNumbers.length}
                onClick={this.handleClick}
              >
                Last
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Pagenation;
