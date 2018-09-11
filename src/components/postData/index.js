import React from 'react';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../styles/_variables.scss';

const horizontalMarginClasses = ['uk-margin-medium-left', 'uk-margin-medium-right'].join(' ');

class PostData extends React.Component {
  constructor(props) {
    super(props);
    this.resizeDiv = this.resizeDiv.bind(this);
    this.state = { paddingTop: null };
  }

  getActualData() {
    let aspectRatio;
    let paddingTop;

    switch (this.props.data.type.toLowerCase()) {
      case 'image':
        this.props.data.height = this.props.data.height || 9;
        this.props.data.width = this.props.data.width || 16;
        aspectRatio = `${(this.props.data.height / this.props.data.width) * 100}%`;
        paddingTop = this.state.paddingTop ? this.state.paddingTop : aspectRatio;
        return (
          <LazyLoad height={100}>
            <div className={[styles.imageDiv].join(' ')} style={{ paddingTop }}>
              <img src={this.props.data.content} alt="" onLoad={this.resizeDiv} style={{ margin: 'auto' }} />
            </div>
          </LazyLoad>);

      case 'text':
        return (
          <div className={[horizontalMarginClasses, styles.text].join(' ')}>
            {this.props.data.content}
          </div>);

      case 'h1':
      case 'heading':
        return (
          <h1 className={[horizontalMarginClasses, indexStyles.primaryText, indexStyles.h1].join(' ')}>
            {this.props.data.content}
          </h1>);

      case 'h2':
      case 'sub-heading':
        return (
          <h2 className={[horizontalMarginClasses, indexStyles.primaryText, indexStyles.h2].join(' ')}>
            {this.props.data.content}
          </h2>);

      case 'youtube':
        return (
          <div className={['uk-cover-container', 'uk-medium-height'].join(' ')}>
            <iframe
              title={this.props.data.content}
              src={`https://www.youtube.com/embed/${this.props.data.content}?rel=0&amp`}
              width="100%"
              height="315"
              frameBorder="0"
              allowFullScreen
            />
          </div>);

      case 'ol':
        if (typeof (this.props.data.content) === 'string') {
          this.props.data.content = this.props.data.content.split(' ');
        }
        return (
          <ol className={[horizontalMarginClasses].join(' ')}>
            {this.props.data.content.map(i => <li key={i}>{i}</li>)}
          </ol>);

      case 'ul':
        if (typeof (this.props.data.content) === 'string') {
          this.props.data.content = this.props.data.content.split(' ');
        }
        return (
          <ul className={[horizontalMarginClasses].join(' ')}>
            {this.props.data.content.map(i => <li key={i}>{i}</li>)}
          </ul>);

      default:
        return <h2 className={['uk-margin-medium-left', 'uk-margin-medium-right'].join(' ')}>??</h2>;
    }
  }

  resizeDiv(event) {
    const aspectRatio = `${(event.target.height / event.target.width) * 100}%`;
    this.setState({ ...this.state, paddingTop: aspectRatio });
  }

  render() {
    return (
      <div className={[this.props.className, this.props.applyTopMargin ? 'uk-margin-top' : ''].join(' ')}>
        {this.getActualData()}
      </div>);
  }
}

PostData.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
  applyTopMargin: PropTypes.bool,
};

PostData.defaultProps = {
  className: '',
  applyTopMargin: false,
};

export default PostData;
