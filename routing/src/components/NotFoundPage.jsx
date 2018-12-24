import React from 'react';

const NotFoundPage = () => (
    <div>
        <div class="container__notFound">
            <input type="checkbox" id="switch" />
            <div class="ellipse"></div>
            <div class="ray"></div>
            <div class="head"></div>
            <div class="neck"></div>
            <div class="body">
                <label for="switch"></label>
            </div>
        </div>
        <div class="container__notFound">
            <div class="msg msg_1">404</div>
            <div class="msg msg_2">Page Not Found</div>
        </div>
    </div>
);

export default NotFoundPage;