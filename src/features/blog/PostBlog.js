import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import { Markdown } from 'react-showdown';

export class PostBlog extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { id, title, body, image } = this.props.postData;
    return (
      <Link to={`/details/${id}`}>
        <article className="blog-post-container" data-post-id={id}>
          <div className="row">
            <div className="blog-post-image col-sm-12 col-md-4">
              <img src={image || 'https://bit.ly/2So2zvB'} alt="Erro" />
            </div>
            <div className="col-sm-12 col-md-8">
              <div className="blog-post-title wordwrap">{title}</div>
              <div className="blog-post-body wordwrap">
                <Markdown markup={body.substring(0, 144) + '...'} />
              </div>
            </div>
          </div>
        </article>
      </Link>
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
