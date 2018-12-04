import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';

export class PostBlog extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleDelete = (id) => {
    this.props.actions.deletarPost(id).then(() => this.props.actions.obterPosts());
  }

  render() {
    const { id, title, body, image } = this.props.postData;
    return (
      <article class="blog-post-container" data-post-id={id}>
        <div class="row">
          <div class="blog-post-image col-3">
            <img src={image || 'https://bit.ly/2So2zvB'} alt="Erro" />
          </div>
          <div class="col-7">
            <div class="blog-post-title">{title}</div>
            <div class="blog-post-body wordwrap">{body}</div>
          </div>
          <div class="col-2 d-flex align-items-center">
            <Link to={`/edit/${id}`} className="btn btn-info">O</Link>
            <a className="btn btn-danger" style={{color: "white"}} onClick={() => this.handleDelete(id)}>X</a>
          </div>
        </div>
      </article>
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
)(PostBlog);
