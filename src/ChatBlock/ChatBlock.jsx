import React from 'react'
import './ChatBlock.css'
import socket from '../socket'

function ChatBlock({ users, messages, userName, roomId, onAddMessage }) {
    const [messagesValue, setMessagesValue] = React.useState('');

    const onSendMessages = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messagesValue,
        })
        onAddMessage({userName, text: messagesValue})
        setMessagesValue('');
    }

    return (
        <div className="container">
            <div className="inbox_msg">
                <div className="inbox_people">
                    <div className="chat_status">
                        <div className="recent_heading">
                            <h4>Комната: {roomId}</h4>
                        </div>

                        <div className="recent_heading">
                            <h4>Онлайн: {users.length}</h4>
                        </div>
                    </div>

                    <div className="inbox_chat">
                        <ul className="chat_people">
                            {users.map((name, index) =>
                                <li key={name + index} className="user_block">
                                    <img alt="user" className="user_avatar" src="https://ptetutorials.com/images/user-profile.png" />
                                    <span>{name}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mesgs">
                    <div className="msg_history">
                        {messages.map(message =>
                            <div className="received_withd_msg">
                                <p>{message.text}</p>
                                <span className="time_date">От: {message.userName}</span>
                            </div>
                        )}
                    </div>
                    <div className="type_msg">
                        <div className="input_msg_write">
                            <textarea
                                rows="3"
                                type="text"
                                className="write_msg form-control"
                                placeholder="Сообщение"
                                onChange={(e) => setMessagesValue(e.target.value)}
                                value={messagesValue}
                            />

                            <button onClick={onSendMessages} className="msg_send_btn" type="button">
                                <i>&rarr;</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBlock
