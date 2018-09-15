import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getMaterial, unsetMaterial } from '@/actions/material';
import Material from '@/components/Material';

class MaterialContainer extends PureComponent {
  componentDidMount() {
    const {
      getMaterial,
      match: { params }
    } = this.props;

    getMaterial(params);
  }

  componentDidUpdate() {
    const {
      material: { data }
    } = this.props;

    if (data) {
      document.title = data.title;
    }
  }

  componentWillUnmount() {
    const { unsetMaterial } = this.props;

    unsetMaterial();
  }

  render() {
    const { material } = this.props;

    return <Material material={material} />;
  }
}

const mapStateToProps = ({ material }) => ({ material });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getMaterial, unsetMaterial }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialContainer);
