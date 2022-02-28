const DemoOutput = props => {
  console.log('DemoOutput reevaluated!');

  return <p>{props.showSpecialText ? 'Special demo text' : 'Regular text'}</p>;
};
export default DemoOutput;
