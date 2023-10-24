import React, { useState } from 'react';

const ShowMoreText = ({ text, maxLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const showMoreContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  }

  const showMoreButton = {
    width:'40%',
    textDecoration:'underline',
    background:'None',
    border:'None',
    color:'#68cfff',
    paddingTop:'1%'
  }

  return (
    <div style={showMoreContainer}>
      {showFullText ? text : text.slice(0, maxLength)}
      {text.length > maxLength && (
        <button style={showMoreButton} onClick={toggleText}>
          {showFullText ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default ShowMoreText;
