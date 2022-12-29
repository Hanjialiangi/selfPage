import { connect } from 'react-redux';
import Home from '@pages/home/Index';
import { decrement, increment } from '@src/redux/action';
import { Dispatch } from 'react';

// eslint-disable-next-line react-redux/mapStateToProps-no-store
const mapStateToProps = (state: number): { value: number } => ({
  value: state
});

// eslint-disable-next-line react-redux/mapDispatchToProps-prefer-shorthand
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onDecrement: () => dispatch(decrement()),
  onIncrement: () => dispatch(increment())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
