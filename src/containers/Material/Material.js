import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getMaterial, unsetMaterial } from '@/actions/material';
import Material from '@/components/Material';

const mapStateToProps = ({ material }) => ({ material });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getMaterial, unsetMaterial }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Material);
