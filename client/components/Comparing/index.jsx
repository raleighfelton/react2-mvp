import fullViewportHOC from '../fullViewportHOC';
import withComparisonData from '../withComparisonData';
import Desktop from './Desktop';
import Mobile from './Mobile';

const Comparing = fullViewportHOC(Desktop, Mobile);

export default withComparisonData(Comparing);
