import React from 'react';
import RoomIcon from '@material-ui/icons/Room';

/*
https://blaipratdesaba.com/how-to-use-an-npm-node-module-that-has-been-forked-b7dd522fdd08
if when deployed the map does not work, need to add post install script
 */

const AnyReactComponent = (props) => {
  // RoomIcon has size 24x24px, so need to offset that, s.t. the icon is in the right location
  //=> does not work well with zoom
  const { id, setListing, key } = props;
  return (
    <React.Fragment key={key}>
      <RoomIcon
        color='secondary'
        key={key}
        style={{
          position: 'absolute',
          left: '-24px',
          top: '-24px',
          cursor: 'pointer',
          color: 'rgba(225,1,1,0.8)',
        }}
        onClick={() => setListing(id)}
      />
    </React.Fragment>
  );
};

export default AnyReactComponent;
