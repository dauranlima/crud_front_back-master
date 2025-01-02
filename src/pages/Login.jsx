import CartContext from '@/context/CartContext';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const {username, setUsername} = useContext(CartContext);
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && 
          !document.mozFullScreenElement && 
          !document.webkitFullscreenElement && 
          !document.msFullscreenElement) {
        handleFullscreen();
      }
    };
  
    React.useEffect(() => {
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('mozfullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('MSFullscreenChange', handleFullscreenChange);
  
      handleFullscreen();
  
      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      };
    }, []);
  
    React.useEffect(() => {
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('mozfullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('MSFullscreenChange', handleFullscreenChange);
  
      handleFullscreen();
  
      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      };
    }, []);
  
const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  };

  React.useEffect(() => {
    handleFullscreen();
  }, []);

  
    // Trigger fullscreen mode on component mount
    handleFullscreen();

const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'william' && password === 'spin1' || username === 'dauran' && password === 'admin' || username === 'admin' && password === 'admin'   ) {
      navigate('/');
    } else {
      document.querySelector('.warning').innerHTML = '<p class="text-red-500 text-xl font-bold mt-4">Usuário ou senha incorretos</p>';
    }
  };  

  return (
    <div className="flex pt-20 h-screen text-center justify-center bg-slate-800">
      <div className="max-w-md w-full p-4 bg-slate-800 flex flex-col">
        <div className='flex items-center justify-center my-3'>
          <img src="/supplier.png" alt="logo" height={90} width={90}/>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white ">CONTROLE DE PEDIDOS</h2>
        <form className='flex text-white flex-col' onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span>Usuário:</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="block w-full p-2 pl-4 text-sm text-gray-700 border border-black"
            />
          </label>
          <label className="block mb-2">
            <span>Senha:</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => (document.querySelector('.warning').innerHTML = '<p class="text-red-500 text-xl font-bold mt-4"></p>' )}
              className="block w-full p-2 pl-4 text-sm text-gray-800 mb-6 border-black"
            />
          </label>
          <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-5 px-4 rounded text-center"
            onBlur={() => {
              setPassword('');
              setUsername('');
              document.querySelector('.warning').innerHTML = '<p class="text-red-500 text-xl font-bold mt-4"></p>';
            }}
          >
            LOGIN
          </button>
          <div  className='warning'/>
        </form>
      </div>
    </div>
  );
}