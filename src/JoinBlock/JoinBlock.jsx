import React from 'react'
import axios from 'axios'

function JoinBlock({ onLogin }) {
    const [roomId, setRoomId] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)

    const onEnter = async () => {
      if (!roomId || !userName) return alert('Неверные данные');
      setLoading(true);
      const obj = {
        roomId, 
        userName,
      }
      await axios.post('/rooms', obj);
      onLogin(obj);
    };

    return (
        <div className="input-group mb-3 join-block">
          <div className="join-block__title">
            <h1 className="display-4">Чат</h1>
          </div>
          <div className="join-block__input">
              <input 
                className="form-control" 
                type="text" 
                placeholder="Номер комнаты" 
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                />
          </div>
          <div className="join-block__input">
              <input 
                className="form-control" 
                type="text" 
                placeholder="Имя" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                />
          </div>

          <button 
            disabled={isLoading} 
            onClick={onEnter} 
            className="btn btn-primary">
            {isLoading ? 'Вход' : 'Войти'}
          </button>

        </div>
    )
}

export default JoinBlock;
