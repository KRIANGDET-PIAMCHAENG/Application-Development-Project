import React from 'react';

const CustomBackground = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: '#1e2126',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1a1d22',
        borderBottom: '2px solid #0080ff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
      }}>
        
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}>
          
        </div>
      </div>

      {/* Main Content - Table Layout */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Year Headers - 4 Years */}
        <div style={{ display: 'flex', borderBottom: '1px solid #444' }}>
          <div style={{ width: '25%', padding: '10px', textAlign: 'center', borderRight: '1px solid #444' }}>
            ปีที่1
          </div>
          <div style={{ width: '25%', padding: '10px', textAlign: 'center', borderRight: '1px solid #444' }}>
            ปีที่2
          </div>
          <div style={{ width: '25%', padding: '10px', textAlign: 'center', borderRight: '1px solid #444' }}>
            ปีที่3
          </div>
          <div style={{ width: '25%', padding: '10px', textAlign: 'center' }}>
            ปีที่4
          </div>
        </div>

        {/* Term Headers - 8 columns (2 for each year) */}
        <div style={{ display: 'flex', borderBottom: '1px solid #444' }}>
          {[1, 2, 3, 4].map(year => (
            <React.Fragment key={`year-${year}`}>
              <div style={{ width: '12.5%', padding: '8px', textAlign: 'center', borderRight: '1px solid #444' }}>
                กลางภาค
              </div>
              <div style={{ width: '12.5%', padding: '8px', textAlign: 'center', borderRight: year < 4 ? '1px solid #444' : 'none' }}>
                ปลายภาค
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Course Slots - Empty columns for all 8 sections */}
        <div style={{ display: 'flex', flex: 1 }}>
          {[1, 2, 3, 4].map(year => (
            <React.Fragment key={`content-${year}`}>
              {/* Midterm column */}
              <div style={{ 
                width: '12.5%', 
                borderRight: '1px solid #444',
                minHeight: '300px'
              }}>
             
              </div>
              
              <div style={{ 
                width: '12.5%', 
                borderRight: year < 4 ? '1px solid #444' : 'none',
                minHeight: '300px'
              }}>
              
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomBackground;