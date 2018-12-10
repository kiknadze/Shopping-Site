import React from 'react';

export default function Registration() {
    return (
        <div>
            <form className="form--registration" action="http://localhost:5000/register" method="POST">
                <label>
                    <input className="form--input" type="text" placeholder="name" name="name" required />
                </label>
                <label>
                    <input className="form--input" type="text" placeholder="lastname" name="lastname" required />
                </label>
                <label>
                    <input className="form--input" type="text" placeholder="username" name="username" required />
                </label>
                <label>
                    <input className="form--input" type="password" placeholder="password" name="password" required />
                </label>
                <label>
                    <input className="form--input" type="text" placeholder="email" name="email" required />
                </label>
                <label>
                    <input className="form--input" type="date" placeholder="birthdate" name="birthdate" required />
                </label>
                <label>
                    <input className="form--input" type="number" placeholder="balance" name="balance" required />
                </label>
                <button className="btn form--btn">Register</button>
            </form>
        </div>
    )
}
