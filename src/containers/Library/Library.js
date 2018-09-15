import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getMaterials, clearMaterials } from '@/actions/materials';
import Library from '@/components/Library';

const mapStateToProps = ({ materials }) => ({ materials });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getMaterials, clearMaterials }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Library);
