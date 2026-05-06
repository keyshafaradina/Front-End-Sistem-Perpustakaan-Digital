import React from 'react';

const Login = () => {
  const pinkPrimary = "#F8C1D6";
  const pinkHighlight = "#FF69B4"; 

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '15px',
    border: '1px solid #000',
    fontSize: '14px',
    textAlign: 'center', 
    boxSizing: 'border-box'
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Pink */}
      <div style={{ backgroundColor: pinkPrimary, padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>E - Library</h1>
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Sistem Informasi Perpustakaan Digital</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Profile Circle Icon */}
        <div style={{ width: '100px', height: '100px', backgroundColor: pinkPrimary, borderRadius: '50%', border: '1px solid #000', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '50px' }}>👤</span>
        </div>

        <form style={{ width: '100%', maxWidth: '350px', textAlign: 'center' }}>
          <div style={{ textAlign: 'left', marginBottom: '5px', marginLeft: '10px', fontSize: '13px' }}>Email / Username</div>
          <input type="text" style={inputStyle} />

          <div style={{ textAlign: 'left', marginBottom: '5px', marginLeft: '10px', fontSize: '13px' }}>Password</div>
          <input type="password" style={inputStyle} />

          {/* Link Forget Password */}
          <div style={{ marginBottom: '25px' }}>
            <a href="/forgot-password" style={{ color: pinkHighlight, fontSize: '12px', textDecoration: 'none' }}>
              Forget password?
            </a>
          </div>

          <button style={{ backgroundColor: pinkPrimary, border: 'none', padding: '10px 40px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', border: '0.5px solid #000' }}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;