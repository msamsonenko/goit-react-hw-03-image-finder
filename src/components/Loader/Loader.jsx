import { BallTriangle } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <BallTriangle color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
