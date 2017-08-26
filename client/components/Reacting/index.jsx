import fullViewportHOC from '../fullViewportHOC';
import withSocketIO from '../withSocketIO';
import Desktop from './Desktop';
import Mobile from './Mobile';

const Reacting = fullViewportHOC(Desktop, Mobile);

export default withSocketIO(Reacting);
