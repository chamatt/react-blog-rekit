import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';

export class EditPost extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { title: '', body: '', image: '' };

  componentDidMount() {
    this.props.actions.obterPost(this.props.match.params.id).then(() => {
      this.setState({
        title: this.props.common.post.title,
        body: this.props.common.post.body,
        image: this.props.common.post.image,
      });
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { title, body, image } = this.state;
    const id = this.props.match.params.id;
    const post = {
      title,
      body,
      image,
    };
    this.props.actions.editarPost(id, post).then(() => this.props.history.push('/'));
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center mt-4 blog-title-header">Editar Post</h1>
        <hr className="blog-title-separator" />
        <div className="add-post-container">
          {this.props.common.editarPostError && (
            <div className="alert alert-danger" role="alert">
              Não foi possível obter os posts, tente novamente!
            </div>
          )}
          <form id="add-post-form" onSubmit={this.handleSubmit}>
            <input
              className="form-control add-post-title"
              type="text"
              name="title"
              placeholder="Titulo"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <textarea
              className="form-control add-post-body"
              name="body"
              placeholder="Corpo"
              value={this.state.body}
              onChange={this.handleChange}
            />
            <input
              className="form-control add-post-title"
              type="text"
              name="image"
              placeholder="URL da Imagem"
              value={this.state.image}
              onChange={this.handleChange}
            />
            <div className="text-center">
              <button type="submit" className="btn btn-primary add-post-button text-center">
                Editar
              </button>
              <Link to="/" className="btn btn-danger add-post-button text-center">
                Cancelar
              </Link>
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
    common: state.common,
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
)(EditPost);
