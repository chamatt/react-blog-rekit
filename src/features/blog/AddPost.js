import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {withRouter} from 'react-router-dom';

export class AddPost extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { title: '', body: '', image: '' };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const {title, body, image} = this.state;
    const post = {
      title, body, image
    };
    this.props.actions.enviarPost(post).then(() => this.props.history.push("/"));

  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <h1 className="text-center mt-4 blog-title-header">Adicionar Post</h1>
        <hr className="blog-title-separator" />
        <div className="add-post-container">
          <form id="add-post-form" onSubmit={this.handleSubmit}>
            <input
              className="form-control add-post-title"
              type="text"
              name="title"
              placeholder="Titulo"
              onChange={this.handleChange}
            />
            <textarea
              className="form-control add-post-body"
              name="body"
              placeholder="Corpo"
              onChange={this.handleChange}
            />
            <input
              className="form-control add-post-title"
              type="text"
              name="image"
              placeholder="URL da Imagem"
              onChange={this.handleChange}
            />
            <div className="text-center">
              <button type="submit" className="btn btn-primary add-post-button text-center">
                Criar
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    blog: state.blog,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddPost));
